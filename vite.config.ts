import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react(), svgr()],
  base: mode === "production" ? "/animora/" : "/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://jah0515.mycafe24.com/animora",
        changeOrigin: true,
        secure: true,
      },
    },
  },
}));
