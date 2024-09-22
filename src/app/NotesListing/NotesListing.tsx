import { Suspense } from "react";
import { MyNotes } from "./MyNotes.js";

interface Props {
  params: {
    id?: string;
  };
}

export const NotesListing = ({ params }: Props) => {
  const activeNoteId = params.id;

  return (
    <div className="page_layout my_notes">
      <div className="my_notes__listing">
        <Suspense>
          <MyNotes activeNoteId={activeNoteId} />
        </Suspense>
      </div>
      <div className="my_notes__preview"></div>
    </div>
  );
};
