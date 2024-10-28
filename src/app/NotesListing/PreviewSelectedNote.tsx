import { wait } from "../../framework/servers/utils.js";
import { RSC_URL } from "../../framework/shared/constants.js";
import { PreviewNote } from "../shared/PreviewNote.js";
import type { Note } from "../shared/types.js";

interface Props {
  id?: string;
}

export const PreviewSelectedNote = async ({ id }: Props) => {
  if (id) {
    await wait(1000);
    const response = await fetch(`${RSC_URL}/api/notes/${id}`);
    const note: Note = await response.json();
    const { title, content } = note;
    return <PreviewNote title={title} content={content} />;
  }
  return <h3>No Note selected</h3>;
};
