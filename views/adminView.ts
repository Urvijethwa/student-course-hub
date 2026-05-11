type Interest = {
  id: number | string;
  name: string;
  email: string;
  programme: string;
};

export function adminView(interests: any[]): string {
  const rows = interests.map((interest) => `
    <tr>
      <td>${interest.id}</td>
      <td>${interest.name}</td>
      <td>${interest.email}</td>
      <td>${interest.programme}</td>
      <td>
        <a class="delete-button" href="/admin/delete-interest/${interest.id}">
          Delete
        </a>
      </td>
    </tr>
  `).join("");

  return `
    <section class="admin-panel">
      <h2>Admin Dashboard</h2>
      <p>View students who have registered interest in programmes.</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Programme</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          ${rows || `
            <tr>
              <td colspan="5">No interested students yet.</td>
            </tr>
          `}
        </tbody>
      </table>
    </section>
  `;
}