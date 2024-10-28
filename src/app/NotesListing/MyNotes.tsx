import { NoteCard } from "./NoteCard.js";
import { wait } from "../../framework/servers/utils.js";
import type { Note } from "../../framework/shared/types.js";
import { RSC_URL } from "../../framework/shared/constants.js";

export const MyNotes = async () => {
  await wait(200);
  const response = await fetch(`${RSC_URL}/api/notes`);
  const notes: Array<Note> = await response.json();

  const getNotes = () => {
    return notes.map(({ title, created_at }, idx) => {
      const note = notes[idx];

      return (
        <NoteCard
          note={note}
          createDate={
            <p className="my_notes__note_content">
              {new Date(created_at || "").toLocaleString()}
            </p>
          }
        >
          <p className="my_notes__note_title">{title}</p>
        </NoteCard>
      );
    });
  };
  if (notes.length) {
    return <div className="server">{getNotes()}</div>;
  }

  return (
    <div className="server">
      <p> No notes found </p>
    </div>
  );
};
