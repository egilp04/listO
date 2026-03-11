import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "dist/analisis-bundle.html",
        }),
      ],
      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react-dom/client",
            "react-router-dom",
          ],
          "supabase-vendor": ["@supabase/supabase-js"],
          "graficos-vendor": ["recharts"],
          "animaciones-vendor": ["gsap", "gsap/ScrollTrigger", "gsap/Observer"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
