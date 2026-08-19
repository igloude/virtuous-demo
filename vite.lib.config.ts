import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Library build: produces the publishable package output in `dist/`
// (ESM entry + a single stylesheet). Type declarations are emitted separately
// by `tsc -p tsconfig.build.json`. The demo site uses `vite.config.ts`.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Consumers bring their own React.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: "virtuous-demo[extname]",
      },
    },
  },
});
