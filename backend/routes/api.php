<?php

use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\AgentNotificationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CustomerNotificationController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MessageController;
use App\Models\AgentNotification;

//  Authenticated user info (requires Sanctum token)
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//  Register and Login
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware(['auth:sanctum'])->post('/addAgent', [RegisteredUserController::class, 'store']);
Route::get('/agents', [RegisteredUserController::class, 'getAllAgents']);
Route::get('/admin', [RegisteredUserController::class, 'getAdmin']);
Route::get('/agentsByCategory/{category}', [RegisteredUserController::class, 'getAgentsByCategory']);


// Create ticket (requires Sanctum token)
Route::get('/pos', [TicketController::class, 'pos']);
Route::get('/iss', [TicketController::class, 'iss']);
Route::get('/qsa', [TicketController::class, 'qsa']);
Route::get('/ubs', [TicketController::class, 'ubs']);
Route::get('/allTickets', [TicketController::class, 'allTickets']);
Route::get('/payroll', [TicketController::class, 'payroll']);

Route::middleware(['auth:sanctum'])->post('/tickets', [TicketController::class, 'store']);
Route::middleware(['auth:sanctum'])->get('/notif', [TicketController::class, 'index'])->name('tickets.index');
Route::middleware(['auth:sanctum'])->get('/ticket/{id}', [TicketController::class, 'show']);

Route::put('/agents/{id}', [RegisteredUserController::class, 'updateAgent']);
Route::delete('/agents/{id}', [RegisteredUserController::class, 'deleteAgent']);
// In routes/api.php
Route::put('/assignAgent/{id}', [TicketController::class, 'assignAgent']);

Route::middleware('auth:api')->group(function () {
    Route::put('assignAgent/{id}', [TicketController::class, 'assignAgent']);
    Route::middleware(['auth:sanctum'])->put('/tickets/{id}/status', [TicketController::class, 'updateStatus']);
    Route::middleware(['auth:sanctum'])->put('/tickets/{id}/priority', [TicketController::class, 'updatePriority']);

    // plus any category routes if needed...
});

Route::middleware(['auth:sanctum'])->get('/tickets/agent/{id}', [TicketController::class, 'getTicketsByAgent']);

// Forgot password routes
Route::post('sendOTP', [ForgotPasswordController::class, 'sendOTP']);
Route::post('verifyOTP', [ForgotPasswordController::class, 'verifyOTP']);
Route::post('resetPassword', [ForgotPasswordController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/{ticketId}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
});
//tickets status by agent id

Route::get('/agent/{id}/countInProgressTicketsByAgent', [TicketController::class, 'countInProgressTicketsByAgent']);
Route::get('/agent/{id}/resolve-ticket-count', [TicketController::class, 'countResolveTicketsByAgent']);
Route::get('/agent/{id}/close-ticket-count', [TicketController::class, 'countCloseTicketsByAgent']);

// count tickets status by admin 
Route::get('/tickets/open-count', [TicketController::class, 'countOpenTickets']);
Route::get('/tickets/pending-count', [TicketController::class, 'countPendingTickets']);
Route::get('/tickets/resolved-count', [TicketController::class, 'countResolvedTickets']);
Route::get('/tickets/closed-count', [TicketController::class, 'countClosedTickets']);
//get user data using id
Route::get('/users/{id}', [RegisteredUserController::class, 'getUserById']);
Route::put('/users/{id}/update-name-email', [RegisteredUserController::class, 'updateUserNameAndEmail']);
Route::middleware('auth:sanctum')->put('/update-password/{id}', [RegisteredUserController::class, 'updatePassword']);

//notification admin
Route::post('/notification', [AdminNotificationController::class, 'store']);
Route::get('/allNotifications', [AdminNotificationController::class, 'index']);

//notification agent
Route::post('/agentnotification', [AgentNotificationController::class, 'store']);
Route::get('/agentnotifications/{user_ID}', [AgentNotificationController::class, 'getByTicketId']);
//notification customer
Route::post('/customernotification', [CustomerNotificationController::class, 'store']);
Route::get('/Customernotifications/{customer_id}', [CustomerNotificationController::class, 'getByTicketId']);