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
use Illuminate\Support\Facades\Log;
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

    public function sendKpiNotificationEmail($employeeId, $month = null)
{
    $employee = Employee::with(['user', 'division'])->findOrFail($employeeId);

    // Ambil penilaian terakhir
    $latest = KpiAssessment::with('details.metric')
        ->where('employee_id', $employeeId)
        ->when($month, fn($q) => $q->where('month', $month))
        ->latest('month')
        ->first();

    $totalScore = $latest?->total_score ?? 0;

    // Ambil riwayat tanpa penilaian terakhir
    $history = KpiAssessment::where('employee_id', $employeeId)
        ->when($latest, fn($q) => $q->where('id', '!=', $latest->id))
        ->orderBy('month', 'desc')
        ->get();

    // Kirim email
    Mail::to($employee->user->email)->send(
        new KPINotificationMail(
            employee: $employee,
            total: $totalScore,
            latest: $latest,
            history: $history,
            month: $month
        )
    );

    return true;
}

}