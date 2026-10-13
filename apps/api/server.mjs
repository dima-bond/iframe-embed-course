import { createServer } from "node:http";

const port = Number(process.env.COURSE_API_PORT ?? 5050);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("COURSE_API_PORT must be an integer between 1 and 65535");
}

createServer((request, response) => {
  const url = new URL(request.url, `http://localhost:${port}`);

  if (request.method === "GET" && url.pathname === "/health") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(JSON.stringify({ status: "ok", service: "course-api" }));
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({ error: "Not found" }));
}).listen(port, "127.0.0.1", () => {
  console.log(`api    → http://localhost:${port}`);
});
