<?php

namespace App\Http\Controllers;

use App\Events\SendMessage;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function show()
    {

        $friends = UserResource::collection(User::all());
        return Inertia::render(
            "chat",
            [
                "user" => new UserResource(Auth::user()),
                "friends" => $friends,
            ]
        );
    }

    public function getChat()
    {

        $messges = array_merge(Auth::user()->receivedMessages->toArray(), Auth::user()->sendMessages->toArray());
        return response()->json(["messages" => $messges]);
    }

    public function saveMessage(Request $request)
    {
        $message = new Chat();
        $message->sender_id = Auth::user()->id;
        $message->receiver_id = $request->receiver_id;
        $message->message = $request->message;
        $message->save();
        broadcast(new SendMessage($message));
        return response()->json(["message" => $message->toArray(), "success" => true]);
    }
}
