<?php

namespace App\Providers;

use App\Repositories\EmployeeRepository;
use App\Services\EmployeeService;
use Illuminate\Support\ServiceProvider;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
