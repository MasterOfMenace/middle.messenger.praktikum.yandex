interface Window {
  [K: string]: any;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}
