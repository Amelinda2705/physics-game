// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import db from "@astrojs/db";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    output: "server",

    experimental: {
        fonts: [
            {
                name: "FE 5 Cent",
                cssVariable: "--font-fe5cent",
                provider: "local",
                variants: [
                    {
                        weight: 400,
                        style: "normal",
                        src: ["src/fonts/FE5Cent-Regular.ttf"],
                    },
                ],
            },
            {
                provider: fontProviders.google(),
                name: "Poppins",
                cssVariable: "--font-roboto",
            },
        ],
    },

    devToolbar: {
        enabled: false,
    },

    vite: {
        plugins: [tailwindcss()],
        ssr: {
            external: ["source-map-js"],
        },
    },

    integrations: [db()],
    db: {
        studio: false,
    },

    adapter: cloudflare({
        imageService: "compile",
    }),
});
