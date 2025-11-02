import { c as createComponent, d as createAstro, r as renderTemplate, i as renderComponent, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_DRJgl3mZ.mjs';
import 'kleur/colors';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_C_ZPKV1-.mjs';
import { d as db, Q as Questions } from '../chunks/_astro_db_CFtjtQTB.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    try {
      if (action === "create") {
        const question = formData.get("question");
        const answer = formData.get("answer");
        if (typeof question === "string" && answer) {
          await db.insert(Questions).values({
            question,
            answer: Number(answer)
          });
          return Astro2.redirect("/admin?success=created");
        }
      } else if (action === "update") {
        const id = formData.get("id");
        const question = formData.get("question");
        const answer = formData.get("answer");
        if (id && typeof question === "string" && answer) {
          await db.update(Questions).set({ question, answer: Number(answer) }).where(eq(Questions.id, Number(id)));
          return Astro2.redirect("/admin?success=updated");
        }
      } else if (action === "delete") {
        const id = formData.get("id");
        if (id) {
          await db.delete(Questions).where(eq(Questions.id, Number(id)));
          return Astro2.redirect("/admin?success=deleted");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      return Astro2.redirect("/admin?error=true");
    }
  }
  const url = new URL(Astro2.request.url);
  const successParam = url.searchParams.get("success");
  const errorParam = url.searchParams.get("error");
  let successMessage = "";
  let errorMessage = "";
  if (successParam === "created")
    successMessage = "Question created successfully!";
  if (successParam === "updated")
    successMessage = "Question updated successfully!";
  if (successParam === "deleted")
    successMessage = "Question deleted successfully!";
  if (errorParam) errorMessage = "An error occurred. Please try again.";
  const questions = await db.select().from(Questions);
  return renderTemplate(_a || (_a = __template(["", ' <script type="module">\n    document.getElementById("addQuestion").onclick = function () {\n        document.getElementById("popupTitle").textContent = "Add New Question";\n        document.getElementById("questionForm").reset();\n        document.getElementById("formAction").value = "create";\n        document.getElementById("editId").value = "";\n        document\n            .getElementById("popupContainer")\n            .classList.remove("popup-hidden");\n    };\n\n    // Close popup\n    document.getElementById("close").onclick = function () {\n        document.getElementById("popupContainer").classList.add("popup-hidden");\n    };\n\n    // Close popup when clicking outside\n    document.getElementById("popupContainer").onclick = function (e) {\n        if (e.target.id === "popupContainer") {\n            document\n                .getElementById("popupContainer")\n                .classList.add("popup-hidden");\n        }\n    };\n\n    // Edit question\n    window.editQuestion = function (button) {\n        const id = button.dataset.id;\n        const question = button.dataset.question;\n        const answer = button.dataset.answer;\n\n        document.getElementById("popupTitle").textContent = "Edit Question";\n        document.getElementById("formAction").value = "update";\n        document.getElementById("editId").value = id;\n        document.getElementById("question").value = question;\n        document.getElementById("answer").value = answer;\n        document\n            .getElementById("popupContainer")\n            .classList.remove("popup-hidden");\n    };\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div id="popupContainer" class="popup-hidden fixed top-0 left-0 w-full h-full bg-gray-600/60 flex justify-center items-center z-50"> <div class="popup-content bg-white p-8 rounded-lg shadow-md relative max-w-md w-full mx-4"> <span class="close-button absolute top-2 right-3 text-2xl cursor-pointer hover:text-red-600" id="close">&times;</span> <h2 class="text-xl font-bold mb-4" id="popupTitle">
Add New Question
</h2> <form id="questionForm" method="POST"> <input type="hidden" name="action" id="formAction" value="create"> <input type="hidden" name="id" id="editId" value=""> <label for="question">Question: </label> <input type="text" id="question" name="question" required> <label for="answer">Answer: </label> <input type="number" id="answer" name="answer" required> <button type="submit">Submit</button> </form> </div> </div> <div class="p-6"> ${successMessage && renderTemplate`<div class="alert alert-success">${successMessage}</div>`} ${errorMessage && renderTemplate`<div class="alert alert-error">${errorMessage}</div>`} <button id="addQuestion" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
Add New Question
</button> <div class="mt-6" id="admin-page"> ${questions.map(({ id, question, answer }) => renderTemplate`<div class="border-2 border-gray-700 mb-5 p-5 rounded-lg"> <p class="text-2xl font-black">${id}.</p> <p class="mb-2"> <span class="text-gray-500 font-semibold">
Question:
</span> ${question} </p> <p class="mb-4"> <span class="text-gray-500 font-semibold">
Answer:
</span> ${answer} </p> <div> <button class="action-btn edit-btn"${addAttribute(id, "data-id")}${addAttribute(question, "data-question")}${addAttribute(answer, "data-answer")} onclick="editQuestion(this)">
Edit
</button> <form method="POST" style="display: inline;"> <input type="hidden" name="action" value="delete"> <input type="hidden" name="id"${addAttribute(id, "value")}> <button type="submit" class="action-btn delete-btn" onclick="return confirm('Are you sure you want to delete this question?')">
Delete
</button> </form> </div> </div>`)} </div> </div> </main> ` }));
}, "D:/dev/tarik_tambang/src/pages/admin.astro", void 0);

const $$file = "D:/dev/tarik_tambang/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Admin,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
