import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // Changed from "/" to "./" for better path resolution
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
  },
  server: {
    headers: {
      "Content-Type": "application/javascript", // Ensure correct MIME type
    },
  },
});
