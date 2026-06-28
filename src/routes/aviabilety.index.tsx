import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FLIGHT_ROUTES } from "@/lib/flight-routes";
import { ArrowRight } from "lucide-react";

const AVIASALES_TOKEN = "f587ed2905dd3411c38e95fd0ce2c83d";

const fetchPrices = createServerFn({ method: "GET" }).handler(async () => {
  const origins = [...new Set(FLIGHT_ROUTES.map((r) => r.fromCode))];
  const prices: Record<string, number> = {};

  await Promise.all(
    origins.map(async (origin) => {
      try {
        const res = await fetch(
          `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&currency=rub&token=${AVIASALES_TOKEN}`,
          { signal: AbortSignal.timeout(5000) },
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!json.success || !json.data) return;
        for (const [dest, info] of Object.entries(json.data as Record<string, { price: number }>)) {
          const key = `${origin}-${dest}`;
          prices[key] = info.price;
        }
      } catch {
        // fallback to static prices on error
      }
    }),
  );

  return prices;
});

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
  loader: () => fetchPrices(),
  component: function AviabiLetyPage() {
    const prices = Route.useLoaderData();

    const routes = FLIGHT_ROUTES.map((r) => {
      const key = `${r.fromCode}-${r.toCode}`;
      const livePrice = prices[key];
      return { ...r, minPrice: livePrice ?? r.minPrice, isLive: !!livePrice };
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
            {routes.map((r) => (
              <Link
                key={r.slug}
                to="/aviabilety/$route"
                params={{ route: r.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ocean/40 hover:shadow-soft"
              >
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
                    <span className="text-xs text-emerald-500">live</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  },
});
