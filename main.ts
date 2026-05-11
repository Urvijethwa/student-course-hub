import "./db/database.ts";

import { layout } from "./views/layout.ts";
import { homeView } from "./views/homeView.ts";
import { programmesView } from "./views/programmesView.ts";
import { registerInterestView } from "./views/registerInterestView.ts";
import { adminView } from "./views/adminView.ts";
import { loginView } from "./views/loginView.ts";
import { adminProgrammeView } from "./views/adminProgrammeView.ts";
import { editProgrammeView } from "./views/editProgrammeView.ts";

import {
  addInterest,
  getAllInterests,
  deleteInterest,
} from "./models/interestModel.ts";

import { findUser } from "./models/userModel.ts";

import {
  getAllProgrammes,
  addProgramme,
  deleteProgramme,
  getProgrammeById,
  updateProgramme,
} from "./models/programmeModel.ts";

Deno.serve(async (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // CSS
  if (pathname === "/css/style.css") {
    const css = await Deno.readTextFile("./public/css/style.css");

    return new Response(css, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  // HOME
  if (pathname === "/") {
    return htmlResponse(layout("Student Course Hub", homeView()));
  }

  // PUBLIC PROGRAMMES PAGE
  if (pathname === "/programmes") {
    const programmes = getAllProgrammes();

    return htmlResponse(
      layout("Programmes", programmesView(programmes))
    );
  }

  // DYNAMIC PROGRAMME DETAILS PAGE
  if (pathname.startsWith("/programmes/")) {
    const id = pathname.split("/").pop();

    if (!id) {
      return redirect("/programmes");
    }

    const programme = getProgrammeById(id);

    if (!programme) {
      return htmlResponse(
        layout(
          "Programme Not Found",
          `
          <section class="form-card">
            <h2>Programme Not Found</h2>
            <p>This programme does not exist.</p>
            <a class="button" href="/programmes">Back to Programmes</a>
          </section>
          `
        ),
        404
      );
    }

    return htmlResponse(
      layout(
        String(programme.title),
        `
        <section class="details">
          <h2>${programme.title}</h2>
          <p class="tag">${programme.level}</p>
          <p>${programme.description}</p>

          <h3>Modules by Year</h3>

          <div class="module-list">
            <article class="card">
              <h4>Year 1</h4>
              <ul>
                <li>Programming Fundamentals</li>
                <li>Computer Systems</li>
                <li>Academic Skills</li>
              </ul>
            </article>

            <article class="card">
              <h4>Year 2</h4>
              <ul>
                <li>Web Application Development</li>
                <li>Databases</li>
                <li>Software Engineering</li>
              </ul>
            </article>

            <article class="card">
              <h4>Year 3</h4>
              <ul>
                <li>Advanced Web Development</li>
                <li>Final Year Project</li>
                <li>Professional Practice</li>
              </ul>
            </article>
          </div>

          <a class="button" href="/register-interest">Register Interest</a>
        </section>
        `
      )
    );
  }

  // REGISTER INTEREST PAGE
  if (pathname === "/register-interest" && request.method === "GET") {
    return htmlResponse(layout("Register Interest", registerInterestView()));
  }

  // REGISTER INTEREST FORM
  if (pathname === "/register-interest" && request.method === "POST") {
    const formData = await request.formData();

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const programme = String(formData.get("programme"));

    addInterest(name, email, programme);

    return redirect("/register-interest-success");
  }

  // SUCCESS PAGE
  if (pathname === "/register-interest-success") {
    return htmlResponse(
      layout(
        "Interest Registered",
        `
        <section class="form-card">
          <h2>Interest Registered Successfully</h2>
          <p>Thank you. Your interest has been recorded.</p>
          <a class="button" href="/programmes">Back to Programmes</a>
        </section>
        `
      )
    );
  }

  // LOGIN PAGE
  if (pathname === "/login" && request.method === "GET") {
    return htmlResponse(layout("Admin Login", loginView()));
  }

  // LOGIN FORM
  if (pathname === "/login" && request.method === "POST") {
    const formData = await request.formData();

    const username = String(formData.get("username"));
    const password = String(formData.get("password"));

    const user = findUser(username);

    if (!user || user.password !== password) {
      return htmlResponse(
        layout("Login Failed", loginView("Invalid username or password"))
      );
    }

    return redirectWithCookie(
      "/admin",
      `admin=${username}; Path=/; HttpOnly; SameSite=Lax`
    );
  }

  // DELETE INTEREST
  if (pathname.startsWith("/admin/delete-interest/")) {
    if (!isAdmin(request)) {
      return redirect("/login");
    }

    const id = pathname.split("/").pop();

    if (id) {
      deleteInterest(id);
    }

    return redirect("/admin");
  }

  // ADMIN DASHBOARD
  if (pathname === "/admin") {
    if (!isAdmin(request)) {
      return redirect("/login");
    }

    const interests = getAllInterests();

    return htmlResponse(layout("Admin Dashboard", adminView(interests)));
  }

  // ADMIN MANAGE PROGRAMMES PAGE
  if (pathname === "/admin/programmes" && request.method === "GET") {
    if (!isAdmin(request)) {
      return redirect("/login");
    }

    const programmes = getAllProgrammes();

    return htmlResponse(
      layout("Manage Programmes", adminProgrammeView(programmes))
    );
  }

  // ADD PROGRAMME
  if (pathname === "/admin/programmes" && request.method === "POST") {
    if (!isAdmin(request)) {
      return redirect("/login");
    }

    const formData = await request.formData();

    const title = String(formData.get("title"));
    const level = String(formData.get("level"));
    const description = String(formData.get("description"));

    addProgramme(title, level, description);

    return redirect("/admin/programmes");
  }

  // DELETE PROGRAMME
  if (pathname.startsWith("/admin/delete-programme/")) {
    if (!isAdmin(request)) {
      return redirect("/login");
    }

    const id = pathname.split("/").pop();

    if (id) {
      deleteProgramme(id);
    }

    return redirect("/admin/programmes");
  }

  // LOGOUT
  if (pathname === "/logout") {
    return redirectWithCookie(
      "/",
      "admin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
    );
  }

  // EDIT PROGRAMME PAGE
if (pathname.startsWith("/admin/edit-programme/") && request.method === "GET") {
  if (!isAdmin(request)) {
    return redirect("/login");
  }

  const id = pathname.split("/").pop();

  if (!id) {
    return redirect("/admin/programmes");
  }

  const programme = getProgrammeById(id);

  if (!programme) {
    return redirect("/admin/programmes");
  }

  return htmlResponse(
    layout("Edit Programme", editProgrammeView(programme))
  );
}

// UPDATE PROGRAMME
if (pathname.startsWith("/admin/edit-programme/") && request.method === "POST") {
  if (!isAdmin(request)) {
    return redirect("/login");
  }

  const id = pathname.split("/").pop();

  if (!id) {
    return redirect("/admin/programmes");
  }

  const formData = await request.formData();

  const title = String(formData.get("title"));
  const level = String(formData.get("level"));
  const description = String(formData.get("description"));

  updateProgramme(id, title, level, description);

  return redirect("/admin/programmes");
}

  // 404 PAGE
  return htmlResponse(
    layout(
      "Page Not Found",
      `
      <section class="form-card">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <a class="button" href="/">Back to Home</a>
      </section>
      `
    ),
    404
  );
});

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function redirect(location: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
    },
  });
}

function redirectWithCookie(location: string, cookie: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
      "Set-Cookie": cookie,
    },
  });
}

function isAdmin(request: Request): boolean {
  const cookie = request.headers.get("cookie");
  return cookie?.includes("admin=") || false;
}