<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class FiltroController extends Controller
{

    public function getAseguradores()
    {
        $aseguradores = DB::table('aseguradores')
            ->where('estado', 1)
            ->select(
                'id', 
                'nombre', 
                'logo',
                'regimen'
            )
            ->orderBy('orden')
            ->get()
            ->map(function ($asegurador) {
                return [
                    'id' => $asegurador->id,
                    'nombre' => $asegurador->nombre,
                    'logo' => asset(Storage::url('images/'. $asegurador->logo)),
                    'regimen' => $asegurador->regimen,
                ];
            });
        
        return response()->json($aseguradores);
    }

    public function getRegionalPorAseguradora(Request $request)
    {
        $aseguradorId = $request->query('asegurador_id');

         $regionales = DB::table('regionales as a')
                ->join('rel_asegurador_regional as b', 'b.regional_id', 'a.id')
                ->join('aseguradores as c', 'b.asegurador_id', 'c.id')
                ->select(DB::raw("DISTINCT a.id, a.nombre, b.asegurador_id, a.icono"))
                ->where('c.id', $aseguradorId)
                ->where('c.estado', 1)
                ->orderBy('a.nombre')
                ->get();

        return response()->json($regionales);
    }

    public function getCiudadPorRegional(Request $request)
    {
        //$ciudadId = $request->query('ciudad_id');
        $aseguradorId = $request->query('asegurador_id');

        $ciudades = DB::table('ciudades as a')
                ->join('rel_regional_ciudad as b', 'b.ciudad_id', 'a.id')
                ->join('regionales as c', 'b.regional_id', 'c.id')
                ->select(
                    DB::raw("DISTINCT 
                                a.id, 
                                a.nombre, 
                                b.asegurador_id, 
                                c.nombre as regional_nombre, 
                                b.regional_id"))
                //->where('c.ciudad_id', $ciudadId)
                ->where('b.asegurador_id', $aseguradorId)
                ->where('b.estado', 1)
                ->orderBy('a.nombre')
                ->get();

        return response()->json($ciudades);
    }

    public function getCanalPorCiudad(Request $request)
    {
        $ciudadId = $request->query('ciudad_id');
        $aseguradorId = $request->query('asegurador_id');

        $canales = DB::table('canales as a')
                ->join('rel_ciudad_canal as b', 'b.canal_id', 'a.id')
                ->join('ciudades as c', 'b.ciudad_id', 'c.id')
                ->select(
                    DB::raw("DISTINCT 
                                a.id, 
                                a.nombre, 
                                a.icono, 
                                a.color, 
                                a.tipo, 
                                a.descripcion, 
                                b.valor, 
                                b.ciudad_id"))
                ->where('c.id', $ciudadId)
                ->where('b.asegurador_id', $aseguradorId)
                ->where('b.estado', 1)
                ->orderByDesc('a.nombre')
                ->get();

        $canales->transform(function ($canal) {

            $stringHttps = 'https://';

            $canal->url = match ($canal->tipo) {

                'telefono' =>
                    'tel:' . $canal->valor,

                'whatsapp' =>
                    $stringHttps . 'wa.me/' . preg_replace('/\D/', '', $canal->valor),

                'url' =>
                     $stringHttps . $canal->valor,

                default =>
                    $canal->valor
            };

            return $canal;
        });

        return response()->json($canales);
    }

    public function getAyuda()
    {
        $canal = DB::table('ayudas')->where('estado', 1)->first();

        return response()->json($canal);
    }
}
