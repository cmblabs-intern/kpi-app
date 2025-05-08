<?php

use App\Http\Controllers\KpiMetricController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function () {
    // Redirect default path ke dashboard KPI Metric
    Route::redirect('kpi-metrics', 'kpi-metrics/dashboard');

    // Rute untuk melihat daftar semua KPI Metric
    Route::get('kpi-metrics/dashboard', [KpiMetricController::class, 'index'])->name('kpi-metrics.index');

    // Rute untuk melihat detail KPI Metric berdasarkan ID
    Route::get('kpi-metrics/dashboard/{id}', [KpiMetricController::class, 'show'])->name('kpi-metrics.show');

    // Rute untuk membuat KPI Metric baru
    Route::post('kpi-metrics/dashboard', [KpiMetricController::class, 'store'])->name('kpi-metrics.store');

    // Rute untuk memperbarui KPI Metric berdasarkan ID
    Route::put('kpi-metrics/dashboard/{id}', [KpiMetricController::class, 'update'])->name('kpi-metrics.update');

    // Rute untuk menghapus KPI Metric berdasarkan ID
    Route::delete('kpi-metrics/dashboard/{id}', [KpiMetricController::class, 'destroy'])->name('kpi-metrics.destroy');
});
