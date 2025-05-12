<?php
namespace App\Repositories;

use App\Models\KpiAssessment;

class KpiAssessmentRepository
{
    public function list(array $fields)
    {
        return KpiAssessment::select($fields)->with('employee')->latest()->paginate(10);
    }

    public function getById(int $id, array $fields)
    {
        return KpiAssessment::with(['details.metric', 'employee'])->select($fields)->findOrFail($id);
    }

    public function create(array $data)
    {
        return KpiAssessment::create($data);
    }

    public function update(int $id, array $data)
    {
        $assessment = KpiAssessment::findOrFail($id);
        $assessment->update($data);
        return $assessment;
    }

    public function delete(int $id)
    {
        $assessment = KpiAssessment::findOrFail($id);
        $assessment->delete();
    }
}