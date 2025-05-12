<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::prefix('employees')->middleware(['auth', IsAdmin::class])->group(function() {
  Route::redirect('/', 'employees/dashboard');

  // Rute untuk melihat daftar semua karyawan
  Route::get('/dashboard', [EmployeeController::class, 'index'])->name('employees.index');

  // Rute untuk melihat detail karyawan berdasarkan ID
  Route::get('/dashboard/{id}', [EmployeeController::class, 'show'])->name('employees.show');

// Rute untuk membuat karyawan baru
Route::post('/dashboard', [EmployeeController::class, 'store'])->name('employees.store');

// Rute untuk memperbarui data karyawan berdasarkan ID
Route::put('/dashboard/{id}', [EmployeeController::class, 'update'])->name('employees.update');

// Rute untuk menghapus karyawan berdasarkan ID
Route::delete('/dashboard/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
});