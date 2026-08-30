import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const spaFallbackPlugin = (): Plugin => ({
  name: 'spa-fallback-plugin',
  closeBundle() {
    try {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf-8');

        // 1. Create dist/404.html for GitHub Pages fallback
        fs.writeFileSync(path.join(distDir, '404.html'), indexHtml, 'utf-8');

        // 2. Create static directories with index.html for all known routes to ensure 100% 200 OK on refresh
        const routes = [
          'admin',
          'about',
          'what-we-do',
          'what-we-help-with',
          'professionals',
          'why-i-started',
          'get-involved',
          'donate',
          'contact',
          'community-survey',
          'professional-survey',
          'updates',
          'resources',
        ];

        for (const route of routes) {
          const routeDir = path.join(distDir, route);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml, 'utf-8');
        }
      }
    } catch (err) {
      console.warn('[SPA Fallback Plugin] Warning:', err);
    }
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), spaFallbackPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
