const ws = new WebSocket(window.env.WS_URL);

ws.addEventListener("message", (msg) => {
  if (msg.data === "reload") {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
});
