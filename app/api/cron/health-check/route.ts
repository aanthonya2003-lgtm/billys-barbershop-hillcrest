import { NextResponse } from "next/server";
import { site } from "@/lib/siteData";

export const dynamic = "force-dynamic";

type Check = {
  target: string;
  ok: boolean;
  status: number | null;
};

/**
 * Daily health-check (Vercel cron, 08:00 UTC). Verifies the two
 * conversion-critical external links — the Booksy booking page and the
 * Instagram profile — are still reachable. Returns 200 when healthy,
 * 503 when any target is down, so monitoring can alert.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const targets = [site.booksyUrl, site.instagram.url];
  const checks: Check[] = [];

  for (const target of targets) {
    try {
      const res = await fetch(target, {
        method: "HEAD",
        cache: "no-store",
        headers: { "user-agent": "BillysBarbershop-HealthCheck/1.0" },
      });
      checks.push({ target, ok: res.ok, status: res.status });
    } catch {
      checks.push({ target, ok: false, status: null });
    }
  }

  const healthy = checks.every((c) => c.ok);

  return NextResponse.json(
    {
      service: site.name,
      timestamp: new Date().toISOString(),
      healthy,
      checks,
    },
    { status: healthy ? 200 : 503 }
  );
}
