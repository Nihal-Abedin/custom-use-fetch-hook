import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts()],
    build: {
        lib: {
            entry: 'src/hooks/index.ts',
            name: 'useFetchHook',
            formats: ['es', 'cjs'], // Build both ES module and CommonJS
            fileName: (format) => `use-fetch-hook.${format}.ts`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'], // Don't bundle these
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
