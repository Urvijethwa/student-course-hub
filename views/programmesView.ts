export function programmesView(programmes: any[]): string {
  const programmeCards = programmes.map((programme) => `
    <article class="card">
      <h3>${programme.title}</h3>
      <p class="tag">${programme.level}</p>
      <p>${programme.description}</p>
      <a class="button" href="/programmes/${programme.id}">View Details</a>
    </article>
  `).join("");

  return `
    <section>
      <h2>Available Programmes</h2>
      <p>Browse undergraduate and postgraduate programmes.</p>

      <div class="grid">
        ${programmeCards || `
          <article class="card">
            <h3>No programmes available</h3>
            <p>Please check again later.</p>
          </article>
        `}
      </div>
    </section>
  `;
}