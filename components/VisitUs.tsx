"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { site } from "@/lib/siteData";
import { GhostWatermark } from "@/components/GhostWatermark";

const BADGES = [
  "Walk-ins welcome",
  "ADA accessible",
  "Free Wi-Fi",
  "Loyalty program",
];

export function VisitUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.from(infoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
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
      <GhostWatermark text="SINCE DAY ONE" position="bottom-left" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        {/* Info */}
        <div ref={infoRef}>
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            Visit
          </p>
          <h2
            className="mt-4 font-display font-bold text-paper"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Find the Chair
          </h2>

          {/* Hours */}
          <div className="mt-10 space-y-4">
            {site.hours.map((h) => (
              <div
                key={h.days}
                className="flex items-center justify-between border-b border-border pb-3"
              >
                <span className="font-body text-paper">{h.days}</span>
                <span className="font-mono text-sm text-gold">{h.hours}</span>
              </div>
            ))}
          </div>

          {/* Address + phone */}
          <div className="mt-8 space-y-2">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-paper transition-colors hover:text-gold"
            >
              {site.address.street}, {site.address.suite}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </a>
            <a
              href={site.phone.href}
              className="inline-flex min-h-[48px] items-center font-mono text-lg text-paper transition-colors hover:text-gold"
            >
              {site.phone.display}
            </a>
          </div>

          {/* Badges */}
          <ul className="mt-6 flex flex-wrap gap-3">
            {BADGES.map((b) => (
              <li
                key={b}
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wider text-muted uppercase"
              >
                {b}
              </li>
            ))}
          </ul>

          {/* Secondary CTA */}
          <div className="mt-10">
            <a
              href={site.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-red px-9 py-4 font-body text-base font-semibold text-paper transition-transform duration-300 hover:scale-[1.02]"
              style={{ border: "1px solid rgba(212,175,55,0.4)" }}
            >
              Book Ahead for No Wait
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Lazy map */}
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-border lg:min-h-full">
          <iframe
            title="Map to Billy's Barbershop, 142 University Ave Suite D, San Diego"
            src={site.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
