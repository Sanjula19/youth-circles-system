import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/profile/",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 3002,
    strictPort: true,
  },
});
