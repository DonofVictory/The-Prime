// Serves build/client the way a static host does:
//   /about       -> about/index.html
//   /favicon.svg -> favicon.svg
//   anything else -> __spa-fallback.html with status 404 (the site shows "This page does not exist")
// Usage: npm run preview  (after npm run build)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("build/client");
const port = Number(process.env.PORT ?? 4321);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

createServer((req, res) => {
  // A rebuild briefly deletes the build folder; answer 503 instead of crashing the server.
  handle(req, res).catch(() => {
    if (!res.headersSent) res.writeHead(503, { "Content-Type": "text/plain" });
    res.end("Rebuilding, refresh in a moment.");
  });
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));

async function handle(req, res) {
  const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  const safe = normalize(join(root, pathname));
  if (!safe.startsWith(root)) {
    res.writeHead(400).end();
    return;
  }
  const candidates = [safe, join(safe, "index.html")];
  for (const file of candidates) {
    if (await isFile(file)) {
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
      res.end(body);
      return;
    }
  }
  const fallback = await readFile(join(root, "__spa-fallback.html"));
  res.writeHead(404, { "Content-Type": types[".html"] });
  res.end(fallback);
}
