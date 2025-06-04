<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Authenticated routes (Sanctum)
Route::middleware(['auth:sanctum'])->group(function () {

    // Authenticated user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Agents management
    Route::post('/addAgent', [RegisteredUserController::class, 'store']);
    Route::get('/agents', [RegisteredUserController::class, 'getAllAgents']);
    Route::get('/admin', [RegisteredUserController::class, 'getAdmin']);
    Route::get('/agentsByCategory/{category}', [RegisteredUserController::class, 'getAgentsByCategory']);
    Route::put('/agents/{id}', [RegisteredUserController::class, 'updateAgent']);
    Route::delete('/agents/{id}', [RegisteredUserController::class, 'deleteAgent']);

    // Tickets management
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/ticket/{id}', [TicketController::class, 'show']);
    Route::get('/tickets/agent/{id}', [TicketController::class, 'getTicketsByAgent']);

    // Tickets filtering by category
    Route::get('/pos', [TicketController::class, 'pos']);
    Route::get('/iss', [TicketController::class, 'iss']);
    Route::get('/qsa', [TicketController::class, 'qsa']);
    Route::get('/ubs', [TicketController::class, 'ubs']);
    Route::get('/allTickets', [TicketController::class, 'allTickets']);
    Route::get('/payroll', [TicketController::class, 'payroll']);

    // Ticket status updates
    Route::put('/tickets/{id}/status', [TicketController::class, 'updateStatus']);
    Route::put('/tickets/{id}/priority', [TicketController::class, 'updatePriority']);

    // Assign agent to ticket
    Route::put('/assignAgent/{id}', [TicketController::class, 'assignAgent']);

    // Notifications route - returns new tickets, assigned tickets, status updates
    Route::get('/notifications', [NotificationController::class, 'index']);

    // Messages related to tickets
    Route::get('/messages/{ticketId}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    

    
});

// Forgot password routes (public)
Route::post('sendOTP', [ForgotPasswordController::class, 'sendOTP']);
Route::post('verifyOTP', [ForgotPasswordController::class, 'verifyOTP']);
Route::post('resetPassword', [ForgotPasswordController::class, 'resetPassword']);

// Ticket status counts per agent
Route::get('/agent/{id}/countInProgressTicketsByAgent', [TicketController::class, 'countInProgressTicketsByAgent']);
Route::get('/agent/{id}/resolve-ticket-count', [TicketController::class, 'countResolveTicketsByAgent']);
Route::get('/agent/{id}/close-ticket-count', [TicketController::class, 'countCloseTicketsByAgent']);

// Ticket status counts for admin dashboard
Route::get('/tickets/open-count', [TicketController::class, 'countOpenTickets']);
Route::get('/tickets/pending-count', [TicketController::class, 'countPendingTickets']);
Route::get('/tickets/resolved-count', [TicketController::class, 'countResolvedTickets']);
Route::get('/tickets/closed-count', [TicketController::class, 'countClosedTickets']);
