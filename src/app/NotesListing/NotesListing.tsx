import { Suspense } from "react";
import { PreviewSelectedNote } from "./PreviewSelectedNote.js";
import { MyNotes } from "./MyNotes.js";

interface Props {
  params: {
    id?: string;
  };
}

export const NotesListing = ({ params }: Props) => {
  const activeNoteId = params?.id;

  return (
    <div className="page_layout my_notes">
      <div className="my_notes__listing">
        <Suspense fallback={<h3>Loading...</h3>}>
          <MyNotes activeNoteId={activeNoteId} />
        </Suspense>
      </div>
      <div className="my_notes__preview">
        <Suspense fallback={<h3>Loading...</h3>}>
          <PreviewSelectedNote id={activeNoteId} />
        </Suspense>
      </div>
    </div>
  );
};
