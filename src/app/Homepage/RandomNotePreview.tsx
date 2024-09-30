import { marked } from "marked";
//@ts-ignore
import sanitizeHtml from "sanitize-html";
import { wait } from "../../framework/servers/utils.js";
import { RSC_URL } from "../../shared/constants.js";
import type { Note } from "../../shared/types.js";

export const RandomNotePreview = async () => {
  await wait(500);
  const response = await fetch(`${RSC_URL}/api/random-note`);
  const note: Note = await response.json();
  if (note?.id) {
    const { title, content } = note;
    return (
      <div>
        <h3>{title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(marked(content)),
          }}
        />
      </div>
    );
  }
  return <b>No Note Found</b>;
};
