import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // This is the magic line
    },
    host: true, // Ensures it listens on the network
    strictPort: true,
    port: 5173,
  },
})