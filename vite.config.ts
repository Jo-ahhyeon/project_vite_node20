import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// http://cah2060.dothome.co.kr/promotion/
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