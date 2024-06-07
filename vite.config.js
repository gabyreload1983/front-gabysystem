import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
  },
});
