"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";
import { GhostWatermark } from "@/components/GhostWatermark";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      // Parallax on the editorial panel — yPercent +6 -> -6, scrub 2.
      gsap.fromTo(
        panelRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <GhostWatermark
        text="HILLCREST"
        position="bottom-right"
        style={{ color: "var(--color-bg)", opacity: 0.06 }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Editorial copy */}
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            The Shop
          </p>
          <h2
            className="mt-4 font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              color: "var(--color-bg)",
            }}
          >
            Built in Hillcrest, sharpened by repeat clients.
          </h2>

          <div
            className="mt-8 space-y-5 font-body text-base leading-relaxed"
            style={{ color: "#2e2e2e" }}
          >
            <p>
              Billy Sada opened the chair with one standard: every client
              leaves sharper than they walked in. That standard built a 5.0
              rating across 307 verified reviews — and a roster of regulars
              who&apos;ve trusted the same hands for years.
            </p>
            <p>
              Billy works alongside Greg, Ethan, and Yousif — a team known for
              detail, clean lines, and beard work that holds up. Every visit
              includes a complimentary beverage and a scalp massage. Walk-ins
              are always welcome; book ahead and skip the wait entirely.
            </p>
            <p>
              Proudly serving Hillcrest, Bankers Hill, Little Italy, Downtown,
              and Mission Hills — the Cut · Razor · Wash · Style starts at $40.
            </p>
          </div>

          <div
            className="mt-8 border-t pt-6"
            style={{ borderColor: "rgba(12,12,12,0.12)" }}
          >
            <blockquote
              className="font-display text-xl italic"
              style={{ color: "var(--color-bg)" }}
            >
              &ldquo;The best team in town.&rdquo;
            </blockquote>
            <p className="mt-2 font-mono text-xs tracking-wider text-muted uppercase">
              Joey · Confirmed Booksy client
            </p>
          </div>
        </div>

        {/* Parallax editorial panel — asset-free */}
        <div className="relative h-[420px] overflow-hidden sm:h-[520px]">
          <div
            ref={panelRef}
            className="will-parallax absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-2xl"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <div className="barber-pole h-1 w-24 rounded-full" />
            <span className="font-display text-[7rem] leading-none font-bold text-gold sm:text-[9rem]">
              B
            </span>
            <p className="font-mono text-xs tracking-[0.3em] text-paper uppercase">
              Est. Hillcrest · San Diego
            </p>
            <p className="px-8 text-center font-display text-lg text-paper italic">
              Cut · Razor · Wash · Style — from $40
            </p>
            <div className="barber-pole h-1 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
