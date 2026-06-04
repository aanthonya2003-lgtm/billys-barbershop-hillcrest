"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";
import { GhostWatermark } from "@/components/GhostWatermark";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const kenBurnsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Iron law: content is opacity:1 by CSS default. If reduced motion,
      // leave it fully visible and skip all motion.
      if (reduce) {
        gsap.set(contentRef.current, { opacity: 1, yPercent: 0 });
        return;
      }

      // Container entrance — NOT font-gated, so content can never be
      // stranded invisible if fonts hang.
      gsap.set(contentRef.current, { opacity: 0, yPercent: 15 });
      gsap.to(contentRef.current, {
        opacity: 1,
        yPercent: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Ken Burns drifting light — asset-free.
      gsap.to(kenBurnsRef.current, {
        scale: 1.06,
        xPercent: 2,
        yPercent: -2,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // SplitText headline — font-gated, separate from container reveal.
      let split: SplitText | null = null;
      document.fonts.ready.then(() => {
        if (!headingRef.current) return;
        split = SplitText.create(headingRef.current, {
          type: "words,chars",
          wordsClass: "overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]",
        });
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.35,
        });
      });

      return () => {
        if (split) split.revert();
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Cinematic asset-free backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={kenBurnsRef}
          className="will-parallax absolute"
          style={{
            inset: "-5%",
            background:
              "radial-gradient(60% 50% at 30% 25%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(45% 45% at 78% 72%, rgba(185,28,28,0.14), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, #0c0c0c 100%)",
          }}
        />
        <div className="grain absolute inset-0" />
        <div className="barber-pole absolute top-0 left-0 hidden h-full w-3 opacity-70 md:block" />
        <div className="barber-pole absolute top-0 right-0 hidden h-full w-3 opacity-70 md:block" />
      </div>

      <GhostWatermark text="BILLY'S" position="center" />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-border" />
          <span className="font-display text-sm tracking-[0.35em] text-gold uppercase sm:text-base">
            Billy&apos;s Barbershop
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h1
          ref={headingRef}
          className="font-display font-bold text-paper"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 1.05 }}
        >
          Hillcrest&apos;s Premier Barbershop
        </h1>

        <p className="mt-6 font-body text-base text-muted sm:text-lg">
          <span className="text-paper">Cut · Razor · Wash · Style</span> — from
          $40
        </p>

        <div className="mt-10">
          <a
            href={site.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-red px-10 py-4 font-body text-base font-semibold tracking-wide text-paper transition-transform duration-300 hover:scale-[1.02]"
            style={{ border: "1px solid rgba(212,175,55,0.4)" }}
          >
            Book a Cut
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2">
            <span className="text-gold" aria-hidden="true">
              ★★★★★
            </span>
            <span className="font-mono text-muted">5.0 · 307 reviews</span>
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <a
            href={site.phone.href}
            className="font-mono text-paper transition-colors hover:text-gold"
          >
            {site.phone.display}
          </a>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="font-mono text-muted">
            142 University Ave, Suite D
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
