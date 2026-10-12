import { spawn } from "node:child_process";

const processes = [
  ["host", "apps/host/server.mjs"],
  ["widget", "apps/widget/server.mjs"],
  ["api", "apps/api/server.mjs"],
].map(([name, entry]) => {
  const child = spawn(process.execPath, [entry], {
    cwd: process.cwd(),
    env: { ...process.env, SERVICE_NAME: name },
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (code && code !== 0) {
      console.error(`${name} stopped with code ${code}`);
    } else if (signal && signal !== "SIGTERM" && signal !== "SIGINT") {
      console.error(`${name} stopped after ${signal}`);
    }
  });

  return child;
});

function stop() {
  for (const child of processes) {
    child.kill("SIGTERM");
  }
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
