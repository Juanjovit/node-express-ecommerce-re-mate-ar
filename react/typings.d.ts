declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
