import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Abre el navegador automáticamente al terminar
      gzipSize: true, // Muestra el peso real que descargará el usuario (comprimido)
      brotliSize: true, // Otra métrica de compresión moderna
      filename: "analisis-bundle.html", // El archivo que se va a generar
    }),
  ],
  build: {
    rollupOptions: {
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
    // Opcional: aumento del límite de advertencia por si un vendor pesa mucho
    chunkSizeWarningLimit: 600,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
