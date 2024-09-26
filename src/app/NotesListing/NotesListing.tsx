import { Suspense } from "react";
import { PreviewSelectedNote } from "./PreviewSelectedNote.js";
import { MyNotes } from "./MyNotes.js";
import { NotesClientWrapper } from "./NotesClientWrapper.js";
import { PreviewNoteClientWrapper } from "./PreviewNoteClientWrapper.js";

interface Props {
  params: {
    id?: string;
  };
}

export const NotesListing = ({ params }: Props) => {
  const activeNoteId = params?.id;

  return (
    <NotesClientWrapper activeNoteId={activeNoteId}>
      <div className="page_layout my_notes">
        <div className="my_notes__listing">
          <Suspense fallback={<h3>Loading...</h3>}>
            <MyNotes />
          </Suspense>
        </div>
        <div className="my_notes__preview">
          <Suspense fallback={<h3>Loading...</h3>}>
            <PreviewNoteClientWrapper activeNoteId={activeNoteId}>
              <PreviewSelectedNote id={activeNoteId} />
            </PreviewNoteClientWrapper>
          </Suspense>
        </div>
      </div>
    </NotesClientWrapper>
  );
};
