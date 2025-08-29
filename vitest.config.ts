import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/coral-island-helper/',
    plugins: [
        react(),
        tailwindcss(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup/vitest.setup.ts',
        include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    },
});