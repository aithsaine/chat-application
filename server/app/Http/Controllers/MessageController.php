<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    //

    public function index()
    {
        // $friends = UserResource::collection(Auth::user()->followers);
        $friends = UserResource::collection(User::all());
        return Inertia::render(
            "chat",
            [
                "user" => new UserResource(Auth::user()),
                "friends" => $friends
            ]
        );
    }
}
