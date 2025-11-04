// pages/api/questions.js
export const prerender = false;

import { db, Questions } from "astro:db";

export async function GET({ locals }) {
    try {
        // Check which env variables exist
        const envCheck = {
            ASTRO_DB_REMOTE_URL: !!process.env.ASTRO_DB_REMOTE_URL,
            ASTRO_DB_APP_TOKEN: !!process.env.ASTRO_DB_APP_TOKEN,
            ASTRO_STUDIO_REMOTE_DB_URL:
                !!process.env.ASTRO_STUDIO_REMOTE_DB_URL,
            ASTRO_STUDIO_APP_TOKEN: !!process.env.ASTRO_STUDIO_APP_TOKEN,
        };

        console.log("Environment variables check:", envCheck);

        // Try to connect
        const questions = await db.select().from(Questions).all();

        return new Response(JSON.stringify(questions), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Database error:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to load questions",
                message: error.message,
                type: error.name,
                env: {
                    hasRemoteUrl: !!process.env.ASTRO_DB_REMOTE_URL,
                    hasToken: !!process.env.ASTRO_DB_APP_TOKEN,
                    hasStudioUrl: !!process.env.ASTRO_STUDIO_REMOTE_DB_URL,
                    hasStudioToken: !!process.env.ASTRO_STUDIO_APP_TOKEN,
                },
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
