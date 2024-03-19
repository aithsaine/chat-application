<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
class PostResource extends JsonResource
{
    public static function  getDate($dt)
    {
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now())<60)
        {
            return (int)\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now())." second";
        }
        if(\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now())<60){
            return (int)\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now())." minute";
        }
        if(\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now())<24){
            return (int)\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now())." hour";
        }
        if (\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now())<=4)
        {
            return (int)\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now())." week";
        }
        return (int)\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now())." months";



    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $files = [];
        if($this->hasAssets){
            $files = Storage::files("posts/{$this->id}");
        }
        $timeval = $this->created_at;




        return [
            "user_picture"=>$this->user->picture,
            "user_name" =>$this->user->first_name." ".$this->user->last_name,
            "user_id"=>$this->user_id,
            "title"=>$this->title,
            "files"=>$files,
            "date"=>self::getDate($this->created_at)
        ];
    }
}
