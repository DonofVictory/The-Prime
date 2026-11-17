/**
 * Single place that talks to the backend.
 * With VITE_API_BASE unset the site runs in demo mode: requests are not sent,
 * POSTs succeed after a short delay and GETs return the demo value.
 * Add ?simulate=error to any page URL to see the error states in demo mode.
 */

const BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ?? "";

export const isDemo = BASE === "";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const simulateError = () =>
  typeof location !== "undefined" && new URLSearchParams(location.search).get("simulate") === "error";

async function request(path: string, init?: RequestInit) {
  let res: Response;
  try {
    res = await fetch(BASE + path, {
      ...init,
      headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}) },
    });
  } catch {
    throw new ApiError("Network unavailable");
  }
  if (!res.ok) throw new ApiError(`Request failed (${res.status})`, res.status);
  return res;
}

export async function post<T = unknown>(path: string, body: unknown): Promise<T> {
  if (isDemo) {
    await wait(700);
    if (simulateError()) throw new ApiError("Simulated failure", 500);
    return {} as T;
  }
  const res = await request(path, { method: "POST", body: JSON.stringify(body) });
  return (await res.json().catch(() => ({}))) as T;
}

export async function get<T>(path: string, demoValue: T): Promise<T> {
  if (isDemo) {
    await wait(300);
    if (simulateError()) throw new ApiError("Simulated failure", 500);
    return demoValue;
  }
  const res = await request(path);
  return (await res.json()) as T;
}
