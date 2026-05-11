export function adminProgrammeView(programmes: any[]): string {
  const rows = programmes.map((programme) => `
    <tr>
      <td>${programme.id}</td>
      <td>${programme.title}</td>
      <td>${programme.level}</td>
      <td>${programme.description}</td>
      <td>
        <a class="delete-button" href="/admin/delete-programme/${programme.id}">
          Delete
        </a>
      </td>
    </tr>
  `).join("");

  return `
    <section class="admin-panel">
      <h2>Manage Programmes</h2>
      <p>Add and delete university programmes.</p>

      <form method="POST" action="/admin/programmes" class="form-card">
        <label for="title">Programme Title</label>
        <input id="title" name="title" type="text" required>

        <label for="level">Level</label>
        <select id="level" name="level" required>
          <option value="">Select level</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>

        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <button class="button" type="submit">Add Programme</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Programme</th>
            <th>Level</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          ${rows || `
            <tr>
              <td colspan="5">No programmes added yet.</td>
            </tr>
          `}
        </tbody>
      </table>
    </section>
  `;
}