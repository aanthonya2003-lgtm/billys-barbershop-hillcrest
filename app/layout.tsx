import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { site } from "@/lib/siteData";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://billysbarbershop.vercel.app"),
  title: {
    default:
      "Billy's Barbershop — Hillcrest's Premier Barbershop | San Diego",
    template: "%s | Billy's Barbershop",
  },
  description:
    "Billy's Barbershop in Hillcrest, San Diego. 5.0 stars across 307 reviews. Master fades, beard work, hot towel shaves. Cut · Razor · Wash · Style from $40. Walk-ins welcome — book online.",
  keywords: [
    "barber Hillcrest",
    "barbershop San Diego",
    "haircut Hillcrest",
    "beard trim San Diego",
    "hot towel shave San Diego",
    "Billy's Barbershop",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: "Billy's Barbershop — Hillcrest's Premier Barbershop",
    description:
      "5.0 stars · 307 reviews. Master fades, beard work, hot towel shaves in Hillcrest, San Diego. Cut · Razor · Wash · Style from $40.",
    url: "https://billysbarbershop.vercel.app",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://billysbarbershop.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: site.name,
  description:
    "Hillcrest's premier barbershop. Master fades, beard work, and hot towel shaves in San Diego.",
  url: "https://billysbarbershop.vercel.app",
  telephone: site.phone.display,
  founder: site.owner,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.suite}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: site.serves,
  sameAs: [site.instagram.url, site.booksyUrl],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
