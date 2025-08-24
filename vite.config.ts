import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@features": "/src/features",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@context": "/src/context",
      "@store": "/src/store",
      "@styles": "/src/styles",
    },
  },
});
