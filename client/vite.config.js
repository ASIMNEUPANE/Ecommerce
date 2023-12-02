import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gadgethub/",
  host: '127.0.0.1',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  }
});
