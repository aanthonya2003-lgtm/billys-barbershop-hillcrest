"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const target = site.rating.count;

      if (reduce) {
        if (countRef.current) countRef.current.textContent = String(target);
        return;
      }

      // Review counter — fires before the viewport scrolls past on mobile.
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: countRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.val));
          }
        },
      });

      // Pull-quote cards — intersection-triggered stagger (never scrubbed).
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : [];
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
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
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            What the chair says
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <span className="font-display text-7xl font-bold text-paper sm:text-8xl">
              5.0
            </span>
            <span className="text-2xl text-gold" aria-hidden="true">
              ★★★★★
            </span>
            <p className="mt-2 font-mono text-sm text-muted">
              <span ref={countRef}>0</span> verified reviews on Booksy
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-6 sm:grid-cols-2">
          {site.reviews.map((r, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-border bg-bg p-8"
            >
              <blockquote
                className="font-display text-paper italic"
                style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)" }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs tracking-wider text-muted uppercase">
                {r.author} · {r.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
