export function editProgrammeView(programme: any): string {
  return `
    <section class="form-card">
      <h2>Edit Programme</h2>

      <form method="POST" action="/admin/edit-programme/${programme.id}">
        <label for="title">Programme Title</label>
        <input id="title" name="title" type="text" value="${programme.title}" required>

        <label for="level">Level</label>
        <select id="level" name="level" required>
          <option value="Undergraduate" ${programme.level === "Undergraduate" ? "selected" : ""}>Undergraduate</option>
          <option value="Postgraduate" ${programme.level === "Postgraduate" ? "selected" : ""}>Postgraduate</option>
        </select>

        <label for="description">Description</label>
        <textarea id="description" name="description" required>${programme.description}</textarea>

        <button class="button" type="submit">Update Programme</button>
      </form>
    </section>
  `;
}