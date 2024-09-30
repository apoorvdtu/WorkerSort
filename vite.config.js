import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js", // Entry point of your library
      name: "worker-sort", // Global name of your library
      fileName: (format) => `worker-sort.${format}.js`, // Output filename
      formats: ["es", "cjs"], // Build for ES modules and CommonJS
    },
    rollupOptions: {
      // Externalize dependencies (optional, depending on your project)
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
