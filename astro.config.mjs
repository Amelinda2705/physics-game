// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        name: "Poppins",
        cssVariable: "--font-poppins",
        provider: fontProviders.google()
      },
    ]
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [db()],
});