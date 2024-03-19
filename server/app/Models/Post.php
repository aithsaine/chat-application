<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ["title","user_id","hasAssets"];

    public function  user()
    {
        return $this->belongsTo(User::class);
    }
    public  static function validation(Request $request)
    {
        $request->validate([
            "title"=>"required|max:2000",
            "user_id"=>"required|exists:users,id",
            "postFile"=>"required|file"
        ]);

    }

}
