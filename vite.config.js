// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import the 'path' module
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // Alias '@' to the 'src' directory
            "@components": path.resolve(__dirname, "src/components"), // Alias '@components' to 'src/components'
        },
    },
});
