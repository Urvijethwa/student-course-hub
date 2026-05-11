export function registerInterestView(): string {
  return `
    <section class="form-card">
      <h2>Register Your Interest</h2>
      <p>Fill in your details to receive updates about this programme.</p>

      <form method="POST" action="/register-interest">
        <label for="name">Full Name</label>
        <input id="name" name="name" type="text" required>

        <label for="email">Email Address</label>
        <input id="email" name="email" type="email" required>

        <label for="programme">Programme</label>
        <select id="programme" name="programme" required>
          <option value="">Select a programme</option>
          <option value="BSc Computer Science">BSc Computer Science</option>
          <option value="BSc Cyber Security">BSc Cyber Security</option>
          <option value="MSc Data Science">MSc Data Science</option>
        </select>

        <button class="button" type="submit">Submit Interest</button>
      </form>
    </section>
  `;
}