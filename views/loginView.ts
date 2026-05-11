export function loginView(errorMessage = ""): string {
  return `
    <section class="form-card">
      <h2>Admin Login</h2>

      ${errorMessage ? `
        <p class="error">${errorMessage}</p>
      ` : ""}

      <form method="POST" action="/login">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" required>

        <label for="password">Password</label>
        <input id="password" name="password" type="password" required>

        <button class="button" type="submit">
          Login
        </button>
      </form>
    </section>
  `;
}