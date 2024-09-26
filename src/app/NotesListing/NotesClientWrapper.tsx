"use client";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { NotesContext } from "./NotesContext.js";

interface Props {
  children: ReactNode;
  activeNoteId?: string;
}

export const NotesClientWrapper = ({ children, activeNoteId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [selectedNote, setSelectedNote] = useState<string | null | undefined>(
    activeNoteId,
  );

  useEffect(() => {
    if (!activeNoteId) {
      setSelectedNote(null);
    }
  }, [activeNoteId]);

  return (
    <NotesContext.Provider
      value={{
        isPreviewLoading: isPending,
        startTransition,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
