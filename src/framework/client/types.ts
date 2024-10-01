declare global {
  interface Window {
    __RSC_PAYLOAD__: any;
    env: {
      RSC_URL: string;
    };
  }
}
export type Navigate = <T>(pathname: string, params?: T) => void;
