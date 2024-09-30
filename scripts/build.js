// build.js
const { spawn } = require("child_process");
const isWindows = process.platform === "win32";

// Helper to run commands in watch mode without blocking
const runCommand = (command, args) => {
  const cmd = isWindows ? `${command}.cmd` : command; // Adjust for Windows
  const proc = spawn(cmd, args, { stdio: "inherit", shell: true });
  proc.on("error", (err) => {
    console.error(`${cmd} failed:`, err);
  });
  return proc;
};

console.log("Starting build process...");

// Start build:server
runCommand("npm", ["run", "build:server"]);

// After build:server is running, start build:client
setTimeout(() => {
  console.log("Starting client build...");
  runCommand("npm", ["run", "build:client"]);
}, 4000);

// Start init-db after both builds are started
setTimeout(() => {
  console.log("Initializing the database...");
  runCommand("npm", ["run", "init-db"]);
}, 5000);
