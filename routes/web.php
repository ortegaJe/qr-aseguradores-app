<?php

use App\Http\Controllers\CanalesController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\FiltroController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CanalesController::class, 'index'])->name('canales.index');
Route::get('/qr', [CanalesController::class, 'qr']);

Route::get('/aseguradores', [FiltroController::class, 'getAseguradores']);
Route::get('/regionales', [FiltroController::class, 'getRegionalPorAseguradora']);
Route::get('/ciudades', [FiltroController::class, 'getCiudadPorRegional']);
Route::get('/canales', [FiltroController::class, 'getCanalPorCiudad']);

Route::post('/tracking', [TrackingController::class, 'store']);
Route::post('/evento', [EventoController::class, 'store']);

