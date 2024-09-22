import { db } from "./db.js";

// SQL to create the notes table
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// Execute the create table SQL
db.run(createTableSQL, (err) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Notes table created or already exists.");
  }

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err);
    } else {
      console.log("Database connection closed.");
    }
  });
});
