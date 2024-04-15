<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\Runner\ErrorException;

class PostController extends Controller
{

    public function index()
    {
        $posts = PostResource::collection(Post::orderByDesc("created_at")->paginate(30));
        return response()->json(["posts" => $posts, "status" => "success", "length" => count(Post::all())]);
    }
    public function show($post_id)
    {
        $post = PostResource::make(Post::where("id", $post_id)->first());
        $comments = $post->comments;
        return response()->json(["post" => $post, "comments" => $comments, "status" => "success"]);
    }
    public function store(Request $request)
    {
        Post::validation($request);
        $newPost = new Post();
        $newPost->title = $request->title;
        $newPost->user_id = $request->user_id;
        $newPost->save();

        if ($request->hasFile("postFile")) {
            $newPost->hasAssets = true;
            $request->file("postFile")->store("posts/{$newPost->id}/");
        }
        $newPost->save();
        return response()->json(["message" => "post created with success", "post" => PostResource::make($newPost), "status" => "success"]);
    }

    public function getPostAsset($folder, $filename)
    {
        $filePath = Storage::path("posts/" . $folder . "/" . $filename);

        return response()->file($filePath);
    }
}
