<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
class ReactionController extends Controller
{
    //
    public function store(Request $request)
    {
        Reaction::validate($request);
        $react = Reaction::where("user_id",$request->user_id)->where("post_id",$request->post_id)->first();
            if($react){
                if ($react->type ==$request->type)
                {
                    $react->delete();
                    return response()->json(["status"=>"success","post"=>PostResource::make($react->post)]);
                }
                $react->type = $request->type;
                $react->save();
                return response()->json(["status"=>"success","post"=>PostResource::make($react->post)]);
            }
           $react= new Reaction();
               $react->type=$request->type;
                $react->user_id=$request->user_id;
                $react->post_id=$request->post_id;
                $react->save();
        return response()->json(["status"=>"success","post"=>PostResource::make($react->post)]);

    }
}
