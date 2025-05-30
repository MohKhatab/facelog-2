import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// import fs from "fs";
// import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://facelog-nest.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),

        headers: {
          "Access-Control-Allow-Origin": "https://facelog-2.vercel.app",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
