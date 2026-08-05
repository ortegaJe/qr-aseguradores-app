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

            evento: "ASEGURADOR_NO_ENCONTRADO",
        }

    },

    2: {

        logo: "wizard",

        back: true,

        help: {

            titulo: "¿No encuentras tu ciudad o municipio?",

            evento: "CIUDAD_NO_ENCONTRADA",

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

    const help = document.getElementById("helpBox");

    const title = document.getElementById("helpBoxTitle");

    help.parentElement.classList.toggle("d-none", !config.help);

    title.textContent = config.help.titulo;

}