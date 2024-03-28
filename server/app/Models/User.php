<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Rules\VerifyAgeRule;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        "gender",
        "birthday",
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public static function validation(Request $request)
    {
        $request->validate([
            'first_name' => "required",
            "last_name" => "required",
            "email" => ["required", "unique:users,email",],
            "password" => "required",
            "birthday" => ["required", "date", new VerifyAgeRule()],
            "gender" => "required"
        ]);
    }
    public  function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function  reactions()
    {
        return $this->hasMany(Reaction::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
