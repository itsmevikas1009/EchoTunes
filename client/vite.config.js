import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true, // Allow external connections
      // Proxy configuration for development only
      proxy: command === 'serve' ? {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('Proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Sending Request:', req.method, req.url);
            });
          },
        }
      } : undefined
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['axios']
          }
        }
      }
    },
    define: {
      __DEV__: mode === 'development'
    }
  };
});
