import type { Note } from "../../shared/types.js";
import { RSC_URL } from "../../shared/constants.js";
import { NoteCard } from "./NoteCard.js";

interface Props {
  activeNoteId?: string;
}
export const MyNotes = async ({ activeNoteId }: Props) => {
  const response = await fetch(`${RSC_URL}/api/notes`);
  const notes: Array<Note> = await response.json();

  const getNotes = () => {
    return notes.map(({ title, id, created_at }, idx) => {
      const isActive = id === Number(activeNoteId);
      const note = notes[idx];

      return (
        <NoteCard isActive={isActive} note={note}>
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
