import { db } from "./db.js";
import type { Note, NoteCallback } from "../../../shared/types.js";

export function createOrEditNote(
  id: number | null,
  title: string,
  content: string,
  callback: NoteCallback,
): void {
  if (id) {
    // Edit existing note
    const updateSQL = `
      UPDATE notes 
      SET title = ?, content = ?
      WHERE id = ?
    `;
    db.run(updateSQL, [title, content, id], function (err) {
      if (err) {
        db.close();
        return callback(err);
      }
      callback(null, { id, title, content });
    });
  } else {
    // Create new note
    const insertSQL = `
      INSERT INTO notes (title, content)
      VALUES (?, ?)
    `;
    db.run(insertSQL, [title, content], function (err) {
      if (err) {
        db.close();
        return callback(err);
      }
      const newId = this.lastID;
      callback(null, { id: newId, title, content });
    });
  }
}

// Function to get all notes
export function getAllNotes(
  callback: (error: Error | null, notes?: Note[]) => void,
): void {
  const query = `SELECT * FROM notes ORDER BY created_at DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows as Note[]);
  });
}
