import { asDrizzleTable } from '@astrojs/db/runtime';
import { createClient } from '@astrojs/db/db-client/libsql-node.js';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createClient({
  url: "libsql://tariktambang-amelindaa2705.aws-ap-northeast-1.turso.io",
  token: process.env.ASTRO_DB_APP_TOKEN ?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjE0MDA0MzcsImlkIjoiOWY0YTc1YjMtNzU5Yi00ZGIxLWI4NWYtNDZhYmRlMjM1NzUwIiwicmlkIjoiNGFlMWFhMTktNjRlYi00YjllLWFhOGUtOWY5NzY2ZmU0YzM1In0.jJpoTzC88XpZ67Oxd29wJPXmS77eZV7PuxTCf_y8Bqz7cAjZNYg5l0FaHz0GrGymtiGHS1O_V0ibA-CGSnjQAw"
});
const Questions = asDrizzleTable("Questions", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Questions", "primaryKey": true } }, "question": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "question", "collection": "Questions", "primaryKey": false, "optional": false } }, "answer": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "answer", "collection": "Questions", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

export { Questions as Q, db as d };
