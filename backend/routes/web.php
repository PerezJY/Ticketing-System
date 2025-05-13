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

Auth::routes();


