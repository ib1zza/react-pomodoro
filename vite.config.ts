import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const vitePwa = VitePWA({
  registerType: "autoUpdate",
  outDir: "dist",
  manifest: {
    name: "Pomodoro",
    short_name: "Pomodoro",
    theme_color: "#ffffff",
    description: "Pomodoro timer application",
    icons: [
      {
        src: "assets/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "assets/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "assets/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [react(), vitePwa],
});
