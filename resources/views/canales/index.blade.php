@extends('layouts.app')

@section('css')
    @vite(['resources/css/canales.css'])
@endsection

@section('js')
    @vite(['resources/js/pages/canales/render.js'])
    <script>
        window.sessionId = "{{ $sessionId }}";
    </script>
@endsection

@section('content')
    <div class="container-mobile" id="containerMobile">

        <div id="stepLoader" class="step-loader d-none">

            <div class="loader-content">

                <span class="loader-text" id="loaderText">
                    Cargando...
                </span>

                <div class="loader-dots">

                    <span></span>

                    <span></span>

                    <span></span>

                </div>

            </div>

        </div>

        <div class="top-bar">

            <button id="btnBack" class="btn-back d-none">

                <i class="bi bi-chevron-left"></i>

                <span>Volver</span>

            </button>

        </div>

        <!-- PASO 0 -->

        <div class="step active" id="step0">

            <div class="welcome-container">

                <div class="logo-circle layout-logo" data-logo="welcome">

                    <img src="{{ Storage::url('images/logo-viva.png') }}" alt="logo-circle-viva-1a">

                </div>

                <h1 class="welcome-title">

                    Bienvenido a
                    <br>

                    <span>VIVA Online</span>

                </h1>

                <p class="welcome-description">

                    Gestiona tus citas y autorizaciones
                    de forma fácil y sin desplazarte,
                    a través del canal que prefieras.

                </p>

                <div class="welcome-illustration">

                    <img src="{{ Storage::url('images/agent-welcome.png') }}" alt="agent-welcome">

                </div>

                <button id="btnStart" class="btn-start">

                    INICIAR

                    <i class="bi bi-chevron-right"></i>

                </button>

                <p class="welcome-footer">
                    <strong>
                        Cuidamos la salud de tu familia
                        como si fuera la nuestra.
                    </strong>

                </p>

            </div>

        </div>

        <!-- LOGO WIZARD -->

        <div class="logo-circle layout-logo d-none" data-logo="wizard">

            <img src="{{ Storage::url('images/logo-viva.png') }}" alt="logo-circle-viva-1a1">

        </div>

        <!-- PASO 1 -->

        <div class="step" id="step1">

            <div class="step-header">

                <h1 class="step-title">
                    Selecciona tu EPS
                </h1>

            </div>

            <div class="container-list" id="aseguradoresContainer"></div>

        </div>

        <!-- PASO 2 -->

        <div class="step" id="step2">

            <div class="step-header">

                <h1 class="step-title">
                    Selecciona tu ciudad o municipio
                </h1>

                <p class="step-description">
                    EPS seleccionada
                    <br>
                    <span class="seleccionAsegurador step-description-seleccionado"></span>
                </p>

            </div>

            <div id="ciudadesContainer"></div>

        </div>

        <!-- RESULTADO -->

        <div class="step" id="step3">

            <div class="result-header">

                <div class="logo-circle layout-logo" data-logo="result">

                    <img src="{{ Storage::url('images/logo-viva.png') }}" alt="logo-circle-viva-1a">

                </div>

                <div class="result-insurance" id="resultInsuranceClass">

                    <span class="seleccionAsegurador"></span>

                </div>

                <div class="result-city">

                    <span id="seleccionCiudad"></span>

                </div>

            </div>

            <h2 class="step-title-result">
                Elige tu canal de atención
            </h2>

            <div id="canalesContainer"></div>

            <div class="result-social">

                <p>Síguenos en nuestras redes</p>

                <div class="social-icons">

                    <a href="https://www.instagram.com/viva1aips/?hl=es" target="_blank">
                        <i class="bi bi-instagram"></i>
                    </a>

                    <a href="https://www.facebook.com/p/VIVA-1A-IPS-100062864113799/?locale=es_LA" target="_blank">
                        <i class="bi bi-facebook"></i>
                    </a>

                    <a href="https://x.com/viva1aips/with_replies" target="_blank">
                        <i class="bi bi-twitter-x"></i>
                    </a>

                </div>

            </div>

        </div>

        <!-- HELP BOX -->

        <a href="#" target="_blank" class="help-box-link d-none" id="helpBoxLink" data-evento="">

            <div class="help-box" id="helpBox">

                <i class="bi bi-headset"></i>

                <div>
                    <strong id="helpBoxTitle"></strong>
                    <br>
                    <span id="helpBoxSubtitle"></span>
                </div>

            </div>
        </a>

    </div>
@endsection
