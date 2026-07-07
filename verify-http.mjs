import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname);
const port = 4183;
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
};

const server = createServer(async (request, response) => {
  const cleanPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\//, "");
  const filePath = resolve(join(root, relativePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    response.writeHead(200, { "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream" });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

await new Promise((resolveListen) => server.listen(port, host, resolveListen));

const paths = [
  "/index.html",
  "/styles.css",
  "/script.js",
  "/plant-hibiscus-mixed-deck.jpg",
  "/plant-jasmine-double-cluster.jpg",
];

const results = [];
for (const path of paths) {
  const response = await fetch(`http://${host}:${port}${path}`);
  results.push({ path, status: response.status, contentType: response.headers.get("content-type") });
}

server.close();
console.log(JSON.stringify(results, null, 2));

if (results.some((result) => result.status !== 200)) {
  process.exitCode = 1;
}
