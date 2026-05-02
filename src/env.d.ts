/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly GITHUB_ACTIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
