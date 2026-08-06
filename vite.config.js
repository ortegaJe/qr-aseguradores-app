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
                 'resources/js/pages/canales/layout.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
