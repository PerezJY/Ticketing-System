<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminNotification;
use App\Models\Ticket; // singular
use App\Models\Tickets;
use Illuminate\Container\Attributes\Auth;

class AdminNotificationController extends Controller
{
    // Show all notifications
    public function index()
    {
        $notifications = AdminNotification::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    // Store new notification
   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'ticket_id' => 'required|integer|exists:tickets,id',
            'title' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = AdminNotification::create($validated);

        return response()->json([
            'message' => 'Notification created successfully.',
            'data' => $notification,
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'errors' => $e->errors(),
            'message' => 'Validation failed',
        ], 422);
    }
}


    // Show single notification
    public function show($id)
    {
        $notification = AdminNotification::findOrFail($id);
        return response()->json($notification);
    }

    // Update (e.g., mark as read)
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification = AdminNotification::findOrFail($id);
        $notification->update($validated);

        return response()->json([
            'message' => 'Notification updated.',
            'data' => $notification,
        ]);
    }

    // Delete a notification
    public function destroy($id)
    {
        $notification = AdminNotification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}
