import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { defineConfig } from "vite";
config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4009,
    proxy: {
      "/api": {
        target: `http://localhost:4060`,
      },
    },
  },
});
