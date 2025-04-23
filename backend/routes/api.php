<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Notifications\VerifyEmail;

//  Authenticated user info (requires Sanctum token)
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//  Register and Login
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);