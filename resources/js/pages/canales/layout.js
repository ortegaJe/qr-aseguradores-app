export const stepLayout = {

    0: {

        logo: "welcome",

        back: false,

        help: false

    },

    1: {

        logo: "wizard",

        back: true,

        help: {

            titulo: "¿No encuentras tu asegurador?",

            subtitulo: "Contáctanos aquí",

            evento: "ASEGURADOR_NO_ENCONTRADO",

            url: "https://viva1a.com.co/lineas-de-atencion/",
        }

    },

    2: {

        logo: "wizard",

        back: true,

        help: {

            titulo: "¿No encuentras tu ciudad o municipio?",

            subtitulo: "Contáctanos aquí",

            evento: "CIUDAD_NO_ENCONTRADA",

            url: "https://viva1a.com.co/lineas-de-atencion/",

        }

    },

    3: {

        logo: "result",

        back: true,

        help: false

    }

};

export function updateLayout(step) {

    const config = stepLayout[step];

    updateLogo(config.logo);

    updateBack(config.back);

    updateHelp(config);

}

function updateLogo(type) {

    document.querySelectorAll(".layout-logo").forEach(logo => {

        logo.classList.add("d-none");

    });

    const currentLogo = document.querySelector(
        `.layout-logo[data-logo="${type}"]`
    );

    if (currentLogo) {

        currentLogo.classList.remove("d-none");

    }

}

function updateBack(show) {

    const btn = document.getElementById("btnBack");

    btn.classList.toggle("d-none",!show);

}

function updateHelp(config) {

    const link = document.getElementById("helpBoxLink");

    const title = document.getElementById("helpBoxTitle");

    const subtitle = document.getElementById("helpBoxSubtitle");

    if (!config.help) {

        link.classList.add("d-none");

        return;

    }

    link.classList.remove("d-none");

    title.textContent = config.help.titulo;

    subtitle.textContent = config.help.subtitulo;

    link.href = config.help.url;

    link.dataset.evento = config.help.evento;

}