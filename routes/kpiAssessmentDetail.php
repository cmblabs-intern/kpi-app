<?php

use App\Http\Controllers\KpiAssessmentDetailController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function() {
  // Route::redirect('details', 'kpi-assessment/dashboard');

  Route::get('kpi-assessments/details', [KpiAssessmentDetailController::class, 'details']);
  Route::get('kpi-assessments/employee-detail', [KpiAssessmentDetailController::class, 'employeeDetail']);
  Route::post('kpi-assessments/notify', [KpiAssessmentDetailController::class, 'sendNotification'])->name('kpi.notify');

});