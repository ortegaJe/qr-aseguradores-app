<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class CanalesController extends Controller
{
    public function index()
    {
        $sessionId = Str::uuid(); // Genera un ID de sesión único

        return view('canales.index', compact('sessionId'));
    }

    public function qr()
    {
        $rutaQr = 'images/qr/qr-nacional.svg';

        if (!Storage::disk('public')->exists($rutaQr)) {

            $url = route('canales.index');

            $qr = QrCode::size(200)->generate($url);

            Storage::disk('public')->put($rutaQr, $qr);
        }

        $qrUrl = Storage::disk('public')->url($rutaQr);

        return view('qr.index', compact('qrUrl'));
    }
}
