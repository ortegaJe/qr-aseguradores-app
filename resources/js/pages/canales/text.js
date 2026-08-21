const dictionary = {
    // Canales
    "linea con la gerencia": "Línea con la Gerencia",
    "pagina web": "Página Web",
    "asignacion de citas e informacion": "Asignación de citas e información",
    "asignacion de citas y autorizaciones": "Asignación de citas y autorizaciones",
    "asignacion rapida de citas y otros tramites": "Asignación rápida de citas y otros trámites",
    
    // Ubicaciones
    "bogota": "Bogotá",
    "cienaga - magdalena": "Ciénaga - Magdalena",
    "medellin" : "Medellín",
    "jamundi" : "Jamundí",
    "popayan" : "Popayán",
    "monteria" : "Montería",
    "monteria - cordoba" : "Montería - Córdoba",
    "cali - jamundi" : "Cali - Jamundí",

    // Otros
};

// Capitaliza con exepciones y formatea un texto con tildes y mayúsculas según las reglas del español.

export function formatText(text) {

    if (!text) {
        return "";
    }

    const key = text
        .trim()
        .toLowerCase();

    // Si existe una versión definida manualmente,
    // respetamos exactamente esa versión.
    if (dictionary[key]) {
        return dictionary[key];
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
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word, index) => {

            if (index > 0 && exclude.includes(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);

        })
        .join(" ");
}