import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
        server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        cors: true,
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    plugins: [
        laravel({
            input: [
                 'resources/css/app.css',
                 'resources/js/app.js', 
                 'resources/css/canales.css',
                 'resources/js/pages/canales/render.js',
                 'resources/js/pages/canales/app.js',
                 'resources/js/pages/canales/config.js',
                 'resources/js/pages/canales/fetch.js',
                 'resources/js/pages/canales/helper.js',
                 'resources/js/pages/canales/render_test.js',
                 'resources/js/pages/canales/state.js',
                 'resources/js/pages/canales/traking.js',
                 'resources/js/pages/canales/wizard.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
