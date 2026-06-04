"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";

export function StickyCTA() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(barRef.current, { yPercent: 120 });

    const st = ScrollTrigger.create({
      start: 600,
      end: "max",
      onToggle: (self) => {
        gsap.to(barRef.current, {
          yPercent: self.isActive ? 0 : 120,
          duration: reduce ? 0 : 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border bg-surface px-4 pt-3 md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={site.booksyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-red font-body text-sm font-semibold text-paper"
        style={{ border: "1px solid rgba(212,175,55,0.4)" }}
      >
        Book a Cut →
      </a>
      <a
        href={site.phone.href}
        className="flex min-h-[52px] flex-1 items-center justify-center rounded-full border border-gold font-body text-sm font-semibold text-gold"
      >
        Call
      </a>
    </div>
  );
}
