<?php
namespace App\Services;

use App\Http\Resources\KpiAssessmentDetailResource;
use App\Http\Resources\KpiAssessmentResource;
use App\Mail\KPINotificationMail;
use App\Models\Employee;
use App\Models\KpiAssessment;
use App\Models\KpiMetric;
use App\Models\Notification;
use App\Repositories\KpiAssessmentDetailRepository;
use Illuminate\Support\Facades\Mail;

class KpiAssessmentDetailService
{
  private $kpiAssessmentDetailRepository;

  public function __construct( KpiAssessmentDetailRepository $kpiAssessmentDetailRepository) {
    $this->kpiAssessmentDetailRepository = $kpiAssessmentDetailRepository;
  }

  public function list(array $fields) {
    return $this->kpiAssessmentDetailRepository->list($fields);
  }

  public function getById(int $id, array $fields) {
    return $this->kpiAssessmentDetailRepository->getById($id, $fields ?? ['*']);
  }

  public function withRelations()
{
    return $this->kpiAssessmentDetailRepository->withRelations();
}

public function getAssessmentData()
{
    return [
        'kpiAssessments' => KpiAssessment::with(['employee.user', 'employee.division', 'details.metric'])->get(),
        'kpiMetrics' => KpiMetric::with(['division'])->get(),
    ];
}

public function getDetailsByMonth($month)
{
    return KpiAssessment::with(['employee.user', 'details.metric'])
        ->when($month, fn($q) => $q->where('month', $month))
        ->orderBy('total_score', 'desc')
        ->get();
}

public function getEmployeeDetail($employeeId, $month)
{
    $employee = Employee::with(['user', 'division'])->findOrFail($employeeId);

    $metrics = KpiMetric::where('division_id', $employee->division_id)->get();

    $assessment = KpiAssessment::with(['details.metric'])
        ->where('employee_id', $employeeId)
        ->when($month, fn($q) => $q->where('month', $month))
        ->latest('month')
        ->first();

    $history = KpiAssessment::where('employee_id', $employeeId)
        ->when($assessment, fn($q) => $q->where('id', '!=', $assessment->id))
        ->orderBy('month', 'desc')
        ->get();

    return compact('employee', 'metrics', 'assessment', 'history');
}

public function sendNotification($employeeId)
{
    $employee = Employee::with(['user'])->findOrFail($employeeId);

    if (!$employee->user->email) {
        throw new \Exception('Email karyawan tidak ditemukan.');
    }

    $assessments = KpiAssessment::with(['details.metric', 'employee.user'])
        ->where('employee_id', $employeeId)
        ->orderBy('month', 'desc')
        ->get();

    if ($assessments->isEmpty()) {
        throw new \Exception('Tidak ada data penilaian.');
    }

    $latest = $assessments->first();
    $history = $assessments->slice(1);

    Mail::to($employee->user->email)->send(new KPINotificationMail(
        $employee,
        $latest->total_score,
        [
            'assessment' => new KpiAssessmentResource($latest),
            'details' => KpiAssessmentDetailResource::collection(
                $latest->details()->with(['metric.division'])->get()
            ),
        ],
        KpiAssessmentResource::collection($history)
    ));

    Notification::create([
        'user_id' => $employee->user_id,
        'title' => 'Notifikasi Penilaian KPI',
        'message' => 'Hasil penilaian KPI Anda telah dikirim via email',
        'type' => 'email',
        'is_read' => false,
    ]);

    return $employee->user->email;
}
}