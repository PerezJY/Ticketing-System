<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ForgotPasswordController;


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

Route::get('/tickets/agent/{agentId}', [TicketController::class, 'getTicketsByAgent']);

// Forgot password routes
Route::post('sendOTP', [ForgotPasswordController::class, 'sendOTP']);
Route::post('verifyOTP', [ForgotPasswordController::class, 'verifyOTP']);
Route::post('resetPassword', [ForgotPasswordController::class, 'resetPassword']);
