const chokidar = require("chokidar");
const ws = require("ws");

const wss = new ws.WebSocketServer({ port: 8080 });

let sendMessage = null;

wss.on("connection", function connection(ws) {
  sendMessage = () => {
    ws.send("reload");
  };
});

const watcher = chokidar.watch(["./server_dist/", "public"], {
  ignored: [
    "**/node_modules/**",
    /(^|[/\\])\../, // ignore dotfiles
  ],
  persistent: true,
  ignoreInitial: false,
  recursive: true,
});

watcher.on("change", () => {
  if (sendMessage) {
    sendMessage();
  }
});
