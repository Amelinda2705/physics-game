// pages/api/admin.js
export const prerender = false;

import { db, Questions, eq } from "astro:db";

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const action = formData.get("action");

        if (action === "create") {
            const question = formData.get("question");
            const answer = formData.get("answer");

            if (typeof question === "string" && answer) {
                await db.insert(Questions).values({
                    question,
                    answer: Number(answer),
                });
                return Response.redirect(
                    new URL("/admin?success=created", request.url),
                    303
                );
            }
        } else if (action === "update") {
            const id = formData.get("id");
            const question = formData.get("question");
            const answer = formData.get("answer");

            if (id && typeof question === "string" && answer) {
                await db
                    .update(Questions)
                    .set({ question, answer: Number(answer) })
                    .where(eq(Questions.id, Number(id)));
                return Response.redirect(
                    new URL("/admin?success=updated", request.url),
                    303
                );
            }
        } else if (action === "delete") {
            const id = formData.get("id");

            if (id) {
                await db.delete(Questions).where(eq(Questions.id, Number(id)));
                return Response.redirect(
                    new URL("/admin?success=deleted", request.url),
                    303
                );
            }
        }

        return new Response("Invalid request parameters", { status: 400 });
    } catch (error) {
        console.error("Admin API Error:", error);
        return Response.redirect(
            new URL("/admin?error=true", request.url),
            303
        );
    }
}
