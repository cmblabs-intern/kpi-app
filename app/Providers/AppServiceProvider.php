<?php

namespace App\Providers;

use App\Http\Resources\DivisionCollection;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\KpiMetricCollection;
use App\Http\Resources\KpiMetricResource;
use App\Models\Division;
use App\Models\Employee;
use App\Models\KpiMetric;
use App\Repositories\DivisionRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\KpiMetricRepository;
use App\Services\DivisionService;
use App\Services\EmployeeService;
use App\Services\KpiMetricService;
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

        Inertia::share([
            'divisions' => new DivisionCollection($divisions),
            'allDivisions' => DivisionResource::collection($allDivisions),
            'employees' => new EmployeeCollection($employees),
            'allEmployees' => EmployeeResource::collection($allEmployees),
            'kpiMetrics' => new KpiMetricCollection($kpiMetrics),
            'allKpiMetrics' => KpiMetricResource::collection($allKpiMetrics),
        ]);
    }
}
