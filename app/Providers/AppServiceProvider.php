<?php

namespace App\Providers;

use App\Http\Resources\DivisionCollection;
use App\Http\Resources\DivisionResource;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Models\Division;
use App\Models\Employee;
use App\Repositories\DivisionRepository;
use App\Repositories\EmployeeRepository;
use App\Services\DivisionService;
use App\Services\EmployeeService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(EmployeeRepository::class, function ($app) {
            return new EmployeeRepository();
        });

        $this->app->bind(EmployeeService::class, function ($app) {
            return new EmployeeService($app->make(EmployeeRepository::class));
        });
        
        $this->app->bind(DivisionRepository::class, function ($app) {
            return new DivisionRepository();
        });

        $this->app->bind(DivisionService::class, function ($app) {
            return new DivisionService($app->make(DivisionRepository::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $divisions = Division::paginate(10);
        $allDivisions = Division::all();
        $employees = Employee::paginate(10);
        $allEmployees = Employee::all();

        Inertia::share([
            'allDivisions' => DivisionResource::collection($allDivisions),
            'allEmployees' => EmployeeResource::collection($allEmployees),
            'divisions' => new DivisionCollection($divisions),
            'employees' => new EmployeeCollection($employees),
        ]);
    }
}
