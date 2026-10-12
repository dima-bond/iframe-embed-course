import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const requestedFile = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = join(root, requestedFile);

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile() || !filePath.startsWith(root)) {
      throw new Error("Not found");
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(4000, "127.0.0.1", () => {
  console.log("widget → http://localhost:4000");
});

