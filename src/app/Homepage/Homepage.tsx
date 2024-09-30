import { Suspense } from "react";
import { FetchNoteButton } from "./FetchNoteButton.js";
import { RandomNotePreview } from "./RandomNotePreview.js";

export const Homepage = () => {
  return (
    <div className="page_layout homepage">
      <h1 className="homepage__message">
        {/* @ts-ignore */}
        <marquee scrollamount={10}>
          This is a simple Note taking app which supports Markdown
          {/* @ts-ignore */}
        </marquee>
      </h1>
      <div className="homepage__demo_cont">
        <div className="homagepage_demo_item">
          <h4 className="homepage_demo_title">(Client Component)</h4>
          <FetchNoteButton />
        </div>
        <div className="homagepage_demo_item">
          <h4 className="homepage_demo_title">(Server Rendered Preview)</h4>
          <Suspense fallback={<span>Fetching...</span>}>
            <RandomNotePreview />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
