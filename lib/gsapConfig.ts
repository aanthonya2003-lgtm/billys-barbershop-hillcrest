"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace gsap.core {
    function globals(): Record<string, unknown>;
  }
}

if (
  typeof window !== "undefined" &&
  !gsap.core.globals()["ScrollTrigger"]
) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
