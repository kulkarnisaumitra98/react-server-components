const ws = new WebSocket(window.env?.WS_URL || "ws://localhost:8080");

ws.addEventListener("message", (msg) => {
  if (msg.data === "reload") {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
});
