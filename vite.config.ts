import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// http://cah2060.dothome.co.kr/promotion/
export default defineConfig({
  base: '/promotion/',
  plugins: [react()],
})
