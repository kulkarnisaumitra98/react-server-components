const chokidar = require("chokidar");
const ws = require("ws");
require("dotenv").config();

const wss = new ws.WebSocketServer({ host: process.env.WS_HOST, port: 8080 });

let sendMessage = null;

wss.on("connection", function connection(ws) {
  sendMessage = () => {
    ws.send("reload");
  };
});

const watcher = chokidar.watch(["public", "dist"], {
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
