import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fortæller Vite, at vi bruger React
export default defineConfig({
  plugins: [react()],
});