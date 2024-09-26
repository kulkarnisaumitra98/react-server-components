"use client";

import { useContext, type ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";
import type { Note } from "../../shared/types.js";
import { NotesContext } from "./NotesContext.js";

interface Props {
  children: ReactNode;
  note: Note;
}

export const NoteCard = ({ children, note }: Props) => {
  const { id } = note;
  const { navigate } = useRouter(); // Get the current URL
  const { startTransition, setSelectedNote, selectedNote } =
    useContext(NotesContext);

  const noteId = String(id);
  const onClickCard = () => {
    startTransition?.(() => {
      if (selectedNote !== noteId) {
        navigate?.(`/my-notes?id=${noteId}`);
      } else {
        navigate?.("/my-notes");
      }
    });
    setSelectedNote?.(noteId === selectedNote ? null : noteId);
  };

  return (
    <div
      key={noteId}
      onClick={onClickCard}
      className={`${String(noteId) === String(selectedNote) ? "my_notes__active_note" : ""} my_notes__note_card`}
    >
      {children}
    </div>
  );
};
