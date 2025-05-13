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
        Log::info('User tickets:', ['user_id' => Auth::id(), 'tickets' => $tickets]);
        return response()->json($tickets);
    }

    // List all tickets (admin)
    public function allTickets()
    {
        $tickets = Tickets::latest()->get();
        Log::info('All tickets:', ['tickets' => $tickets]);
        return response()->json($tickets);
    }

    // Filter endpoints
    public function pos()    { return $this->filterByCategory('POS for Retail and F&B'); }
    public function iss()    { return $this->filterByCategory('QTech Inventory Support System'); }
    public function qsa()    { return $this->filterByCategory('QSA (Quick and Single Accounting)'); }
    public function ubs()    { return $this->filterByCategory('QTech Utility Billing System'); }
    public function payroll(){ return $this->filterByCategory('Philippine HR, Payroll and Time Keeping System'); }

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
            'ticket_body'   => $ticket->ticket_body,
            'image_path'    => $ticket->image_path,
            'category'      => $ticket->category,
            'created_at'    => $ticket->created_at->toDateTimeString(),
            'customer_name' => $ticket->customer->name ?? 'N/A',
            'agent_name'    => $ticket->agent->name ?? 'Unassigned',
            'agent_id'      => $ticket->agent_id,
        ]);
    }

    // Create form (web)
    public function create()
    {
        return view('tickets.create');
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
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $ticket = new Tickets();
        $ticket->user_id       = Auth::id();
        $ticket->customer_name = Auth::user()->name;
        $ticket->email         = $validated['email'];
        $ticket->category      = $validated['category'];
        $ticket->ticket_body   = $validated['ticket_body'];

        if ($request->hasFile('image')) {
            $ticket->image_path = $request->file('image')->store('uploads', 'public');
        }

        $ticket->save();
        return response()->json(['message' => 'Ticket created successfully!'], 201);
    }

    // Assign an agent
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
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $ve->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('assignAgent error', ['exception' => $e]);
            return response()->json([
                'message' => 'Server error while assigning agent',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // Helper for category filtering
    private function filterByCategory($category)
    {
        $tickets = Tickets::where('category', $category)->latest()->get();
        Log::info("Tickets for {$category}:", ['tickets' => $tickets]);
        return response()->json($tickets);
    }
}
