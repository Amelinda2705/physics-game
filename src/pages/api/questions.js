// pages/api/questions.js
export const prerender = false;

import { db, Questions } from "astro:db";

export async function GET() {
    try {
        const questions = await db.select().from(Questions);
        console.log("Fetched questions:", questions);
        return new Response(JSON.stringify(questions), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return new Response(
            JSON.stringify({ error: "Failed to load questions" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
