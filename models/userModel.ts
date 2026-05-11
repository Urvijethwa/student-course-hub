import { db } from "../db/database.ts";

export function findUser(username: string) {
  const users = db.queryEntries(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  return users[0];
}