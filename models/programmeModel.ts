import { db } from "../db/database.ts";

export function getAllProgrammes() {
  return db.queryEntries("SELECT * FROM programmes ORDER BY id DESC");
}

export function addProgramme(
  title: string,
  level: string,
  description: string,
) {
  db.query(
    "INSERT INTO programmes (title, level, description) VALUES (?, ?, ?)",
    [title, level, description],
  );
}

export function deleteProgramme(id: string) {
  db.query("DELETE FROM programmes WHERE id = ?", [id]);
}