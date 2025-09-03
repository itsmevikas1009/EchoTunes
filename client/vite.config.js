import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      proxy: command === 'serve' ? {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      } : undefined
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
    },
  };
});
