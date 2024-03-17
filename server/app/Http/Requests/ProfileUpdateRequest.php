<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\VerifyAgeRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            "birthday" => ["required", "date", new VerifyAgeRule()],
        ];
    }
}
