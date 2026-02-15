import { defineConfig } from 'vite';
import { join, dirname } from 'path';
import { builtinModules } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  build: {
    outDir: 'dist-electron',
    emptyOutDir: true,
    lib: {
      entry: 'main/index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: ['electron', ...builtinModules],
      input: {
        index: join(__dirname, 'main/index.ts'),
        preload: join(__dirname, 'preload/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});