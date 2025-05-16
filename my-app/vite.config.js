import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escuchar en todas las interfaces
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443, // Puerto para HMR en Gitpod
    },
    allowedHosts: [
      '5173-fanor26-nodejsnunjucks-8t0pq5uy20b.ws-us118.gitpod.io',
      '.gitpod.io', // Permitir todos los subdominios de Gitpod
    ],
  },
});
