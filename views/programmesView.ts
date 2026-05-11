export function programmesView(): string {
  const programmes = [
    {
      title: "BSc Computer Science",
      level: "Undergraduate",
      description: "Learn programming, databases, web development, and software engineering."
    },
    {
      title: "BSc Cyber Security",
      level: "Undergraduate",
      description: "Study network security, ethical hacking, digital forensics, and secure systems."
    },
    {
      title: "MSc Data Science",
      level: "Postgraduate",
      description: "Develop skills in data analysis, machine learning, and data visualisation."
    }
  ];

  const programmeCards = programmes.map(programme => `
    <article class="card">
      <h3>${programme.title}</h3>
      <p class="tag">${programme.level}</p>
      <p>${programme.description}</p>
      <a class="button" href="/programmes/computer-science">View Details</a>
    </article>
  `).join("");

  return `
    <section>
      <h2>Available Programmes</h2>
      <p>Browse undergraduate and postgraduate programmes.</p>

      <div class="grid">
        ${programmeCards}
      </div>
    </section>
  `;
}