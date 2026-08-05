<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrackingController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $fecha = now('America/Bogota');

         DB::table('tracking')->insert([
            'session_id' => $data['session_id'],
            'evento' => $data['evento'],
            'asegurador_id' => $data['asegurador_id'],
            'regional_id' => $data['regional_id'],
            'ciudad_id' => $data['ciudad_id'],
            'canal_id' => $data['canal_id'],
            'fecha' => $fecha,
         ]);

        return response()->json(['message' => 'Tracking data received successfully']);
    }
}
