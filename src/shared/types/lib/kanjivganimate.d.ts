/* eslint-disable no-unused-vars */

declare module "kanjivganimate" {
  class KanjivgAnimate {
    constructor(trigger: string, time?: number);
    setOnClick(trigger: string, time: number): void;
  }

  class KVGAnimator {
    constructor(time: number);
    play(trigger: HTMLElement): void;
    findTarget(trigger: HTMLElement): HTMLElement | null;
    hideAll(): void;
    animatePath(path: HTMLElement, number: HTMLElement | undefined): void;
    doAnimation(path: HTMLElement): void;
  }

  export = KanjivgAnimate;
}
