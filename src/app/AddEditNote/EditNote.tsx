"use client";

import type { ChangeEventHandler } from "react";
import type { CommonSectionProps } from "./types.js";

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
  const onSave = async () => {
    // @ts-ignore
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
    console.log(response);
  };

  return (
    <section className="add_edit_note__section add_edit_note__edit_section">
      <h2 className="add_edit_note__item">Edit Note</h2>
      <input
        className="add_edit_note__item add_edit_note_input"
        placeholder="Title"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        className="add_edit_note__item add_edit_note_textarea"
        placeholder="Note Content (markdown supported)"
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