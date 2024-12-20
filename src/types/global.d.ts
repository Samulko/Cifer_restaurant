declare module '@studio-freight/lenis' {
  export interface LenisOptions {
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal';
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    touchInertiaMultiplier?: number;
    normalizeWheel?: boolean;
    infinite?: boolean;
  }

  export interface ScrollToOptions {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    scrollTo(target: HTMLElement | number | string, options?: ScrollToOptions): void;
    raf(time: number): void;
    destroy(): void;
    stop(): void;
    start(): void;
    resize(): void;
    scroll: number;
  }
}

declare global {
  interface Window {
    lenis: import('@studio-freight/lenis').default | null;
  }

  // Add touch event types
  interface TouchEvent {
    touches: TouchList;
    target: EventTarget & {
      closest?: (selector: string) => HTMLElement | null;
    };
  }

  // Add viewport height CSS variable
  interface CSSStyleDeclaration {
    '--vh': string;
  }
}

export {};
