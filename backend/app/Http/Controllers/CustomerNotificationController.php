<?php

namespace App\Http\Controllers;

use App\Models\CustomerNotification;
use Illuminate\Http\Request;

class CustomerNotificationController extends Controller
{
     // Show all notifications
    public function index()
    {
        $notifications = CustomerNotification::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    public function getByTicketId($customer_id)
{
    $notifications = CustomerNotification::where('customer_id', $customer_id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($notifications);
}

    // Store new notification
   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'ticket_id' => 'required|integer|exists:tickets,id',
            'customer_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = CustomerNotification::create($validated);

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
        $notification = CustomerNotification::findOrFail($id);
        return response()->json($notification);
    }

    // Update (e.g., mark as read)
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification = CustomerNotification::findOrFail($id);
        $notification->update($validated);

        return response()->json([
            'message' => 'Notification updated.',
            'data' => $notification,
        ]);
    }

    // Delete a notification
    public function destroy($id)
    {
        $notification = CustomerNotification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}
