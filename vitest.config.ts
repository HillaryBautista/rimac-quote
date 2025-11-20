// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@core': path.resolve(__dirname, './src/core'),
            '@ui': path.resolve(__dirname, './src/ui'),
            '@domain': path.resolve(__dirname, './src/domain'),
            '@infra': path.resolve(__dirname, './src/infra'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setupTests.ts',
        css: true,
        coverage: {
            provider: 'v8', // o 'istanbul'
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'src/main.tsx',
                'src/core/styles/**',
                'src/assets/**',
            ],
        },
    },
});
