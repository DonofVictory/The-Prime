/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL. Empty means demo mode: forms work but nothing is sent. */
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
