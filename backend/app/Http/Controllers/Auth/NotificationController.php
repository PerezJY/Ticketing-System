<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use Carbon\Carbon;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // If user is an agent, show:
        // - New tickets assigned to them
        // - Tickets assigned to them with status updates
        // If user is admin, show:
        // - All new tickets
        // - Ticket status updates

        $notifications = collect();

        // Define a base query for new tickets created in last 7 days (adjust as needed)
        $newTicketsQuery = Ticket::where('created_at', '>=', Carbon::now()->subDays(7));

        // New tickets notifications
        if ($user->role === 'admin') {
            $newTickets = $newTicketsQuery->orderBy('created_at', 'desc')->take(10)->get();
        } else {
            // For agent: new tickets assigned to them
            $newTickets = $newTicketsQuery
                ->where('assigned_agent_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();
        }

        foreach ($newTickets as $ticket) {
            $notifications->push([
                'id' => 'ticket_new_' . $ticket->id,
                'type' => 'new_ticket',
                'title' => 'New Ticket Created',
                'message' => "Ticket #{$ticket->id} was created.",
                'time' => $ticket->created_at->diffForHumans(),
                'link' => "/tickets/{$ticket->id}",
            ]);
        }

        // Ticket status update notifications (last 7 days)
        $statusUpdatedTicketsQuery = Ticket::where('updated_at', '>=', Carbon::now()->subDays(7))
            ->whereColumn('updated_at', '>', 'created_at'); // updated after creation

        if ($user->role !== 'admin') {
            $statusUpdatedTicketsQuery->where('assigned_agent_id', $user->id);
        }

        $statusUpdatedTickets = $statusUpdatedTicketsQuery
            ->orderBy('updated_at', 'desc')
            ->take(10)
            ->get();

        foreach ($statusUpdatedTickets as $ticket) {
            $notifications->push([
                'id' => 'ticket_status_' . $ticket->id,
                'type' => 'ticket_status_update',
                'title' => 'Ticket Status Updated',
                'message' => "Status of Ticket #{$ticket->id} changed to '{$ticket->status}'.",
                'time' => $ticket->updated_at->diffForHumans(),
                'link' => "/tickets/{$ticket->id}",
            ]);
        }

        // Sort all notifications by time descending
        $notifications = $notifications->sortByDesc('time')->values();

        // Limit final notifications count
        $notifications = $notifications->take(20);

        return response()->json($notifications);
    }
}
