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
        if (Auth::user()->id != $request->user_id) {

            $follower = new Follower();
            $follower->user_id = Auth::user()->id;
            $follower->status = "followed";
            $follower->follower_id = $request->user_id;
            $save = $follower->save();
            if ($save)
                return response()->json(["status" => "success"]);
            return response()->json(["status" => "failed"]);
        }
    }

    public function delete($user_id)
    {


        $save = Follower::where("user_id", Auth::user()->id)->where("follower_id", $user_id)->first()->delete();
        if ($save)
            return response()->json(["status" => "success"]);
        return response()->json(["status" => "failed"]);
    }
}
