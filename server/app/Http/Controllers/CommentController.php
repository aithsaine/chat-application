<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($post_id)
    {
        $comments = Comment::where('post_id', $post_id)->orderByDesc("created_at")->get();
        return response()->json(["status" => "success", "comments" => CommentResource::collection($comments)]);
    }
    public function store(Request $request)
    {
        Comment::validate($request);
        $comment =   Comment::create($request->only("user_id", "post_id", "content"));
        return response()->json(["comment" => new CommentResource($comment), "status" => "success"]);
    }
}
