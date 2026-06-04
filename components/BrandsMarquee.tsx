const ITEMS = [
  "Fades",
  "Skin Fades",
  "Tapers",
  "Beard Trims",
  "Hot Towel Shaves",
  "Line-Ups",
  "Comb Overs",
  "Straight Razor",
];

/**
 * Pure-CSS infinite marquee — no GSAP. Two identical tracks translate -50%
 * for a seamless loop. Pauses on hover via CSS. Respects reduced motion
 * (animation disabled in globals.css).
 */
export function BrandsMarquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface py-6"
      aria-label="Services offered at Billy's Barbershop"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex items-center">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center">
                <span className="font-display text-xl tracking-wide text-paper uppercase sm:text-2xl">
                  {item}
                </span>
                <span className="mx-8 text-gold" aria-hidden="true">
                  ◆
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
