/// <reference types="vite/client" />

// File needed to use vite Hot Module Reload

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FEATURE_FLAG: boolean;
  readonly VITE_GOOGLE_API_KEY: string;
}

declare module "eslint-plugin-json";
