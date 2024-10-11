import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
        entry: 'src/hooks/useFetchFactory.ts', // Entry file for your library
        name: 'useFetch', // Global variable name for UMD builds
        fileName: (format) => `use-fetch-hook.${format}.ts`, // Output filename
    },
    rollupOptions: {
        // Make sure to externalize dependencies that shouldn't be bundled
        external: ['react', 'react-dom'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    },
},
})
