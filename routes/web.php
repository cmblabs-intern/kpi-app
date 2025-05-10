<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('kpi/my-scores', function () {
        return Inertia::render('kpi/my-scores');
    })->name('kpi/my-scores');
    
    Route::get('kpi-assessments/dashboard', function () {
        return Inertia::render('kpi-assessments/dashboard');
    })->name('kpi-assessments/dashboard');
    
    Route::get('penilaian-kpi/dashboard', function () {
        return Inertia::render('penilaian-kpi/dashboard');
    })->name('penilaian-kpi/dashboard');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/employee.php';
require __DIR__.'/division.php';
require __DIR__.'/notification.php';
require __DIR__ . '/report.php';
require __DIR__.'/kpimetric.php';
require __DIR__.'/kpiAssessmentDetail.php';
