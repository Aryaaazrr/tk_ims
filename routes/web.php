<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('dashboard', DashboardController::class)->only(['index'])->name('index', 'dashboard.index');

    Route::prefix('master-data')->group(function () {
        Route::resource('pegawai', 'App\Http\Controllers\PegawaiController');
        Route::resource('wilayah', 'App\Http\Controllers\WilayahController');
        Route::resource('Pengguna', 'App\Http\Controllers\UserController');
        Route::resource('tindakan', 'App\Http\Controllers\TindakanController');
        Route::resource('obat', 'App\Http\Controllers\ObatController');
    });

    Route::resource('pasien', 'App\Http\Controllers\PasienController');
    Route::resource('transaksi', 'App\Http\Controllers\TransaksiController');
    Route::resource('laporan', 'App\Http\Controllers\LaporanController');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
