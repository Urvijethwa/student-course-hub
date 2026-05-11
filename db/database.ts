import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const db = new DB("student_course_hub.db");

db.execute(`
  CREATE TABLE IF NOT EXISTS interests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    programme TEXT NOT NULL
  )
`);

db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

const existingUser = [...db.query(
  "SELECT * FROM users WHERE username = ?",
  ["admin"]
)];

if (existingUser.length === 0) {
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    ["admin", "admin123"]
  );
}

db.execute(`
  CREATE TABLE IF NOT EXISTS programmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);