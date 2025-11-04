// pages/api/questions.js
export const prerender = false;

import { db, Questions } from "astro:db";

export async function GET() {
    try {
        // Log environment check
        console.log("Environment check:", {
            hasRemoteUrl: !!process.env.ASTRO_DB_REMOTE_URL,
            hasAppToken: !!process.env.ASTRO_DB_APP_TOKEN,
            nodeEnv: process.env.NODE_ENV,
        });

        const questions = await db.select().from(Questions).all();

        console.log("Successfully fetched questions:", questions.length);

        return new Response(JSON.stringify(questions), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        // Return detailed error info
        console.error("Detailed error:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
        });

        return new Response(
            JSON.stringify({
                error: "Failed to load questions",
                message: error.message,
                type: error.name,
                // Only in development, remove in production
                stack:
                    process.env.NODE_ENV === "development"
                        ? error.stack
                        : undefined,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
