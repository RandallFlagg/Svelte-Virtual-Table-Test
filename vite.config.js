import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
//import { fileURLToPath, URL } from "node:url";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    svelte()
  ],

  optimizeDeps: {
    entries: []
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 4120,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**", "pnpm-lock.yaml", "node_modules"],
    },
    //  transpileDependencies: true,
    //resolve: {
    //    alias: {
    //      '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  //  root: 'src'
}));
