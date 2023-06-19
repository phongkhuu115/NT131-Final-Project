import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    origin: 'http://localhost:3333',
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:3333",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: path => path.replace('/api', ''),
    //   }
    // }
  },
});
