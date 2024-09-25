"use client";

import { type ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";
import type { Note } from "../../shared/types.js";

interface Props {
  children: ReactNode;
  note: Note;
  activeNoteId?: string;
}

export const NoteCard = ({ children, activeNoteId, note }: Props) => {
  const { id: noteId } = note;
  const { navigate, global } = useRouter(); // Get the current URL

  const onClickCard = () => {
    navigate?.(`/my-notes?id=${noteId}`, { id: noteId });
  };

  return (
    <div
      key={noteId}
      onClick={onClickCard}
      className={`${String(noteId) === String(global?.id || activeNoteId) ? "my_notes__active_note" : ""} my_notes__note_card`}
    >
      {children}
    </div>
  );
};
