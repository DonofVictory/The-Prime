// Copies the SPA fallback page to 404.html. Static hosts such as Vercel serve 404.html, with a 404 status,
// for any URL that has no page, and the site then shows its own "page does not exist" screen.
import { copyFileSync } from "node:fs";

copyFileSync("build/client/__spa-fallback.html", "build/client/404.html");
console.log("404.html written to build/client/");
