<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the registration request
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', 'min:8', 'confirmed'], 
            'category' => ['string', 'max:255'], 
            'role' => ['string', 'max:255'],
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'category' =>$request->category,
            'role' =>$request->role,
        ]);

        // Fire registration event
        event(new Registered($user));

        // Generate token
        $token = $user->createToken('ACCESS_TOKEN')->plainTextToken;

        // Return detailed JSON response
        return response()->json([
            'message' => 'Registration successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role'=>$user->category,
                'category'=>$user->category,
            ],
            'token' => $token,
        ], 201);
    }

    /**
     * Get all users with the 'agent' role.
     */
    public function getAllAgents(): JsonResponse
    {
        // Retrieve all users with the 'agent' role
        $agents = User::where('role', 'agent')->get();

        // Return the list of agents in a JSON response
        return response()->json([
            'agents' => $agents
        ], 200);
    }
}
