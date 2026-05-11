import { db } from "../db/database.ts";

export function addInterest(name: string, email: string, programme: string) {
  db.query(
    "INSERT INTO interests (name, email, programme) VALUES (?, ?, ?)",
    [name, email, programme]
  );
}

export function getAllInterests() {
  return db.queryEntries("SELECT * FROM interests ORDER BY id DESC");
}

export function deleteInterest(id: string) {
  db.query("DELETE FROM interests WHERE id = ?", [id]);
}