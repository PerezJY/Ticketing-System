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
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'category' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'category' => $validated['category'] ?? null,
            'role' => $validated['role'] ?? 'user',
        ]);

        event(new Registered($user));

        $token = $user->createToken('access_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user->only(['id', 'name', 'email', 'role', 'category']),
            'token' => $token,
        ], 201);
    }

    /**
     * Get all users with the 'agent' role.
     */
    public function getAllAgents(): JsonResponse
    {
        $agents = User::where('role', 'agent')->get(['id', 'name', 'email', 'category']);

        return response()->json([
            'message' => 'Agent list retrieved successfully',
            'agents' => $agents
        ]);
    }


    public function getAgentsByCategory($category): JsonResponse
    {
        $agents = User::where('role', 'agent')
                      ->where('category', $category)
                      ->get();
    
        return response()->json([
            'message' => 'Agents found',
            'agents' => $agents
        ]);
    }

    /**
     * Update an agent by ID.
     */
    public function updateAgent(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
        ]);

        $agent = User::where('role', 'agent')->findOrFail($id);

        $agent->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'category' => $validated['category'],
        ]);

        return response()->json([
            'message' => 'Agent updated successfully',
            'agent' => $agent->only(['id', 'name', 'email', 'category']),
        ]);
    }

    /**
     * Delete an agent by ID.
     */
    public function deleteAgent(int $id): JsonResponse
    {
        $agent = User::where('role', 'agent')->findOrFail($id);

        $agent->delete();

        return response()->json([
            'message' => 'Agent deleted successfully',
            'deleted_agent_id' => $id,
        ]);
    }
}
