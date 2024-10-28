"use client";

import { useContext, useState, type ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";
import type { Note } from "../shared/types.js";
import { NotesContext } from "./NotesContext.js";
import { Link } from "../shared/Link.js";

interface Props {
  children: ReactNode;
  note: Note;
  createDate: ReactNode;
}

export const NoteCard = ({ children, note, createDate }: Props) => {
  const { id } = note;
  const [isExpanded, setIsExpanded] = useState(false);
  const { navigate } = useRouter(); // Get the current URL
  const { startTransition, setSelectedNote, selectedNote } =
    useContext(NotesContext);

  const noteId = String(id);
  const href = `/my-notes?id=${noteId}`;

  const onClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = selectedNote !== noteId ? href : "/my-notes";
    startTransition?.(() => {
      navigate?.(link);
    });
    setSelectedNote?.(noteId === selectedNote ? null : noteId);
  };

  const onExpand = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <Link onClick={onClickCard} href={href}>
      <div
        key={noteId}
        className={`${String(noteId) === String(selectedNote) ? "my_notes__active_note" : ""} my_notes__note_card`}
      >
        {children}
        <img
          width={20}
          src={!isExpanded ? "/expanded.png" : "/collapsed.png"}
          onClick={onExpand}
          className="my_notes__icon"
        />
        {isExpanded ? createDate : null}
      </div>
    </Link>
  );
};
