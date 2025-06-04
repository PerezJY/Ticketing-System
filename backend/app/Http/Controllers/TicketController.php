<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tickets;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    // List tickets for the authenticated user
    public function index()
    {
        $tickets = Tickets::where('user_id', Auth::id())->latest()->get();
        Log::info('User tickets retrieved', ['user_id' => Auth::id()]);
        return response()->json($tickets);
    }

    // List all tickets (admin)
    public function allTickets()
    {
        $tickets = Tickets::latest()->get();
        Log::info('All tickets retrieved');
        return response()->json($tickets);
    }

    // Filter endpoints by category
    public function pos()     { return $this->filterByCategory('POS for Retail and F&B'); }
    public function iss()     { return $this->filterByCategory('QTech Inventory Support System'); }
    public function qsa()     { return $this->filterByCategory('QSA (Quick and Single Accounting)'); }
    public function ubs()     { return $this->filterByCategory('QTech Utility Billing System'); }
    public function payroll() { return $this->filterByCategory('Philippine HR, Payroll and Time Keeping System'); }

    // Show a single ticket
    public function show($id)
    {
        $ticket = Tickets::with(['agent', 'customer'])->find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        return response()->json([
            'id'            => $ticket->id,
            'status'        => $ticket->status,
            'user_id'        => $ticket->user_id,
            'ticket_body'   => $ticket->ticket_body,
            'image_path'    => $ticket->image_path,
            'category'      => $ticket->category,
            'created_at'    => $ticket->created_at->toDateTimeString(),
            'customer_name' => optional($ticket->customer)->name ?? 'N/A',
            'agent_name'    => optional($ticket->agent)->name ?? 'Unassigned',
            'agent_id'      => $ticket->agent_id,
            'priority'      => $ticket->priority,
        ]);
    }

    // Store a new ticket
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'email'       => 'required|email',
            'category'    => 'required|string|max:255',
            'ticket_body' => 'required|string',
            'image_path'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $ticket = new Tickets();
        $ticket->user_id       = Auth::id();
        $ticket->customer_name = Auth::user()->name;
        $ticket->email         = $validated['email'];
        $ticket->category      = $validated['category'];
        $ticket->ticket_body   = $validated['ticket_body'];

        if ($request->hasFile('image_path')) {
        $path = $request->file('image_path')->store('uploads', 'public');
        $ticket->image_path = $path;
        }

        $ticket->save();

         return response()->json([
        'message' => 'Ticket created successfully',
        'ticket'  => [
            'id'            => $ticket->id,
            'customer_name'=> $ticket->customer_name,
            'email'        => $ticket->email,
            'category'     => $ticket->category,
            'ticket_body'  => $ticket->ticket_body,
            'image_url'    => $ticket->image_path 
                ? asset('storage/' . $ticket->image_path) 
                : null,
        ]
    ]);
    }

    // Assign an agent to a ticket
    public function assignAgent(Request $request, $id)
    {
        try {
            $request->validate([
                'agent_id' => 'required|exists:users,id',
            ]);

            $ticket = Tickets::findOrFail($id);

            $agent = User::where('id', $request->agent_id)
                         ->where('role', 'agent')
                         ->firstOrFail();

            $ticket->agent_id   = $agent->id;
            $ticket->agent_name = $agent->name;
            $ticket->status     = 'In Progress';
            $ticket->save();

            return response()->json([
                'agent_id'   => $ticket->agent_id,
                'agent_name' => $ticket->agent_name,
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error assigning agent', ['exception' => $e]);
            return response()->json([
                'message' => 'Server error while assigning agent',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // Update ticket status
    public function updateStatus(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|string|in:Open,In Progress,Resolved,Closed',
            ]);

            $ticket = Tickets::findOrFail($id);
            $ticket->status = $request->status;
            $ticket->save();

            return response()->json([
                'message' => 'Status updated successfully',
                'status'  => $ticket->status,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating status', ['exception' => $e]);
            return response()->json([
                'message' => 'Server error while updating status',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


      // Update ticket Priority
    public function updatePriority(Request $request, $id)
{
    try {
        // Validate priority field
        $request->validate([
            'priority' => 'required|string|in:Low,Medium,High,Urgent',
        ]);

        // Find ticket or fail
        $ticket = Tickets::findOrFail($id);

        // Update priority
        $ticket->priority = $request->priority;
        $ticket->save();

        return response()->json([
            'message' => 'Priority updated successfully',
            'priority' => $ticket->priority,
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error updating priority', ['exception' => $e]);

        return response()->json([
            'message' => 'Server error while updating priority',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function getTicketsByAgent($agentId)
{
    $agent = User::where('id', $agentId)->where('role', 'agent')->first();

    if (!$agent) {
        return response()->json(['message' => 'Agent not found'], 404);
    }

    $tickets = Tickets::with(['agent', 'customer'])
                      ->where('agent_id', $agentId)
                      ->latest()
                      ->get();

    return response()->json([
        'agent' => [
            'id' => $agent->id,
            'name' => $agent->name,
            'email' => $agent->email,
        ],
        'tickets' => $tickets->map(function($ticket) {
            return [
                'id'           => $ticket->id,
                'status'       => $ticket->status,
                'category'     => $ticket->category,
                'customer_name'=> $ticket->customer_name,
                'created_at'   => $ticket->created_at->toDateTimeString(),
                'agent_name' => $ticket->agent_name,
                'image_path' => $ticket->image_path,
                'priority'=> $ticket->priority,
                'ticket_body'=> $ticket->ticket_body
            ];
        }),
    ]);
}

public function countInProgressTicketsByAgent($agentId)
{
    $inProgressCount = Tickets::where('agent_id', $agentId)
                              ->where('status', 'In Progress')
                              ->count();

    return response()->json([
        'agent_id' => $agentId,
        'in_progress_ticket_count' => $inProgressCount,
    ]);
}

public function countResolveTicketsByAgent($agentId)
{
    $resolvedCount = Tickets::where('agent_id', $agentId)
                            ->where('status', 'Resolved')
                            ->count();

    return response()->json([
        'agent_id' => $agentId,
        'resolved_ticket_count' => $resolvedCount,
    ]);
}

public function countCloseTicketsByAgent($agentId)
{
    $closedCount = Tickets::where('agent_id', $agentId)
                          ->where('status', 'Closed')
                          ->count();

    return response()->json([
        'agent_id' => $agentId,
        'closed_ticket_count' => $closedCount,
    ]);
}
public function countOpenTickets()
{
    $openCount = Tickets::where('status', 'Opened')->count();
    return response()->json(['open_tickets_count' => $openCount]);
}

public function countPendingTickets()
{
    $pendingCount = Tickets::where('status', 'Pending')->count();
    return response()->json(['pending_tickets_count' => $pendingCount]);
}

public function countResolvedTickets()
{
    $resolvedCount = Tickets::where('status', 'Resolved')->count();
    return response()->json(['resolved_tickets_count' => $resolvedCount]);
}

public function countClosedTickets()
{
    $closedCount = Tickets::where('status', 'Closed')->count();
    return response()->json(['closed_tickets_count' => $closedCount]);
}



      
    // Helper method to filter tickets by category
    private function filterByCategory($category)
    {
        $tickets = Tickets::where('category', $category)->latest()->get();
        Log::info("Tickets filtered by category: $category");
        return response()->json($tickets);
    }
}


