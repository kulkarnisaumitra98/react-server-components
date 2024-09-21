import sqlite3 from "sqlite3";

// Open a database connection (creates the file if it doesn't exist)
export const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
