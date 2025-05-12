<?php

namespace App\Http\Controllers;

use App\Http\Resources\KpiAssessmentDetailResource;
use App\Http\Resources\KpiAssessmentResource;
use App\Http\Resources\KpiMetricResource;
use App\Models\KpiAssessment;
use App\Models\KpiAssessmentDetail;
use App\Models\KpiMetric;
use App\Services\KpiAssessmentDetailService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KpiAssessmentDetailController extends Controller
{
    protected $kpiAssessmentDetailService;

    public function __construct(KpiAssessmentDetailService $kpiAssessmentDetailService)
    {
        $this->kpiAssessmentDetailService = $kpiAssessmentDetailService;
    }

    public function index()
    {
        $kpiAssessments = KpiAssessment::with(['employee.user', 'employee.division', 'details.metric'])->get();
        $kpiMetrics = KpiMetric::with(['division'])->get();
        
        return Inertia::render('kpi-assessments/details', [
            'kpiAssessments' => KpiAssessmentResource::collection($kpiAssessments),
            'kpiMetrics' => KpiMetricResource::collection($kpiMetrics),
            'kpiAssessmentDetail' => KpiAssessmentDetailResource::collection(
                KpiAssessmentDetail::with(['assessment.employee.user', 'metric.division'])->get()
            ),
        ]);
    }

    public function details(Request $request)
    {
        $month = $request->query('month');
        $assessments = $this->kpiAssessmentDetailService->getDetailsByMonth($month);

        return Inertia::render('kpi-assessments/details', [
            'month' => $month,
            'employee' => KpiAssessmentResource::collection($assessments),
        ]);
    }

    public function employeeDetail(Request $request)
    {
        $employeeId = $request->query('employee');
        $month = $request->query('month');

        $data = $this->kpiAssessmentDetailService->getEmployeeDetail($employeeId, $month);

        return Inertia::render('kpi-assessments/employee-detail', [
            'employee' => $data['employee'],
            'metrics' => $data['metrics'],
            'assessment' => $data['assessment'] ? new KpiAssessmentResource($data['assessment']) : null,
            'history' => KpiAssessmentResource::collection($data['history']),
            'month' => $month,
        ]);
    }

    public function sendNotification(Request $request)
    {
        try {
            $email = $this->kpiAssessmentDetailService->sendNotification($request->input('employee_id'));

            return response()->json([
                'message' => 'Email notifikasi berhasil dikirim',
                'notification' => [
                    'title' => 'Notifikasi Terkirim',
                    'message' => 'Email telah berhasil dikirim ke ' . $email,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}