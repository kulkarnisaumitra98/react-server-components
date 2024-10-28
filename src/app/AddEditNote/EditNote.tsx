"use client";

import type { ChangeEventHandler } from "react";
import type { CommonSectionProps } from "../shared/types.js";
import { useRouter } from "../../framework/client/utils.js";

interface Props {
  onChangeTitle: ChangeEventHandler<HTMLInputElement>;
  onChangeBody: ChangeEventHandler<HTMLTextAreaElement>;
}

export const EditNote = ({
  title,
  content,
  onChangeTitle,
  onChangeBody,
}: CommonSectionProps & Props) => {
  const { invalidateCache, navigate, cache } = useRouter();

  const onSave = async () => {
    if (title && content) {
      const response = await fetch(`${window.env.RSC_URL}/api/notes`, {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newNote = await response.json();
      if (newNote?.id) {
        invalidateCache?.(
          Array.from(cache?.keys() || []).filter((key) => {
            return key.startsWith("/my-notes") && !key.includes(newNote.id);
          }),
        );
        navigate?.(`/my-notes?id=${newNote.id}`);
      }
    } else {
      alert("Invalid values");
    }
  };

  return (
    <section className="add_edit_note__section add_edit_note__edit_section">
      <h2 className="add_edit_note__item">Add Note</h2>
      <input
        className="add_edit_note__item add_edit_note_input"
        placeholder="Title"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        className="add_edit_note__item add_edit_note_textarea"
        placeholder="Note content"
        value={content}
        onChange={onChangeBody}
      />
      <button
        className="add_edit_note__item add_edit_note_button"
        onClick={onSave}
      >
        Save
      </button>
    </section>
  );
};
