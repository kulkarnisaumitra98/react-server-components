import { marked } from "marked";
//@ts-ignore
import sanitizeHtml from "sanitize-html";
import type { CommonSectionProps } from "./types.js";

export const PreviewNote = ({
  title,
  content,
  showNotePreview = false,
}: CommonSectionProps & {
  showNotePreview?: boolean;
  isPreviewLoading?: boolean;
}) => {
  return (
    <section className="add_edit_note__section add_edit_note__preview_section">
      {showNotePreview && <h2 className="add_edit_note__item">Note Preview</h2>}
      <h3 className="add_edit_note__item add_edit_note__title_preview">
        {title}
      </h3>
      <div
        className="add_edit_note__item add_edit_note__body_preview"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(content)),
        }}
      />
    </section>
  );
};
