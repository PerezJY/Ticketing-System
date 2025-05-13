<?php

use Illuminate\Support\Facades\Route;
use App\HTTP\Controllers\PHPmailerController;
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/api.php';


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes(['verify' => true
]);
Route::get('send-mail',[PHPMailerController::class,'index'])->name('send.mail');
Route::post('send-mail',[PHPMailerController::class,'store'])->name('send.mail.post');
Auth::routes();


