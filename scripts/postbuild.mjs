// Runs after `react-router build`.
// 1. Copies the SPA fallback page to 404.html. Static hosts such as Vercel serve 404.html, with a 404 status,
//    for any URL that has no page, and the site then shows its own "page does not exist" screen.
// 2. Mirrors build/client into dist/. vercel.json points Vercel at build/client, but if a Vercel project's
//    dashboard settings (for example the "Vite" preset) look for dist instead, the deploy still works.
import { copyFileSync, cpSync, rmSync } from "node:fs";

copyFileSync("build/client/__spa-fallback.html", "build/client/404.html");
rmSync("dist", { recursive: true, force: true });
cpSync("build/client", "dist", { recursive: true });
console.log("404.html written; build/client mirrored to dist/");
