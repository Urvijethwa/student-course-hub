import { Router } from "../deps.ts";
import { layout } from "../views/layout.ts";
import { homeView } from "../views/homeView.ts";
import { programmesView } from "../views/programmesView.ts";
import { programmeDetailsView } from "../views/programmeDetailsView.ts";
import { registerInterestView } from "../views/registerInterestView.ts";
import { addInterest } from "../models/interestModel.ts";
import { adminView } from "../views/adminView.ts";
import { getAllInterests } from "../models/interestModel.ts";
import { loginView } from "../views/loginView.ts";
import { findUser } from "../models/userModel.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.body = layout("Student Course Hub", homeView());
});

router.get("/programmes", (ctx) => {
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.body = layout("Programmes", programmesView());
});

router.get("/programmes/computer-science", (ctx) => {
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.body = layout("BSc Computer Science", programmeDetailsView());
});

router.get("/register-interest", (ctx) => {
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.body = layout("Register Interest", registerInterestView());
});

router.post("/register-interest", async (ctx) => {
  const formData = await ctx.request.body.form();

  const name = formData.get("name");
  const email = formData.get("email");
  const programme = formData.get("programme");

  addInterest(String(name), String(email), String(programme));

  console.log("New interest saved:", { name, email, programme });

  ctx.response.redirect("/register-interest-success");
});

router.get("/register-interest-success", (ctx) => {
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.body = layout(
    "Interest Registered",
    `
      <section class="form-card">
        <h2>Interest Registered Successfully</h2>
        <p>Thank you. Your interest has been recorded.</p>
        <a class="button" href="/programmes">Back to Programmes</a>
      </section>
    `
  );
});

router.get("/admin", (ctx) => {
  const admin = ctx.cookies.get("admin");

  if (!admin) {
    ctx.response.redirect("/login");
    return;
  }

  const interests = getAllInterests();

  ctx.response.headers.set("content-type", "text/html; charset=utf-8");

  ctx.response.body = layout(
    "Admin Dashboard",
    adminView(interests)
  );
});

router.get("/logout", (ctx) => {
  ctx.cookies.delete("admin");

  ctx.response.redirect("/");
});

router.post("/login", async (ctx) => {
  const formData = await ctx.request.body.form();

  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  const user = findUser(username);

  if (!user || user.password !== password) {
    ctx.response.body = layout(
      "Login Failed",
      loginView("Invalid username or password")
    );

    return;
  }

  ctx.cookies.set("admin", username);

  ctx.response.redirect("/admin");
});

export default router;