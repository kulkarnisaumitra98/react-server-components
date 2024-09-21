import type { Note } from "../../api/types.js";
import { RSC_URL } from "../../constants.js";

interface Props {
  activeNoteId?: string;
}
export const MyNotes = async ({ activeNoteId }: Props) => {
  const response = await fetch(`${RSC_URL}/api/notes`);
  const notes: Array<Note> = await response.json();

  const getNotes = () => {
    return notes.map(({ title, id, created_at }) => {
      const isActive = id === Number(activeNoteId);

      return (
        <div
          key={id}
          className={`${isActive ? "my_notes__active_note" : ""} my_notes__note_card`}
        >
          <p className="my_notes__note_title">{title}</p>
          <p className="my_notes__note_content">
            {new Date(created_at).toLocaleString()}
          </p>
        </div>
      );
    });
  };
  if (notes.length) {
    return getNotes();
  }

  return <p> No notes found </p>;
};
