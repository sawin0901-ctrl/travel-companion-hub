import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FLIGHT_ROUTES } from "@/lib/flight-routes";
import { ArrowRight, ExternalLink } from "lucide-react";

const TOKEN = "f587ed2905dd3411c38e95fd0ce2c83d";
const MARKER = "372499";

type LivePrice = {
  price: number;
  airline: string;
  departure_at: string;
  link: string;
  transfers: number;
};

const fetchLivePrices = createServerFn({ method: "GET" }).handler(async () => {
  const origins = [...new Set(FLIGHT_ROUTES.map((r) => r.fromCode))];
  const prices: Record<string, LivePrice> = {};

  await Promise.all(
    origins.map(async (origin) => {
      try {
        const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&currency=rub&one_way=true&unique=true&sorting=price&limit=50&token=${TOKEN}`;
        const res = await fetch(url, {
          headers: {
            "X-Access-Token": TOKEN,
            "Accept-Encoding": "gzip, deflate",
          },
          signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) return;
        const json = await res.json();
        if (!json.success || !Array.isArray(json.data)) return;
        for (const item of json.data) {
          const key = `${item.origin}-${item.destination}`;
          if (!prices[key] || item.price < prices[key].price) {
            prices[key] = {
              price: item.price,
              airline: item.airline,
              departure_at: item.departure_at,
              link: item.link,
              transfers: item.transfers,
            };
          }
        }
      } catch {
        // fallback to static on error
      }
    }),
  );

  return prices;
});

function affiliateLink(path: string) {
  const base = "https://www.aviasales.ru";
  const sep = path.includes("?") ? "&" : "?";
  return `${base}${path}${sep}marker=${MARKER}`;
}

export const Route = createFileRoute("/aviabilety/")({
  head: () => ({
    meta: [
      { title: "Авиабилеты — популярные направления из России | JetSale" },
      { name: "description", content: "Дешёвые авиабилеты по популярным направлениям: Москва-Стамбул, Москва-Дубай, СПб-Ереван и другие. Цены от 9 800 ₽." },
      { property: "og:title", content: "Авиабилеты — JetSale" },
      { property: "og:url", content: "/aviabilety" },
    ],
    links: [{ rel: "canonical", href: "/aviabilety" }],
  }),
  loader: () => fetchLivePrices(),
  component: function AviabiLetyPage() {
    const prices = Route.useLoaderData();

    const routes = FLIGHT_ROUTES.map((r) => {
      const key = `${r.fromCode}-${r.toCode}`;
      const live = prices[key];
      return {
        ...r,
        minPrice: live ? live.price : r.minPrice,
        isLive: !!live,
        transfers: live?.transfers ?? 0,
        departureAt: live?.departure_at ?? null,
        affiliateHref: live?.link ? affiliateLink(live.link) : null,
      };
    });

    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-10 md:px-6 md:py-16">
          <h1 className="font-display text-3xl font-bold md:text-5xl">Популярные направления</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Сравните цены и расписания. {FLIGHT_ROUTES.length} прямых маршрутов из России.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((r) => {
              const card = (
                <div className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ocean/40 hover:shadow-soft">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{r.fromCode}</span>
                    <ArrowRight className="h-4 w-4 text-ocean" />
                    <span>{r.toCode}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold">
                    {r.from} — {r.to}
                  </h2>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {r.durationHours} ч в пути · {r.flightsPerWeek} рейсов в неделю
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-ocean">от {r.minPrice.toLocaleString("ru-RU")} ₽</span>
                    {r.isLive && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                        {r.transfers === 0 ? "прямой" : `${r.transfers} пересадка`}
                      </span>
                    )}
                    {r.affiliateHref && <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />}
                  </div>
                  {r.departureAt && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      вылет {new Date(r.departureAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                    </div>
                  )}
                </div>
              );

              return r.affiliateHref ? (
                <a
                  key={r.slug}
                  href={r.affiliateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              ) : (
                <Link
                  key={r.slug}
                  to="/aviabilety/$route"
                  params={{ route: r.slug }}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  },
});
