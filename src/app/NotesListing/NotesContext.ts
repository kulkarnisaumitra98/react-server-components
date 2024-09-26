"use client";
import { createContext, type TransitionStartFunction } from "react";

interface NotesContextType {
  isPreviewLoading: boolean;
  startTransition: TransitionStartFunction;
  selectedNote: string | null | undefined;
  setSelectedNote: (val: string | null | undefined) => void;
}

export const NotesContext = createContext<Partial<NotesContextType>>({});
