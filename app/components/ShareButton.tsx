import { useEffect, useState } from "react";

/** The phone's share sheet when available, otherwise copy the link. */
export function ShareButton({
  title,
  text,
  url,
  label = "Share",
  variant = "line",
}: {
  title: string;
  text?: string;
  url?: string;
  label?: string;
  variant?: "line" | "sky" | "solid";
}) {
  const [shown, setShown] = useState(label);

  useEffect(() => {
    if (shown === label) return;
    const t = setTimeout(() => setShown(label), 2500);
    return () => clearTimeout(t);
  }, [shown, label]);

  async function share() {
    const href = new URL(url ?? location.pathname, location.origin).href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: href });
        return;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(text ? `${text}\n${href}` : href);
      setShown("Link copied");
    } catch {
      setShown("Copy failed. Use the address bar.");
    }
  }

  return (
    <button type="button" className={`btn btn-${variant}`} onClick={share} aria-live="polite">
      {shown}
    </button>
  );
}
