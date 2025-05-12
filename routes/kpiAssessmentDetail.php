<?php

use App\Http\Controllers\KpiAssessmentDetailController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::prefix('kpi-assessments')->middleware(['auth', IsAdmin::class])->group(function() {
  Route::redirect('details', '/details');

  Route::get('/details', [KpiAssessmentDetailController::class, 'details'])->name('details');

  Route::get('/employee-detail', [KpiAssessmentDetailController::class, 'employeeDetail'])->name('details.employee');
  
  Route::post('/notify', [KpiAssessmentDetailController::class, 'sendNotification'])->name('kpi.notify');

});