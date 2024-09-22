declare global {
  interface Window {
    __RSC_PAYLOAD__: any;
    env: {
      RSC_URL: string;
    };
  }
}

let encoder = new TextEncoder();
let streamController: any;
let rscStream = new ReadableStream({
  start(controller) {
    if (typeof window === "undefined") {
      return;
    }
    let handleChunk = (chunk: string) => {
      controller.enqueue(encoder.encode(chunk));
    };
    window.__RSC_PAYLOAD__ ||= [];
    window.__RSC_PAYLOAD__.forEach(handleChunk);
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

export default rscStream;
