<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Jenssegers\Agent\Agent;

class EventoController extends Controller
{
    public function store(Request $request)
    {
        
        $data = $request->all();

        $agent = new Agent();
        //$data['user_agent'] = $agent->setUserAgent($data['user_agent']);

        $fechaInicio = $this->getFechaInicio($data['session_id']);

        $fechaFin = now('America/Bogota');

        DB::table('eventos')->insert([
            'session_id' => $data['session_id'],
            'asegurador_id' => $data['asegurador'],
            'regional_id' => $data['regional'],
            'ciudad_id' => $data['ciudad'],
            'canal_id' => $data['canal'],
            //'user_agent' => $data['user_agent'],
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
        ]);

        return response()->json(['message' => 'Evento registrado exitosamente']);
    }

    private function getFechaInicio(string $sessionId)
    {
        return DB::table('tracking')
            ->where('session_id', $sessionId)
            ->where('evento', 'QR_ESCANEADO')
            ->min('fecha');
    }
}
