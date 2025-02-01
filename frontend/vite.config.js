import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensure the base path is correct
  build: {
    outDir: "dist", // Ensure the output is in dist
    assetsDir: "assets", // Assets are placed under /dist/assets
    manifest: true, // Include a manifest file for Vercel to detect assets correctly
  },
});
