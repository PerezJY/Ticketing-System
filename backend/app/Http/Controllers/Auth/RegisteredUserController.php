<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Notifications\RegistrationNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        try {
            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'category' => $request->category,
                'terms_accepted_at' => now(),
            ]);

            // Send registration email
            $user->notify(new RegistrationNotification(
                $request->name,
                $request->email,
                $request->password
            ));

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'token' => $token
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
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

        public function getUserById(int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'message' => 'User retrieved successfully',
            'user' => $user,
        ]);
    }

        public function updateUserNameAndEmail(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255'],
        ]);

        $user = User::findOrFail($id);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->only(['id', 'name', 'email']),
        ]);
    }

    public function updatePassword(Request $request, int $id): JsonResponse
{
    $request->validate([
        'current_password' => ['required'],
        'new_password' => ['required', 'string', 'min:8', 'confirmed'], 
    ]);

    $user = User::findOrFail($id);

    // Verify the current password
    if (!Hash::check($request->current_password, $user->password)) {
        throw ValidationException::withMessages([
            'current_password' => ['The current password is incorrect.'],
        ]);
    }

    // Update the password
    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'message' => 'Password updated successfully.',
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
