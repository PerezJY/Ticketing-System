<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//  Authenticated user info (requires Sanctum token)
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//  Register and Login
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Create ticket (requires Sanctum token)
Route::middleware(['auth:sanctum'])->post('/tickets', [TicketController::class, 'store']);
Route::middleware(['auth:sanctum'])->get('/notif', [TicketController::class, 'index'])->name('tickets.index');
Route::middleware(['auth:sanctum'])->get('/ticket/{id}', [TicketController::class, 'show']);