import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import { handleApiRequest } from './src/server/api';

const apiServerPlugin = (): Plugin => ({
  name: 'api-server-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const handled = await handleApiRequest(req, res);
      if (!handled) {
        next();
      }
    });
  },
});

const spaFallbackPlugin = (): Plugin => ({
  name: 'spa-fallback-plugin',
  closeBundle() {
    try {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');

      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf-8');

        fs.writeFileSync(
          path.join(distDir, '404.html'),
          indexHtml,
          'utf-8'
        );

        const adminDir = path.join(distDir, 'admin');

        if (!fs.existsSync(adminDir)) {
          fs.mkdirSync(adminDir, { recursive: true });
        }

        fs.writeFileSync(
          path.join(adminDir, 'index.html'),
          indexHtml,
          'utf-8'
        );
      }
    } catch (err) {
      console.warn('[SPA Fallback Plugin] Warning:', err);
    }
  },
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiServerPlugin(),
    spaFallbackPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
