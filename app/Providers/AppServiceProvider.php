<?php

namespace App\Providers;

use App\Http\Resources\DivisionCollection;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\KpiAssessmentCollection;
use App\Http\Resources\KpiAssessmentDetailCollection;
use App\Http\Resources\KpiAssessmentDetailResource;
use App\Http\Resources\KpiAssessmentResource;
use App\Http\Resources\KpiMetricCollection;
use App\Http\Resources\KpiMetricResource;
use App\Models\Division;
use App\Models\Employee;
use App\Models\KpiAssessment;
use App\Models\KpiAssessmentDetail;
use App\Models\KpiMetric;
use App\Repositories\DivisionRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\KpiAssessmentDetailRepository;
use App\Repositories\KpiAssessmentRepository;
use App\Repositories\KpiMetricRepository;
use App\Repositories\NotificationRepository;
use App\Services\DivisionService;
use App\Services\EmployeeService;
use App\Services\KpiAssessmentDetailService;
use App\Services\KpiAssessmentService;
use App\Services\KpiMetricService;
use App\Services\NotificationService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Employee
        $this->app->bind(EmployeeRepository::class, function ($app) {
            return new EmployeeRepository();
        });

        $this->app->bind(EmployeeService::class, function ($app) {
            return new EmployeeService($app->make(EmployeeRepository::class));
        });

        // Division
        $this->app->bind(DivisionRepository::class, function ($app) {
            return new DivisionRepository();
        });

        $this->app->bind(DivisionService::class, function ($app) {
            return new DivisionService($app->make(DivisionRepository::class));
        });

        // KpiMetric
        $this->app->bind(KpiMetricRepository::class, function ($app) {
            return new KpiMetricRepository();
        });

        $this->app->bind(KpiMetricService::class, function ($app) {
            return new KpiMetricService($app->make(KpiMetricRepository::class));
        });

        // KpiAssessment
        $this->app->bind(KpiAssessmentRepository::class, function ($app) {
            return new KpiAssessmentRepository();
        });

        $this->app->bind(KpiAssessmentService::class, function ($app) {
            return new KpiAssessmentService($app->make(KpiAssessmentRepository::class));
        });

        // KpiAssessmentDetail
        $this->app->bind(KpiAssessmentDetailRepository::class, function ($app) {
            return new KpiAssessmentDetailRepository();
        });

        $this->app->bind(KpiAssessmentDetailService::class, function ($app) {
            return new KpiAssessmentDetailService($app->make(KpiAssessmentDetailRepository::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Division
        $divisions = Division::paginate(10);
        $allDivisions = Division::all();

        // Employee
        $employees = Employee::paginate(10);
        $allEmployees = Employee::all();

        // KpiMetric
        $kpiMetrics = KpiMetric::paginate(10);
        $allKpiMetrics = KpiMetric::all();

        // KpiAssessment
        $kpiAssessments = KpiAssessment::paginate(10);
        $allKpiAssessments = KpiAssessment::all();

        // KpiAssessmentDetail
        $kpiAssessmentsDetail = KpiAssessmentDetail::paginate(10);
        $allKpiAssessmentsDetail = KpiAssessmentDetail::all();

        Inertia::share([
            'divisions' => new DivisionCollection($divisions),
            'allDivisions' => DivisionResource::collection($allDivisions),
            'employees' => new EmployeeCollection($employees),
            'allEmployees' => EmployeeResource::collection($allEmployees),
            'kpiMetrics' => new KpiMetricCollection($kpiMetrics),
            'allKpiMetrics' => KpiMetricResource::collection($allKpiMetrics),
            'kpiAssessments' => new KpiAssessmentCollection($kpiAssessments),
            'allKpiAssessments' => KpiAssessmentResource::collection($allKpiAssessments),
            'kpiAssessmentsDetail' => new KpiAssessmentDetailCollection($kpiAssessmentsDetail),
            'allKpiAssessmentsDetail' => KpiAssessmentDetailResource::collection($allKpiAssessmentsDetail),
        ]);
    }
}
