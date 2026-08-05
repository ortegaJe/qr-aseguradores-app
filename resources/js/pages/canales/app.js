import { initWizard } from "./wizard.js";
import { cargarAseguradores } from "./fetch.js";
import { renderAseguradores } from "./render_test.js";
import { cargarRegionales } from "./fetch.js";
import { renderRegionales } from "./render_test.js";
import { track } from "./tracking.js";

document.addEventListener(

    "DOMContentLoaded",

    async()=>{

        try {

            initWizard();

            const aseguradores = await cargarAseguradores();

            renderAseguradores(aseguradores);

            const regionales = await cargarRegionales();
            
            renderRegionales(aseguradores);

            await track("QR_ESCANEADO");

        } catch (error) {

            console.error(error);

        }

    }

);