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
    
    Route::get('lol', function () {
        return Inertia::render('lol');
    })->name('lol');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/employee.php';
require __DIR__.'/division.php';
require __DIR__.'/notification.php';
require __DIR__ . '/report.php';

