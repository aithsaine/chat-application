<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use PHPUnit\Runner\ErrorException;

class PostController extends Controller
{
    public function store(Request $request)
    {
        Post::validation($request);
        $newPost = new Post();
        $id = uniqid();
        $newPost->id = $id;
        $newPost->title = $request->title;
        $newPost->user_id = $request->user_id;
        if($request->hasFile("postFile"))
        {
            $request->file("postFile")->storeAs("posts/{$id}/",$id.".".$request->file("postFile")->getClientOriginalExtension());
        }
        $newPost->save();
                return Redirect::route('dashboard');

    }
}
