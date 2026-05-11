export function layout(title: string, content: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>

    <body>
      <header>
        <h1>Student Course Hub</h1>

        <nav>
          <a href="/">Home</a>
          <a href="/programmes">Programmes</a>
          <a href="/register-interest">Register Interest</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <main>
        ${content}
      </main>

      <footer>
        <p>&copy; 2026 Student Course Hub</p>
      </footer>
    </body>
  </html>
  `;
}