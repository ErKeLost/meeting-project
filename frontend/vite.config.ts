import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import unocss from "@unocss/vite";
import path from "node:path";
console.log(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), unocss()],
});
