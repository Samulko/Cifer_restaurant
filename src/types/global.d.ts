declare global {
  interface Window {
    lenis: {
      scrollTo: (
        target: HTMLElement | number,
        options?: {
          offset?: number;
          duration?: number;
          easing?: (t: number) => number;
          immediate?: boolean;
        }
      ) => void;
      raf: (time: number) => void;
      destroy: () => void;
      scroll: number;
    } | null;
  }
}

export {};
