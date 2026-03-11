import path from "node:path";
import { defineConfig } from "vitest/config";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    dir: "src",
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: [
            "application/use-cases/**/*.spec.ts",
            "domain/**/*.spec.ts",
            "infra/**/*.spec.ts",
          ],
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/http/controller",
        },
      },
    ],
  },
});
