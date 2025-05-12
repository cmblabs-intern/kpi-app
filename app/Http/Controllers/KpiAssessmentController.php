<?php

namespace App\Http\Controllers;

use App\Http\Requests\KpiAssessmentRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\KpiAssessmentDetailResource;
use App\Http\Resources\KpiAssessmentResource;
use App\Http\Resources\KpiMetricResource;
use App\Models\Employee;
use App\Models\KpiAssessment;
use App\Models\KpiAssessmentDetail;
use App\Models\KpiMetric;
use App\Repositories\KpiAssessmentRepository;
use App\Services\KpiAssessmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class KpiAssessmentController extends Controller
{
    private $service;

    public function __construct(KpiAssessmentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $employees = Employee::all();
        $metrics = KpiMetric::all();
        $assessmentDetails = KpiAssessmentDetail::all();
        $assessments = $this->service->list(['*']);
        return Inertia::render('kpi-assessments/dashboard', [
            'employees' => EmployeeResource::collection($employees),
            'metrics' => KpiMetricResource::collection($metrics),
            'assessmentDetails' => KpiMetricResource::collection($assessmentDetails),
            'assessments' => KpiAssessmentResource::collection($assessments)
        ]);
    }

    public function create()
    {
        return Inertia::render('kpi-assessments/dashboard', [
            'employees' => EmployeeResource::collection(Employee::all()),
            'metrics' => KpiMetric::all()
        ]);
    }

    public function store(KpiAssessmentRequest $request)
    {
        $data = $request->validated();
        $details = $data['details'];
        unset($data['details']);

        $this->service->create($data, $details);

        return redirect()->route('kpi-assessments.index')->with('success', 'Penilaian KPI berhasil ditambahkan');
    }


    public function show($id)
    {
        $assessment = $this->service->getById($id);
        return Inertia::render('kpi-assessments/details', [
            'assessment' => new KpiAssessmentResource($assessment->load('details.metric'))
        ]);
    }
}
