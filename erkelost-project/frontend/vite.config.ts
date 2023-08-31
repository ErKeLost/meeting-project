import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import AutoImport from "unplugin-auto-import/vite";
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
  server: {
    host: true,
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react(),
    unocss(),
    // AutoImport({
    //   imports: ["react"],
    //   dts: true,
    //   resolvers: [
    //     // 使用我自己编写的解析器，处理antd的组件
    //     AntDesignResolver({
    //       resolveIcons: true,
    //     }),
    //   ],
    // }),
  ],
});
