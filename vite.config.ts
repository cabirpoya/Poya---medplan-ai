import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    root: 'src',
    base: './',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    }
  };
});