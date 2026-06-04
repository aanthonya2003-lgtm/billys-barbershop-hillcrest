"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";

export function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

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
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1.5,
            toggleActions: "play reverse play reverse",
          },
        });
      });

      return () => {
        if (split) split.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface px-6 py-28 text-center sm:py-36"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
          Last chair
        </p>
        <h2
          ref={headingRef}
          className="mt-4 font-display font-bold text-paper"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.05 }}
        >
          Ready for a Fresh Cut?
        </h2>
        <p className="mt-6 font-body text-muted sm:text-lg">
          Book online in seconds, call the shop, or slide into our DMs.
          Walk-ins always welcome.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={site.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-red px-10 py-4 font-body text-base font-semibold text-paper transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            style={{ border: "1px solid rgba(212,175,55,0.4)" }}
          >
            Book Now
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={site.phone.href}
            className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full border border-gold px-10 py-4 font-body text-base font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-bg sm:w-auto"
          >
            Call the Shop
          </a>
        </div>

        <div className="mt-8">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-gold"
          >
            DM us on Instagram {site.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
