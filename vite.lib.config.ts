import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  publicDir: false,
  plugins: [vue()],
  build: {
    outDir: "packages/ui/dist",
    lib: {
      entry: "src/ui/index.ts",
      name: "EDesign",
      formats: ["es"],
      fileName: "edesign",
      cssFileName: "edesign",
    },
    rollupOptions: { external: ["vue", "quasar"] },
  },
});
