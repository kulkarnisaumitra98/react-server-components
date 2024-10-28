import { db } from "./db.mjs";
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
  const query = `SELECT id,title,created_at FROM notes ORDER BY created_at DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows as Note[]);
  });
}

export function getNoteById(
  id: number,
  callback: (error: Error | null, note?: Note) => void,
): void {
  const query = "SELECT * FROM notes WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row as Note);
  });
}

function getAllNoteIds(
  callback: (error: Error | null, ids?: number[]) => void,
): void {
  const query = "SELECT id FROM notes";
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    const ids = rows.map((row) => (row as Note).id);
    callback(null, ids);
  });
}

export function getRandomNote(
  callback: (error: Error | null, note?: Note | null) => void,
): void {
  // First, get all note IDs
  getAllNoteIds((error, ids) => {
    if (error) {
      return callback(error);
    }

    if (!ids || ids.length === 0) {
      return callback(null, null);
    }

    // Select a random ID from the list
    const randomIndex = Math.floor(Math.random() * ids.length);

    const randomId = ids[randomIndex];
    // Use the existing getNoteById function to fetch the random note

    getNoteById(randomId, (error, note) => {
      if (error) {
        return callback(error);
      }
      callback(null, note);
    });
  });
}
