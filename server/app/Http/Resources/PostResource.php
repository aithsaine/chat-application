<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
class PostResource extends JsonResource
{
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

        return [
            "user_name" =>$this->user->first_name." ".$this->user->last_name,
            "user_id"=>$this->user_id,
            "title"=>$this->title,
            "files"=>$files,
            "date"=>$this->created_at
        ];
    }
}
