// pages/api/questions.js
import { db, Questions } from "astro:db";

export async function GET() {
    try {
        console.log(
            "TURSO_DATABASE_URL exists:",
            !!import.meta.env.TURSO_DATABASE_URL
        );
        console.log(
            "TURSO_AUTH_TOKEN exists:",
            !!import.meta.env.TURSO_AUTH_TOKEN
        );

        // Check if environment variables are set
        if (
            !import.meta.env.TURSO_DATABASE_URL ||
            !import.meta.env.TURSO_AUTH_TOKEN
        ) {
            console.error("Missing environment variables");
            return new Response(
                JSON.stringify({
                    error: "Database configuration missing",
                    hasUrl: !!import.meta.env.TURSO_DATABASE_URL,
                    hasToken: !!import.meta.env.TURSO_AUTH_TOKEN,
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const questions = await db.select().from(Questions);
        console.log("Fetched questions:", questions.length);

        return new Response(JSON.stringify(questions), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Database error details:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to load questions",
                message: error.message,
                stack: error.stack,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
