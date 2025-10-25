import type { APIRoute } from "astro";
import { db, Questions } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const question = formData.get("question");
        const answer = formData.get("answer");

        if (typeof question === "string" && answer) {
            await db.insert(Questions).values({
                question,
                answer: Number(answer),
            });

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ error: "Invalid data" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating question:", error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
