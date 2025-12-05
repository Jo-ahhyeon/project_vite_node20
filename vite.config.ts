import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: '/',
  plugins: [
    svgr(),
    react(),
  ],
  
  
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // ⚡ 최신 Sass API 사용
      },
    },
  },
  
})