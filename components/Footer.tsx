import { site } from "@/lib/siteData";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg px-6 pt-20 pb-28 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold text-paper">
              Billy&apos;s Barbershop
            </p>
            <p className="mt-3 max-w-xs font-body text-sm text-muted">
              Hillcrest&apos;s premier barbershop. Master fades, beard work,
              and hot towel shaves.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[48px] items-center gap-3 text-paper transition-colors hover:text-gold"
              aria-label={`Instagram ${site.instagram.handle}`}
            >
              <InstagramIcon />
              <span className="font-mono text-sm">{site.instagram.handle}</span>
            </a>
          </div>

          {/* Visit */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
              Visit
            </p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block font-body text-sm text-paper transition-colors hover:text-gold"
            >
              {site.address.street}, {site.address.suite}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </a>
            <a
              href={site.phone.href}
              className="mt-3 inline-flex min-h-[48px] items-center font-mono text-sm text-paper transition-colors hover:text-gold"
            >
              {site.phone.display}
            </a>
            <div className="mt-3 space-y-1 font-body text-sm text-muted">
              {site.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.hours}
                </p>
              ))}
            </div>
          </div>

          {/* Book */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
              Book
            </p>
            <a
              href={site.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex min-h-[48px] items-center gap-2 font-body text-sm font-semibold text-paper transition-colors hover:text-gold"
            >
              Book Online on Booksy
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="mt-6 font-mono text-xs tracking-wider text-muted uppercase">
              Serving
            </p>
            <p className="mt-2 font-body text-sm text-muted">
              {site.serves.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted">
            © 2026 Billy&apos;s Barbershop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
