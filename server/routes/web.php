<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ChatController;

use App\Http\Controllers\ProfileController;

use App\Http\Middleware\InAuthenticatedMiddleware;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', []);
})->name("welcome")->middleware(InAuthenticatedMiddleware::class);



// Structured Routes by Middleware

Route::middleware(["auth", 'last_seen'])->group(function () {

    Route::get('/storage/picture/{filename}', function ($filename) {
        $filePath = Storage::path('/profiles/' . $filename);

        $resp = response();

        return response()->file($filePath);
    })->name("picture.get");


    Route::get('/feed', function () {
        $suggestItems =
            UserResource::collection(App\Models\User::whereNot("id", Auth::user()->id)->limit(5)->get()) ?? [];
        return Inertia::render('Dashboard', [
            "suggests" => $suggestItems
        ]);
    })->name('dashboard');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get("user/{user_id}", [ProfileController::class, "getUser"]);
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch("/profile/picture/update", [ProfileController::class, "uploadOnlyPicture"])->name("profile.updatePicture");
    Route::get("posts/index", [\App\Http\Controllers\PostController::class, "index"])->name("post.index");
    Route::get("posts/{post_id}/show", [\App\Http\Controllers\PostController::class, "show"])->name("post.show");
    Route::post("post/store", [\App\Http\Controllers\PostController::class, "store"])->name("post.store");
    Route::get("post/assets/posts/{folder}/{filename}", [\App\Http\Controllers\PostController::class, "getPostAsset"]);

    Route::post("reaction/store", [\App\Http\Controllers\ReactionController::class, "store"])->name("reaction.store");

    Route::get("feed/upload/file", function () {
        return Inertia::render("uploadProfilePicture");
    })->name("feed.upload.file");


    Route::get("user/{user_id}", [AccountController::class, "show"])->name("account.show");
    Route::get("comments/{post_id}", [CommentController::class, "index"]);
    Route::post("comment/store", [CommentController::class, "store"])->name("comment.store");


    Route::post("follow/store", [FollowController::class, "store"])->name("follow.store");
    Route::delete("follow/{user_id}/delete", [FollowController::class, "delete"])->name("follow.delete");
    Route::get("chat", [ChatController::class, "show"])->middleware(["auth"]);
    Route::get("chat/messages", [ChatController::class, "getChat"]);
    Route::post("chat", [ChatController::class, "saveMessage"]);
});

















require __DIR__ . '/auth.php';