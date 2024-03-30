<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            "user_id" => "required|exists:users,id",
        ]);
        $follower = new Follower();
        $follower->user_id = Auth::user()->id;
        $follower->status = "pending";
        $follower->follower_id = $request->user_id;
        $save = $follower->save();
        if ($save)
            return response()->json(["status" => "success"]);
        return response()->json(["status" => "failed"]);
    }
}
