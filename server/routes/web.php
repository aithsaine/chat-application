<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommentController;
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

    $resp = response();

    return response()->file($filePath);
})->middleware("auth")->name("picture.get");

Route::get('/feed', function () {
    return Inertia::render('Dashboard', [
        "posts" => \App\Http\Resources\PostResource::collection(\App\Models\Post::all()),
        "suggests" => App\Models\User::limit(5)->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch("/profile/picture/update", [ProfileController::class, "uploadOnlyPicture"])->name("profile.updatePicture");
});
Route::controller(\App\Http\Controllers\PostController::class)->group(function () {
    Route::get("posts/index", "index")->name("post.index");
    Route::get("posts/{post_id}/show", "show")->name("post.show");
    Route::post("post/store", "store")->name("post.store");
    Route::get("post/assets/posts/{folder}/{filename}", "getPostAsset");
})->middleware("auth");

Route::controller(\App\Http\Controllers\ReactionController::class)->group(function () {
    Route::post("reaction/store", "store")->name("reaction.store");
})->middleware("auth");

Route::get("feed/upload/file", function () {
    return Inertia::render("uploadProfilePicture");
})->middleware("auth")->name("feed.upload.file");


Route::controller(AccountController::class)->group(function () {
    Route::get("account/{user_id}/show", "show")->name("account.show");
})->middleware(['auth']);

Route::controller(CommentController::class)->group(function () {
    Route::get("comments/{post_id}", "index");
    Route::post("comment/store", "store")->name("comment.store");
});

require __DIR__ . '/auth.php';
