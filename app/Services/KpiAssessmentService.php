<?php
namespace App\Services;

use App\Models\KpiAssessmentDetail;
use App\Models\KpiMetric;
use App\Repositories\KpiAssessmentRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class KpiAssessmentService
{
    private $repository;

    public function __construct(KpiAssessmentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list(array $fields)
    {
        return $this->repository->list($fields);
    }

    public function getById(int $id, array $fields = ['*'])
    {
        return $this->repository->getById($id, $fields);
    }

    public function create(array $data, array $details)
    {
        return DB::transaction(function () use ($data, $details) {
            $exists = $this->repository->existsForEmployeeAndMonth($data['employee_id'], $data['month']);
            if ($exists) {
                throw ValidationException::withMessages([
                    'month' => ['Penilaian untuk karyawan ini di bulan tersebut sudah ada.'],
                ]);
            }

            $data['total_score'] = 0;
            $assessment = $this->repository->create($data);

            $totalScore = 0;
            $totalWeight = 0;

            foreach ($details as $detail) {
                $metric = KpiMetric::findOrFail($detail['metric_id']);
                $weight = $metric->weight;
                $totalScore += $detail['score'] * $weight;
                $totalWeight += $weight;

                KpiAssessmentDetail::create([
                    'assessment_id' => $assessment->id,
                    'metric_id' => $detail['metric_id'],
                    'score' => $detail['score'],
                    'note' => $detail['note'] ?? null,
                ]);
            }

            $assessment->update([
                'total_score' => $totalWeight > 0 ? $totalScore / $totalWeight : 0
            ]);

            return $assessment;
        });
    }
}