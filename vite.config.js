import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);

const env = loadEnv(process.env.NODE_ENV, process.cwd());
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
    "process.env.API_URL": JSON.stringify(env.VITE_API_URL),
  },
});
