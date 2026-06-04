"use client";

import { ReactLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useEffect } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const Lenis = require("lenis").default;
    const lenis = new Lenis({
      autoRaf: false,
      syncTouch: true,
      smoothWheel: !prefersReduced,
    });

    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
}
