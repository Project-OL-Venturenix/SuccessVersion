import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
    },
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Grouping node_modules into a separate chunk
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 2000, // Adjust the warning limit if needed
    },
});
