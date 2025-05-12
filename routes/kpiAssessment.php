<?php

use App\Http\Controllers\KpiAssessmentController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::prefix('kpi-assessments')->middleware(['auth', IsAdmin::class])->group(function() {
  Route::redirect('/', 'kpi-assessments/dashboard');

  // Dashboard penilaian KPI & tambah penilaian baru
  Route::get('/dashboard', [KpiAssessmentController::class, 'index'])->name('kpi-assessments.index');
  Route::post('/dashboard', [KpiAssessmentController::class, 'store'])->name('kpi-assessments.store');

  // Detail penilaian KPI berdasarkan bulan (daftar semua karyawan)
  Route::get('/dashboard/{month}', [KpiAssessmentController::class, 'showByMonth'])->name('kpi-assessments.showByMonth');  

  // Detail penilaian KPI berdasarkan karyawan di bulan tertentu
  Route::get('/dashboard/{month}/employee/{employeeId}', [KpiAssessmentController::class, 'showByEmployee'])->name('kpi-assessments.showByEmployee');
});