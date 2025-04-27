<?php

use App\Http\Controllers\NotificationController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', IsAdmin::class])->group(function () {

     // Rute untuk menampilkan daftar semua notifikasi milik user yang login
     Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

     // Rute untuk menampilkan detail dari satu notifikasi berdasarkan ID
     Route::get('/notifications/{id}', [NotificationController::class, 'show'])->name('notifications.show');
 
     // Rute untuk membuat notifikasi baru (biasanya dipakai oleh sistem atau admin)
     Route::post('/notifications', [NotificationController::class, 'store'])->name('notifications.store');
 
     // Rute untuk menandai notifikasi tertentu sebagai "sudah dibaca"
     Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
 
     // Rute untuk menghapus notifikasi berdasarkan ID
     Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});
