<?php

use App\Http\Controllers\Firebase\LoginController;
use App\Http\Controllers\Firebase\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post('/firebase-login', [LoginController::class, 'login']);
Route::post('/firebase-register', [RegisterController::class, 'register']);
