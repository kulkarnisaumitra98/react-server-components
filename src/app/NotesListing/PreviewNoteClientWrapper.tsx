"use client";
import { useContext, type ReactNode } from "react";
import { NotesContext } from "./NotesContext.js";

interface Props {
  children: ReactNode;
  activeNoteId?: string;
}

export const PreviewNoteClientWrapper = ({ children, activeNoteId }: Props) => {
  const { isPreviewLoading } = useContext(NotesContext);

  if (!activeNoteId && isPreviewLoading) {
    return <h3>Loading...</h3>;
  }

  return <div style={{ opacity: isPreviewLoading ? 0.5 : 1 }}>{children}</div>;
};
