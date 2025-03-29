import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "react-h5-audio-player/src/styles.scss";`
      }
    }
  },
  server: {
    port: Number(process.env.PORT) || 10000, //  Use dynamic port for Render
    host: "0.0.0.0",
    allowedHosts: ["fullstack-radio-station.onrender.com"]
  }
});
