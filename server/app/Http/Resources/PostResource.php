<?php

namespace App\Http\Resources;

use App\Models\Reaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    public static function  getDate($dt)
    {
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 5) {
            return "just now";
        }
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) . " seconds ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) . " minutes ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) < 24) {
            return (int)\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) . " hours ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) < 7) {
            return (int)\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) . " days ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) <= 4) {
            return (int)\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) . " weeks ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) < 12) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) . " months ago";
        }

        return (int)\Carbon\Carbon::parse($dt)->diffInYears(Carbon::now()) . " years ago";
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $files = [];
        if ($this->hasAssets) {
            $files = Storage::files("posts/{$this->id}");
        }
        $timeval = $this->created_at;




        return [
            "user_picture" => $this->user->picture,
            "user_name" => $this->user->first_name . " " . $this->user->last_name,
            "user_id" => $this->user_id,
            "id" => $this->id,
            "title" => $this->title,
            "files" => $files,
            "commentsCount" => count($this->comments),
            "likes" => count(Reaction::where("post_id", $this->id)->where("type", "like")->get()),
            "dislikes" => count(Reaction::where("post_id", $this->id)->where("type", "dislike")->get()),
            "date" => self::getDate($this->created_at),
            "reaction" => Reaction::where("post_id", $this->id)->where("user_id", Auth::user()->id)->first()->type ?? "none"
        ];
    }
}
