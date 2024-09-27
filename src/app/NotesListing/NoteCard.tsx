"use client";

import { useContext, type ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";
import type { Note } from "../../shared/types.js";
import { NotesContext } from "./NotesContext.js";
import { Link } from "../shared/Link.js";

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
  const href = selectedNote !== noteId ? `/my-notes?id=${noteId}` : "/my-notes";

  const onClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition?.(() => {
      navigate?.(href);
    });
    setSelectedNote?.(noteId === selectedNote ? null : noteId);
  };

  return (
    <Link onClick={onClickCard} href={href}>
      <div
        key={noteId}
        className={`${String(noteId) === String(selectedNote) ? "my_notes__active_note" : ""} my_notes__note_card`}
      >
        {children}
      </div>
    </Link>
  );
};
