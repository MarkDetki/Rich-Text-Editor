import {resolve} from 'path';

export default {
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist',
    },
    server: {
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:23123',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            cors: false,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "sass:map";`,
            },
        },
    },
    resolve: {
        alias: {
            '@view': './view/index.js',
        },
        extensions: ['.js'],
    },
};
