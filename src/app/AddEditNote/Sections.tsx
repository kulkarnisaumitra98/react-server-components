"use client";

import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { EditNote } from "./EditNote.js";
import { PreviewNote } from "../shared/PreviewNote.js";

export const Sections = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeBody: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <EditNote
        onChangeTitle={onChangeTitle}
        onChangeBody={onChangeBody}
        title={title}
        content={content}
      />
      <PreviewNote title={title} content={content} />
    </>
  );
};
