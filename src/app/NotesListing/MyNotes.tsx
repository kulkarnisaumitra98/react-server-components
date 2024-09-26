import type { Note } from "../../shared/types.js";
import { RSC_URL } from "../../shared/constants.js";
import { NoteCard } from "./NoteCard.js";

export const MyNotes = async () => {
  const response = await fetch(`${RSC_URL}/api/notes`);
  const notes: Array<Note> = await response.json();

  const getNotes = () => {
    return notes.map(({ title, created_at }, idx) => {
      const note = notes[idx];

      return (
        <NoteCard note={note}>
          <p className="my_notes__note_title">{title}</p>
          <p className="my_notes__note_content">
            {new Date(created_at || "").toLocaleString()}
          </p>
        </NoteCard>
      );
    });
  };
  if (notes.length) {
    return getNotes();
  }

  return <p> No notes found </p>;
};
