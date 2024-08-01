import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const $imports = AutoImport({
    vueTemplate: true,
    dts: "./src/shared/types/imports.d.ts",
    imports: ["vue"],
    dirs: ["./src/shared/utils/**"],
  });
  return {
    plugins: [vue(), $imports],
    resolve: {
      alias: {
        "#": fileURLToPath(new URL("./", import.meta.url)),
        $: fileURLToPath(new URL("./src", import.meta.url)),
        "@": fileURLToPath(new URL("./src/app", import.meta.url)),
        "&": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "~": fileURLToPath(new URL("./src/modules", import.meta.url))
      }
    },
    build: {
      minify: "esbuild",
      target: "esnext",
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString()
            }
          }
        }
      }
    },
  };
});
