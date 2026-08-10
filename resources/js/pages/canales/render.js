import { updateLayout } from "./layout.js";

/*
|--------------------------------------------------------------------------
| ESTADO GLOBAL
|--------------------------------------------------------------------------
*/

let current = 0;

const totalSteps = 3;

export const sessionData = {

    session_id: window.sessionId || null,

    asegurador: null,

    regional: null,

    ciudad: null,

    canal: null,
    
    fecha_inicio: new Date(),

    fecha_fin: null,

};

/*
        |--------------------------------------------------------------------------
        | INICIALIZACIÓN
        |--------------------------------------------------------------------------
        */

document.addEventListener(
    "DOMContentLoaded", 
    
    async () => {

        await init();
    }
);

async function init() {

    bindWelcome();

    bindHelpBox();
    
    bindBackButton();
    
    bindCiudades();
    
    bindCanales();

    track("QR_ESCANEADO");
}

/*
        |--------------------------------------------------------------------------
        | NAVEGACIÓN
        |--------------------------------------------------------------------------
        */

function goToStep(step) {

    current = step;

    document.querySelectorAll(".step").forEach(s => {
        s.classList.remove("active");
    });

    document
        .getElementById(`step${step}`)
        .classList.add("active");

    updateLayout(step);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Funciónes para mostrar y ocultar el loader
function showLoader(text = "Cargando...") {
    
    document.getElementById("loaderText").textContent = text;

    document.getElementById("stepLoader").classList.remove("d-none");
}

function hideLoader() {

    document.getElementById("stepLoader").classList.add("d-none");
}

// Función para ejecutar una acción con el loader visible
async function executeWithLoader(text, callback) {

    showLoader(text);

    try {

        return await callback();

    } finally {

        hideLoader();
    }
}

// Boton de retroceso
function bindBackButton() {

    const btnBack = document.getElementById("btnBack");

    const stepConfig = {
        1: "bienvenida",
        2: "asegurador",
        3: "ciudad",
        4: "canal",
    };

    btnBack.addEventListener("click", () => {
        if (current === 0) {
            return;
        }

        const fieldToClear = stepConfig[current];

        if (fieldToClear) {
            sessionData[fieldToClear] = null;
        }

        goToStep(current - 1);
    });
}

// Función para capitalizar la primera letra de cada palabra y excluir ciertas palabras
function capitalizeWords(text) {
    if (!text) {
        return "";
    }

    const exclude = [
        "de",
        "del",
        "la",
        "las",
        "el",
        "los",
        "y",
        "e",
        "o",
        "u",
        "con",
        "para",
        "por",
        "en",
        "a",
    ];

    return text
        .toLowerCase()
        .split(" ")
        .map((word, index) => {
            if (index > 0 && exclude.includes(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

/*
|--------------------------------------------------------------------------
| BIENVENIDA
|--------------------------------------------------------------------------
*/

function bindWelcome() {

    document
        .getElementById("btnStart")
        .addEventListener("click", async () => {

            await executeWithLoader(

                "Preparando la información...",

                async () => {

                    await cargarAseguradores();

                }

            );

            goToStep(1);

        });

}

/*
|--------------------------------------------------------------------------
| ASEGURADOR
|--------------------------------------------------------------------------
*/

async function cargarAseguradores() {

    const response = await fetch("/aseguradores");

    if (!response.ok) {

        const errorData = await response.json();

        throw new Error(
            errorData.message || "Error al cargar aseguradores"
        );

    }
    
    const aseguradores = await response.json();

    renderAseguradores(aseguradores);
}

function renderAseguradores(aseguradores) {
    const container = document.getElementById("aseguradoresContainer");

    container.innerHTML = "";

    aseguradores.forEach((item) => {
        container.innerHTML += `

            <div
                class="selection-card asegurador-option"
                data-id="${item.id}"
                data-nombre="${item.nombre}">

                <div class="selection-left">

                    <img
                        src="${item.logo}"
                        class="selection-logo">

                    <span class="${item.regimen ? 'selection-name-regimen' : item.regimen === null}">
                        ${item.regimen || ''}
                    </span>

                </div>

                <i class="bi bi-chevron-right selection-arrow"></i>

            </div>

            `;
    });

    bindAseguradores();
}

function bindAseguradores() {
    document.querySelectorAll(".asegurador-option").forEach((item) => {
        item.addEventListener("click", async () => {
            sessionData.asegurador = {
                id: item.dataset.id,

                nombre: item.dataset.nombre,
            };

            await executeWithLoader("Cargando...", async () => {
                await cargarCiudades(sessionData.asegurador.id);

                goToStep(2);
            });
        });
    });
}

/*
        |--------------------------------------------------------------------------
        | CIUDAD
        |--------------------------------------------------------------------------
        */

function bindCiudades() {
    document.querySelectorAll(".ciudad-option").forEach((item) => {
        item.addEventListener("click", async () => {
            sessionData.ciudad = {
                id: item.dataset.id,

                nombre: item.dataset.nombre,

                regional_id: item.dataset.regional,

                regional_nombre: item.dataset.regionalNombre,
            };

            await executeWithLoader("Cargando...", async () => {
                await cargarCanales(
                    sessionData.ciudad.regional_nombre,

                    sessionData.ciudad.regional_id,

                    sessionData.ciudad.id,

                    sessionData.asegurador.id,
                );

                goToStep(3);
            });
        });
    });
}

/*
        |--------------------------------------------------------------------------
        | CANALES
        |--------------------------------------------------------------------------
        */

function bindCanales() {
    document.querySelectorAll(".info-canales-option").forEach((btn) => {
        btn.addEventListener("click", async () => {
            sessionData.canal = {
                id: btn.dataset.id,

                nombre: btn.dataset.nombre,

                url: btn.dataset.url,
            };

            sessionData.fecha_fin = new Date();

            await track(`CANAL_${btn.dataset.nombre}`);

            await registrarEvento();

            //window.open(btn.dataset.url, "_self");
        });
    });
}

function bindHelpBox() {

    const helpBoxLink = document.getElementById("helpBoxLink");
    
    helpBoxLink.addEventListener("click", async () => {

        const evento = helpBoxLink.dataset.evento;

        if (evento) {

            await track(evento);

        }

    });
}

/*
        |--------------------------------------------------------------------------
        | TRACKING
        |--------------------------------------------------------------------------
        */

async function track(evento) {
    const payload = {
        session_id: sessionData.session_id,

        evento: evento,

        asegurador_id: sessionData.asegurador?.id ?? null,

        regional_id: sessionData.ciudad?.regional_id ?? null,

        ciudad_id: sessionData.ciudad?.id ?? null,

        canal_id: sessionData.canal?.id ?? null,

        fecha: new Date(),
    };

    try {
        await fetch("/tracking", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]',
                )?.content,
            },

            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Error tracking:", error);
    }
}

/*
        |--------------------------------------------------------------------------
        | REGISTRO FINAL
        |--------------------------------------------------------------------------
        */

async function registrarEvento() {
    const data = {
        session_id: sessionData.session_id,
        asegurador: sessionData.asegurador.id,
        regional: sessionData.ciudad.regional_id,
        ciudad: sessionData.ciudad.id,
        canal: sessionData.canal.id,
        fecha_inicio: sessionData.fecha_inicio,
        fecha_fin: sessionData.fecha_fin,
    };

    try {
        const response = await fetch("/evento", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]',
                )?.content,
            },

            body: JSON.stringify(data),
        });

        const result = await response.json();

    } catch (error) {
        console.error("Error registrando:", error);
    }
}

/*
|--------------------------------------------------------------------------
| CARGAS DINÁMICAS (LARAVEL)
|--------------------------------------------------------------------------
*/

function informacion(sessionData) {
    const aseguradorSeleccionado = sessionData.asegurador
        ? sessionData.asegurador.nombre
        : "N/A";
    const ciudadSeleccionada = sessionData.ciudad
        ? sessionData.ciudad.nombre
        : "N/A";

    const aseguradorElements = document.querySelectorAll(
        ".seleccionAsegurador",
    );
    if (aseguradorElements.length > 0) {
        aseguradorElements.forEach((element) => {
            const i = document.createElement("i");
            i.classList.add("bi", "bi-hospital", "me-2");
            element.textContent = "";
            element.appendChild(i);
            const textNode = document.createTextNode(aseguradorSeleccionado);
            element.appendChild(textNode);
        });
    }

    const ciudadElement = document.getElementById("seleccionCiudad");
    if (ciudadElement) {
        const i = document.createElement("i");
        i.classList.add("bi", "bi-geo-alt", "me-2");
        ciudadElement.textContent = "";
        ciudadElement.appendChild(i);
        const textNode = document.createTextNode(ciudadSeleccionada);
        ciudadElement.appendChild(textNode);
    }
}

async function cargarCiudades(aseguradorId) {

    const response = await fetch(
        `/ciudades?asegurador_id=${aseguradorId}`);

    if (!response.ok) {

        const errorData = await response.json();

        throw new Error(
            errorData.message || "Error al cargar ciudades"
        );

    }

    const ciudades = await response.json();

    renderCiudades(ciudades === null ? [] : ciudades);
}

function renderCiudades(ciudades) {
    const container = document.getElementById("ciudadesContainer");
    informacion(sessionData);

    container.innerHTML = "";

    ciudades.forEach((item) => {
        container.innerHTML += `

            <div
                class="selection-card ciudad-option"
                data-id="${item.id}"
                data-nombre="${item.nombre}"
                data-regional="${item.regional_id}"
                data-regional-nombre="${item.regional_nombre}">

                <div class="selection-left">

                    <i class="bi bi-geo-alt"></i>

                    <span class="selection-name">
                        ${item.nombre}
                    </span>

                </div>

                <i class="bi bi-chevron-right selection-arrow"></i>

            </div>

        `;
    });

    bindCiudades();
}

async function cargarCanales(
    regionalNombre,
    regionalId,
    ciudadId,
    aseguradorId,
) {
    const response = await fetch(
        `/canales?ciudad_id=${ciudadId}&asegurador_id=${aseguradorId}`,
    );

        if (!response.ok) {

        const errorData = await response.json();

        throw new Error(
            errorData.message || "Error al cargar canales"
        );

    }

    const canales = await response.json();

    renderCanales(canales === null ? [] : canales);
}

function renderCanales(canales) {
    const container = document.getElementById("canalesContainer");
    informacion(sessionData);

    container.innerHTML = "";

    canales.forEach((item) => {
        const nombre = capitalizeWords(item.nombre);

        container.innerHTML += `
                <a href="${item.url}" 
                    target="_blank"
                    class="channel-card info-canales-option"
                    data-id="${item.id}"
                    data-nombre="${item.nombre}"
                    data-url="${item.url}">
                    
                    <div class="channel-icon" style="background-color: ${item.color || "#2ECC71"}">
                        <i class="${item.icono || "bi bi-telephone-fill"}"></i>
                    </div>

                    <div class="channel-content">
                        <div class="channel-title" style="color: ${item.color || "#20A65A"}">
                            ${nombre}
                        </div>

                        <div class="channel-subtitle">
                            ${item.descripcion}
                        </div>
                    </div>

                    <div class="channel-arrow">
                        <i class="bi bi-chevron-right"></i>
                    </div>

                </a>
        `;
    });

    bindCanales();
}