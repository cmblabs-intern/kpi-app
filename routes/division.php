<?php

use App\Http\Controllers\DivisionController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function() {
  Route::redirect('divisions', 'divisions/dashboard');

  // Rute untuk melihat daftar semua karyawan
  Route::get('divisions/dashboard', [DivisionController::class, 'index'])->name('divisions.index');

  // Rute untuk melihat detail karyawan berdasarkan ID
  Route::get('divisions/dashboard/{id}', [DivisionController::class, 'show'])->name('divisions.show');

// Rute untuk membuat karyawan baru
Route::post('divisions/dashboard', [DivisionController::class, 'store'])->name('divisions.store');

// Rute untuk memperbarui data karyawan berdasarkan ID
Route::put('divisions/dashboard/{id}', [DivisionController::class, 'update'])->name('divisions.update');

// Rute untuk menghapus karyawan berdasarkan ID
Route::delete('divisions/dashboard/{id}', [DivisionController::class, 'destroy'])->name('divisions.destroy');
});