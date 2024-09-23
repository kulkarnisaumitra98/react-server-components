"use client";

import type { ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";
import type { Note } from "../../shared/types.js";

interface Props {
  children: ReactNode;
  note: Note;
  isActive: boolean;
}

export const NoteCard = ({ children, note, isActive }: Props) => {
  const { navigate } = useRouter();
  const { id } = note;

  const onClickCard = () => {
    navigate(`/my-notes?id=${id}`);
  };

  return (
    <div
      key={id}
      onClick={onClickCard}
      className={`${isActive ? "my_notes__active_note" : ""} my_notes__note_card`}
    >
      {children}
    </div>
  );
};
