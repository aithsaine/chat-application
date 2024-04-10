<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "gender" => $this->gender,
            "birthday" => $this->birthday,
            "picture" => $this->picture,
            "followers" => count($this->followers),
            "following" => count($this->following),
            "posts" => count($this->posts),
            "FollowStatus" => Follower::where("user_id", Auth::user()->id)->where("follower_id", $this->id)->first()?->status,
            "status" => Helper::userLastActivityStatus($this->last_seen)

        ];
    }
}
