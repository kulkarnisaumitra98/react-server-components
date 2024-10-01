let encoder = new TextEncoder();
export let streamController: any;

// We will need to create a readableStream
export const rscStream = new ReadableStream({
  start(controller) {
    if (typeof window === "undefined") {
      return;
    }
    let handleChunk = (chunk: string) => {
      controller.enqueue(encoder.encode(chunk));
    };
    window.__RSC_PAYLOAD__ ||= [];
    window.__RSC_PAYLOAD__.forEach(handleChunk);
    /*  On the SSR server we push the RSC payloads as they are available using script tags.
        Now on the client as we recieve the HTML stream we pick up those parts and
        start enqueuing them. As they are enqueued react will "use" the pieces and hydrate
        the tree using createFromReadableStream
    */
    window.__RSC_PAYLOAD__.push = (chunk: string) => {
      handleChunk(chunk);
    };
    streamController = controller;
  },
});

if (typeof document !== "undefined" && document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    streamController?.close();
  });
} else {
  streamController?.close();
}
