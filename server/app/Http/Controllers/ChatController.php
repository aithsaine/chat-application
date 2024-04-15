<?php

namespace App\Http\Controllers;

use App\Events\MessageNotification;
use App\Events\SendMessage;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function show()
    {

        $friends = UserResource::collection(auth()->user()->following);
        $messages = array_merge(Auth::user()->receivedMessages->toArray(), Auth::user()->sendMessages->toArray());
        return Inertia::render(
            "chat",
            [
                "user" => new UserResource(Auth::user()),
                "friends" => $friends,
                "msgs" => $messages
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
        broadcast(new MessageNotification($message));
        return;
    }


    public function markseen($receiver_id, $sender_id)
    {
        $chats = Chat::where("receiver_id", $receiver_id)
            ->where("sender_id", $sender_id)
            ->whereNull("seen_at")
            ->get();

        // Update the seen_at field for the retrieved chats
        $chats->each(function ($chat) {
            $chat->update(['seen_at' => now()]);
        });

        return response()->json(["success" => true]);
    }

    public function getUnseenMessages()
    {
        $value =  count(Chat::where("receiver_id", auth()->user()->id)->whereNull("seen_at")->get());
        return response()->json($value);
    }
}
