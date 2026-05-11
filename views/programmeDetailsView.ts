export function programmeDetailsView(): string {
  return `
    <section class="details">
      <h2>BSc Computer Science</h2>
      <p class="tag">Undergraduate</p>

      <p>
        This programme teaches programming, databases, software engineering,
        web development, security, and final year project skills.
      </p>

      <h3>Modules by Year</h3>

      <div class="module-list">
        <article class="card">
          <h4>Year 1</h4>
          <ul>
            <li>Programming in Python</li>
            <li>Computer Systems</li>
            <li>Mathematics for Computing</li>
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
            <li>Cyber Security</li>
            <li>Development Project</li>
          </ul>
        </article>
      </div>

      <h3>Programme Staff</h3>

      <article class="card">
        <p><strong>Programme Leader:</strong> Dr Sarah Ahmed</p>
        <p><strong>Module Leader:</strong> Mr James Wilson</p>
      </article>

      <a class="button" href="/register-interest">Register Interest</a>
    </section>
  `;
}