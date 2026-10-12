import { createServer } from "node:http";

createServer((request, response) => {
  const url = new URL(request.url, "http://localhost:5000");

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
}).listen(5000, "127.0.0.1", () => {
  console.log("api    → http://localhost:5000");
});
