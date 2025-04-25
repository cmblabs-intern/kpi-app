<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function() {
  Route::redirect('employees', 'employees/dashboard');

  // Rute untuk melihat daftar semua karyawan
  Route::get('employees/dashboard', [EmployeeController::class, 'index'])->name('employees.index');

  // Rute untuk melihat detail karyawan berdasarkan ID
  Route::get('employees/dashboard/{id}', [EmployeeController::class, 'show'])->name('employees.show');

// Rute untuk membuat karyawan baru
Route::post('employees/dashboard', [EmployeeController::class, 'store'])->name('employees.store');

// Rute untuk memperbarui data karyawan berdasarkan ID
Route::put('employees/dashboard/{id}', [EmployeeController::class, 'update'])->name('employees.update');

// Rute untuk menghapus karyawan berdasarkan ID
Route::delete('employees/dashboard/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
});