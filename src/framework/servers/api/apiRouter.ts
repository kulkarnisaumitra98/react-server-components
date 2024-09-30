import express from "express";
import type { Request, Response } from "express";
import {
  createOrEditNote,
  getAllNotes,
  getNoteById,
  getRandomNote,
} from "./utils.js";

const router = express.Router();

router.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  getNoteById(id, (err, note) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the note" });
    }

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  });
});

router.get("/random-note", (_, res: Response) => {
  getRandomNote((err, note) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching random note" });
    }
    res.json(note || {});
  });
});

// Route to get all notes
router.get("/notes", (_, res: Response) => {
  getAllNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching notes" });
    }
    res.json(notes);
  });
});

// Route to create a new note
router.post("/notes", (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  createOrEditNote(null, title, content, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creating note" });
    }
    res.status(201).json(result);
  });
});

// Route to update an existing note
router.put("/notes/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  if (isNaN(id) || !title || !content) {
    return res
      .status(400)
      .json({ error: "Valid ID, title, and content are required" });
  }

  createOrEditNote(id, title, content, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating note" });
    }
    if (!result) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(result);
  });
});

export default router;
