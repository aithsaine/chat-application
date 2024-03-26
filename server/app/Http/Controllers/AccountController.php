<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    
    public function show($user_id)
    {
        $user = User::find($user_id);
        if ($user)
            return Inertia::render("Account", [
                "user" => $user
            ]);
        return Inertia::render("404");
    }
}