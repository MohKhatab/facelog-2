import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/api": {
    //     // target: "https://facelog-nest.vercel.app",
    //     target: "http://localhost:8001",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
    //   cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    // },
    // port: 5173,
  },
  plugins: [tailwindcss(), react()],
});
