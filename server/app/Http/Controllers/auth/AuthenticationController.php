<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use ErrorException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        try {
            User::validation($request);
            User::create([
                "first_name" => $request->first_name,
                "last_name" => $request->last_name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "birthday" => $request->birthday,
                "gender" => $request->gender
            ]);
            return response()->json(["message" => "registered successfully", "status" => "201"]);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }
    public function login(Request $request)
    {
        try {
            $request->validate([
                "email" => 'required|exists:users,email',
                "password" => "required",
            ]);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }
}
