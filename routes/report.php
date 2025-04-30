<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::redirect('report', 'report/dashboard');

    Route::get('report/dashboard', [ReportController::class, 'index'])->name('report.index');
});
