<?php

use App\Http\Controllers\KpiAssessmentController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function () {
    // Redirect default path ke dashboard KPI Metric
    Route::redirect('assesments', 'assesment/dashboard');       
    Route::get('/assesments', [KpiAssessmentController::class, 'index'])->name('assesments.index');
    Route::get('/assesment/create', [KpiAssessmentController::class, 'create'])->name('assessment.create');
    Route::post('/assesment', [KpiAssessmentController::class, 'store'])->name('assessments.store');

    Route::get('/assessments/{month}', [KpiAssessmentController::class, 'showByMonth'])
    ->name('assessments.show');
    Route::delete('/assessments/{id}', [KpiAssessmentController::class, 'destroy'])->name('assessments.destroy');
});