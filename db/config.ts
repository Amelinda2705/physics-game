import { defineDb, defineTable, column } from "astro:db";

const Questions = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        question: column.text(),
        answer: column.number(),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: { Questions },
});
