import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      include: ["./src/**/*.{test,spec}.{ts,tsx}"],
      reporters: ["json", "default"],
      outputFile: "test-results.json",
      coverage: {
        enabled: true,
        reporter: ["text", "json", "html"],
      },
    },
  })
);
