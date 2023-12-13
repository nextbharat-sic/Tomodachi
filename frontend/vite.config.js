import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { VitePWA } from "vite-plugin-pwa";
// import { VitePWAOptions } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  define: {
    global: "globalThis",
  },
});
