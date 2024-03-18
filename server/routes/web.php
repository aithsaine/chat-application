<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\InAuthenticatedMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', []);
})->name("welcome")->middleware(InAuthenticatedMiddleware::class);

Route::get('/storage/picture/{filename}', function ($filename) {
    $filePath = Storage::path('/profiles/' . $filename);

    return response()->file($filePath);
})->middleware("auth")->name("picture.get");

Route::get('/feed', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
