<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //


    public function store(Request $request)
    {
        Comment::validate($request);
        Comment::create($request->only("user_id","post_id","content"));
       return response()->json(["message"=>"comment added","post"=>PostResource::make(Post::where("post_id",$request->post_id)->first())]);
    }
}
