<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{

    public function show($user_id)
    {
        $user = new UserResource(User::find($user_id));
        $posts = PostResource::collection($user->posts);
        if ($user)
            return Inertia::render("Account", [
                "user" => $user,
                "posts" => $posts
            ]);
        return Inertia::render("404");
    }
}
