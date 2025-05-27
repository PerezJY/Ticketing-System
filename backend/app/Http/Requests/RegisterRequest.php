<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:customer,agent,admin',
            'terms_accepted' => 'required|boolean|accepted'
        ];
    }

    public function messages()
    {
        return [
            'terms_accepted.required' => 'You must accept the terms and conditions to register.',
            'terms_accepted.accepted' => 'You must accept the terms and conditions to register.',
            'password.confirmed' => 'The password confirmation does not match.',
            'email.unique' => 'This email is already registered.',
            'role.in' => 'Invalid role selected.'
        ];
    }
} 