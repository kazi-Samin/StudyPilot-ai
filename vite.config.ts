import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Triggering Vite restart to reload tailwind config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
