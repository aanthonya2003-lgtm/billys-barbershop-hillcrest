"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";
import { GhostWatermark } from "@/components/GhostWatermark";

export function Team() {
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
      className="relative overflow-hidden bg-surface px-6 py-24 sm:py-32"
    >
      <GhostWatermark text="THE CREW" position="left" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            Meet the barbers
          </p>
          <h2
            className="mt-4 font-display font-bold text-paper"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1.05 }}
          >
            The Crew
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.team.map((m) => {
            const firstName = m.name.split(" ")[0];
            return (
              <div key={m.name} className="flex flex-col items-center text-center">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full border-2"
                  style={{ borderColor: "rgba(212,175,55,0.5)" }}
                >
                  <span className="font-display text-4xl font-bold text-gold">
                    {m.initial}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-paper">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-wider text-gold uppercase">
                  {m.role}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  {m.specialty}
                </p>
                <a
                  href={site.booksyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex min-h-[48px] items-center gap-2 font-body text-sm font-semibold text-paper transition-colors hover:text-gold"
                >
                  Book with {firstName}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
