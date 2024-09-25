import { RSC_URL } from "../../shared/constants.js";
import type { Note } from "../../shared/types.js";
import { PreviewNote } from "../shared/PreviewNote.js";

interface Props {
  id?: string;
}

export const PreviewSelectedNote = async ({ id }: Props) => {
  if (id) {
    const response = await fetch(`${RSC_URL}/api/notes/${id}`);
    const note: Note = await response.json();
    const { title, content } = note;
    return <PreviewNote title={title} content={content} />;
  }
  return <h3>No Note selected</h3>;
};
