export declare global {
  export interface Window {
    [K: string]: any;
  }

  export type Indexed<T = unknown> = {
    [key in string]: T;
  };
}
