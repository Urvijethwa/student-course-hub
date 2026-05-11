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

export function getProgrammeById(id: string) {
  const programmes = db.queryEntries(
    "SELECT * FROM programmes WHERE id = ?",
    [id],
  );

  return programmes[0];
}

export function updateProgramme(
  id: string,
  title: string,
  level: string,
  description: string,
) {
  db.query(
    "UPDATE programmes SET title = ?, level = ?, description = ? WHERE id = ?",
    [title, level, description, id],
  );
}