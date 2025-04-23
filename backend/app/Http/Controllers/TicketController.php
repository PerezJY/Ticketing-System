<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tickets;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    // Show all tickets (optional, for admin or user dashboard)
    public function index()
    {
        $tickets = Tickets::where('user_id', Auth::id())->latest()->get();
    
    // Debugging: Log the tickets
    Log::info('Tickets:', ['tickets' => $tickets]);
    
    return response()->json($tickets);
    }

    public function show($id)
    {
        $ticket = Tickets::with(['agent', 'customer'])->find($id);
    
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }
    
        return response()->json([
            'id' => $ticket->id,
            'status' => $ticket->status,
            'ticket_body' => $ticket->ticket_body,
            'image_path' => $ticket->image_path,
            'created_at' => $ticket->created_at->toDateTimeString(),
            'customer_name' => $ticket->customer->name ?? 'N/A',
            'agent_name' => $ticket->agent->name ?? 'Unassigned',
        ]);
    }
    

    // Show form to create a ticket
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
            'email' => 'required|email',
            'category' => 'required|string|max:255',
            'ticket_body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

        ]);
    
        $ticket = new Tickets();
        $ticket->user_id = Auth::id();
        $ticket->customer_name= Auth::user()->name;
        $ticket->email = $validated['email'];
        $ticket->category = $validated['category'];
        $ticket->ticket_body = $validated['ticket_body'];
        
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('uploads', 'public'); // stores in storage/app/public/uploads
            $ticket->image_path = $path;
        }
        $ticket->save();
    
        return response()->json(['message' => 'Ticket created successfully!'], 201);
}
}