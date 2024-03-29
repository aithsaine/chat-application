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
    return Inertia::render('Dashboard',[
        "posts"=>\App\Http\Resources\PostResource::collection(\App\Models\Post::all())
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::controller(\App\Http\Controllers\PostController::class)->group(function(){
    Route::get("posts/index","index")->name("post.index");
    Route::post("post/store","store")->name("post.store");
    Route::get("post/assets/posts/{folder}/{filename}","getPostAsset");
})->middleware("auth");
Route::controller(\App\Http\Controllers\ReactionController::class)->group(function (){
    Route::post("reaction/store","store")->name("reaction.store");
})->middleware("auth");



require __DIR__ . '/auth.php';
