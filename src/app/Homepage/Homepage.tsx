import { Suspense } from "react";
import { FetchNoteButton } from "./FetchNoteButton.js";
import { RandomNotePreview } from "./RandomNotePreview.js";

export const Homepage = () => {
  return (
    <div className="page_layout homepage">
      <h2 className="homepage__message">
        Example of fetching random note and rendering the preview on Server
      </h2>
      <div className="homepage__demo_cont">
        <div className="homagepage_demo_item homepage__demo_button">
          <h4 className="homepage_demo_title">(Client Component)</h4>
          <FetchNoteButton />
        </div>
        <div className="homagepage_demo_item homepage__demo_note">
          <h4 style={{ color: "green" }} className="homepage_demo_title">
            (Server Rendered Preview)
          </h4>
          <Suspense fallback={<span>Fetching...</span>}>
            <RandomNotePreview />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
