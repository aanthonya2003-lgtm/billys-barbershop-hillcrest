"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (ref.current) {
          ref.current.textContent =
            String(Math.round(self.progress * 100)).padStart(2, "0") + "%";
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed top-6 right-6 z-[60] mix-blend-difference">
      <span ref={ref} className="font-mono text-xs tracking-widest text-white">
        00%
      </span>
    </div>
  );
}
