import "./db/database.ts";

import { layout } from "./views/layout.ts";
import { homeView } from "./views/homeView.ts";
import { programmesView } from "./views/programmesView.ts";
import { programmeDetailsView } from "./views/programmeDetailsView.ts";
import { registerInterestView } from "./views/registerInterestView.ts";
import { adminView } from "./views/adminView.ts";
import { loginView } from "./views/loginView.ts";

//delete interest
import {
  addInterest,
  getAllInterests,
  deleteInterest,
} from "./models/interestModel.ts";

import { findUser } from "./models/userModel.ts";

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

  // PROGRAMMES
  if (pathname === "/programmes") {
    return htmlResponse(layout("Programmes", programmesView()));
  }

  // PROGRAMME DETAILS
  if (pathname === "/programmes/computer-science") {
    return htmlResponse(
      layout("BSc Computer Science", programmeDetailsView())
    );
  }

  // REGISTER INTEREST PAGE
  if (pathname === "/register-interest" && request.method === "GET") {
    return htmlResponse(
      layout("Register Interest", registerInterestView())
    );
  }

  // REGISTER INTEREST FORM
  if (pathname === "/register-interest" && request.method === "POST") {
    const formData = await request.formData();

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const programme = String(formData.get("programme"));

    addInterest(name, email, programme);

    console.log("New interest saved:", {
      name,
      email,
      programme,
    });

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
        layout(
          "Login Failed",
          loginView("Invalid username or password")
        )
      );
    }

    return redirectWithCookie(
      "/admin",
      `admin=${username}; Path=/; HttpOnly; SameSite=Lax`
    );
  }

  if (pathname.startsWith("/admin/delete-interest/")) {
  const cookie = request.headers.get("cookie");

  if (!cookie?.includes("admin=")) {
    return redirect("/login");
  }

  const id = pathname.split("/").pop();

  if (id) {
    deleteInterest(id);
  }

  return redirect("/admin");
}

  // ADMIN PAGE
  if (pathname === "/admin") {
    const cookie = request.headers.get("cookie");

    if (!cookie?.includes("admin=")) {
      return redirect("/login");
    }

    const interests = getAllInterests();

    return htmlResponse(
      layout("Admin Dashboard", adminView(interests))
    );
  }

  // LOGOUT
  if (pathname === "/logout") {
    return redirectWithCookie(
      "/",
      "admin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
    );
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