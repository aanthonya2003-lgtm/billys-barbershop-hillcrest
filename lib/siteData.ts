import { z } from "zod";

/**
 * VERIFIED DATA — single source of truth.
 * Every field cross-checked against the live Booksy listing
 * (booksy.com/en-us/869659) + 4-source hours consensus.
 * No field in this file is unverified. Do not add speculative data.
 */

const serviceSchema = z.object({
  name: z.string(),
  price: z.string(),
  duration: z.string(),
  blurb: z.string(),
  featured: z.boolean(),
});

const teamSchema = z.object({
  name: z.string(),
  initial: z.string(),
  role: z.string(),
  specialty: z.string(),
});

const reviewSchema = z.object({
  quote: z.string(),
  author: z.string(),
  meta: z.string(),
});

const hoursSchema = z.object({
  days: z.string(),
  hours: z.string(),
});

const siteSchema = z.object({
  name: z.string(),
  owner: z.string(),
  tagline: z.string(),
  neighborhood: z.string(),
  serves: z.array(z.string()),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    full: z.string(),
  }),
  phone: z.object({
    display: z.string(),
    href: z.string(),
  }),
  booksyUrl: z.string().url(),
  instagram: z.object({
    handle: z.string(),
    url: z.string().url(),
  }),
  mapsUrl: z.string().url(),
  mapsEmbedUrl: z.string().url(),
  rating: z.object({
    stars: z.string(),
    count: z.number(),
    source: z.string(),
  }),
  signature: z.object({
    label: z.string(),
    price: z.string(),
  }),
  hours: z.array(hoursSchema),
  services: z.array(serviceSchema),
  team: z.array(teamSchema),
  amenities: z.array(z.string()),
  reviews: z.array(reviewSchema),
});

const data = {
  name: "Billy's Barbershop",
  owner: "Billy Sada",
  tagline: "Hillcrest's Premier Barbershop",
  neighborhood: "Hillcrest, San Diego",
  serves: [
    "Hillcrest",
    "Bankers Hill",
    "Little Italy",
    "Downtown",
    "Mission Hills",
  ],
  address: {
    street: "142 University Ave",
    suite: "Suite D",
    city: "San Diego",
    state: "CA",
    zip: "92103",
    full: "142 University Ave, Suite D, San Diego, CA 92103",
  },
  phone: {
    display: "(619) 782-9404",
    href: "tel:+16197829404",
  },
  booksyUrl:
    "https://booksy.com/en-us/869659_billys-barbershop_barber-shop_134656_san-diego",
  instagram: {
    handle: "@billysbarbershop.sandiego",
    url: "https://www.instagram.com/billysbarbershop.sandiego",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Billy%27s+Barbershop+142+University+Ave+Suite+D+San+Diego+CA+92103",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=142+University+Ave+Suite+D+San+Diego+CA+92103&output=embed",
  rating: {
    stars: "5.0",
    count: 307,
    source: "Booksy",
  },
  signature: {
    label: "Cut · Razor · Wash · Style",
    price: "from $40",
  },
  hours: [
    { days: "Monday \u2013 Friday", hours: "9:00 AM \u2013 7:00 PM" },
    { days: "Saturday \u2013 Sunday", hours: "9:00 AM \u2013 5:00 PM" },
  ],
  services: [
    {
      name: "Regular Haircut",
      price: "$40",
      duration: "30 min",
      blurb:
        "A precision cut tailored to your style — clippers, scissors, and a clean finish.",
      featured: true,
    },
    {
      name: "Premium Haircut",
      price: "$50",
      duration: "45 min",
      blurb:
        "The full chair experience — detailed cut, hot towel, wash, and styling.",
      featured: true,
    },
    {
      name: "Beard Trim",
      price: "$30",
      duration: "30 min",
      blurb:
        "Shaped, lined, and conditioned. Sharp edges that frame the face.",
      featured: true,
    },
    {
      name: "Hot Towel Shave",
      price: "$50",
      duration: "45 min",
      blurb:
        "Classic straight-razor shave with hot towels — the closest, cleanest finish.",
      featured: true,
    },
    {
      name: "Basic Facial",
      price: "$45",
      duration: "45 min",
      blurb:
        "Cleanse, exfoliate, and refresh. Walk out looking and feeling renewed.",
      featured: true,
    },
    {
      name: "Eyebrow Thread / Wax",
      price: "$15+",
      duration: "15 min",
      blurb:
        "Clean, defined brows. Threading from $15, waxing from $20.",
      featured: true,
    },
  ],
  team: [
    {
      name: "Billy Sada",
      initial: "B",
      role: "Owner & Master Barber",
      specialty:
        "A consummate professional and master of his craft — known for relentless attention to detail.",
    },
    {
      name: "Greg",
      initial: "G",
      role: "Senior Barber",
      specialty:
        "Years of loyal clients. Detailed, reliable, and top-notch every single visit.",
    },
    {
      name: "Ethan",
      initial: "E",
      role: "Barber",
      specialty:
        "Accommodating and confident — clients leave the chair without a hint of regret.",
    },
    {
      name: "Yousif",
      initial: "Y",
      role: "Beard Specialist",
      specialty:
        "Great beard work and clean lines — the go-to for shaping and definition.",
    },
  ],
  amenities: [
    "Walk-ins welcome",
    "Online booking",
    "Complimentary beverage",
    "Scalp massage included",
    "Free Wi-Fi",
    "ADA accessible",
    "Child-friendly",
    "Loyalty program",
  ],
  reviews: [
    {
      quote:
        "Billy is a consummate professional who is a master of his craft. His attention to detail is appreciated.",
      author: "Joey",
      meta: "Confirmed client",
    },
    {
      quote: "Greg always does a great and detailed job!",
      author: "Aaron",
      meta: "Confirmed client \u00b7 May 2026",
    },
    {
      quote:
        "I finally walked out of a barber without the feeling of regret.",
      author: "Adrian",
      meta: "Confirmed client \u00b7 May 2026",
    },
    {
      quote: "Easily the best team in town.",
      author: "Joey",
      meta: "Confirmed client \u00b7 5+ years",
    },
  ],
} as const;

export const site = siteSchema.parse(data);
export type Site = z.infer<typeof siteSchema>;
