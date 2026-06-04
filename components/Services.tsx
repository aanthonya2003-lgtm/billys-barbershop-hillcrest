"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";
import { GhostWatermark } from "@/components/GhostWatermark";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const cards = gridRef.current
        ? Array.from(gridRef.current.children)
        : [];
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg px-6 py-24 sm:py-32"
    >
      <GhostWatermark text="SHARP" position="right" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            The Menu
          </p>
          <h2
            className="mt-4 font-display font-bold text-paper"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1.05 }}
          >
            Services &amp; Pricing
          </h2>
          <p className="mt-4 font-body text-muted">
            Every cut includes a complimentary beverage and a scalp massage.
            Walk-ins welcome — or book ahead for zero wait.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.services.map((s, i) => (
            <a
              key={s.name}
              href={site.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-surface p-8 transition-colors duration-300 hover:bg-bg"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs tracking-wider text-muted uppercase">
                  {s.duration}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-paper">
                {s.name}
              </h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">
                {s.blurb}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="font-mono text-2xl text-paper">{s.price}</span>
                <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold">
                  Book this service
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-sm text-muted">
          Also available: Eyebrow Wax $20 · Hair Color (varies). Full menu on
          Booksy.
        </p>
      </div>
    </section>
  );
}
