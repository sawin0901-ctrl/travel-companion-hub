import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Clock, Plane, Calendar, TrendingDown } from "lucide-react";
import { FLIGHT_ROUTES, getRoute, type FlightRoute } from "@/lib/flight-routes";
import { getPostsByRoute } from "@/lib/blog-posts";

export const Route = createFileRoute("/aviabilety/$route")({
  loader: ({ params }) => {
    const r = getRoute(params.route);
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Маршрут не найден" }] };
    const r = loaderData;
    const title = `Авиабилеты ${r.from} — ${r.to} от ${r.minPrice.toLocaleString("ru-RU")} ₽ | JetSale`;
    const description = `Дешёвые билеты ${r.from} (${r.fromCode}) — ${r.to} (${r.toCode}). ${r.flightsPerWeek} рейсов в неделю, ${r.durationHours} ч в пути.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/aviabilety/${params.route}` },
      ],
      links: [{ rel: "canonical", href: `/aviabilety/${params.route}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Flight",
            departureAirport: { "@type": "Airport", iataCode: r.fromCode, name: r.fromCity },
            arrivalAirport: { "@type": "Airport", iataCode: r.toCode, name: r.toCity },
            estimatedFlightDuration: `PT${r.durationHours}H`,
            offers: {
              "@type": "Offer",
              price: r.minPrice,
              priceCurrency: "RUB",
              availability: "https://schema.org/InStock",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
              { "@type": "ListItem", position: 2, name: "Авиабилеты", item: "/aviabilety" },
              { "@type": "ListItem", position: 3, name: `${r.from} — ${r.to}`, item: `/aviabilety/${params.route}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Маршрут не найден</h1>
      <Link to="/aviabilety" className="mt-4 inline-block text-ocean underline">
        Все направления
      </Link>
    </div>
  ),
  component: RoutePage,
});

function RoutePage() {
  const r = Route.useLoaderData() as FlightRoute;
  const others = FLIGHT_ROUTES.filter((x) => x.slug !== r.slug).slice(0, 4);
  const posts = getPostsByRoute(r.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-gradient-to-br from-ocean/10 via-background to-coral/5">
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-16">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:underline">Главная</Link>
            <span>/</span>
            <Link to="/aviabilety" className="hover:underline">Авиабилеты</Link>
            <span>/</span>
            <span>{r.from} — {r.to}</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full bg-card px-3 py-1 font-mono">{r.fromCode}</span>
            <Plane className="h-4 w-4 text-ocean" />
            <span className="rounded-full bg-card px-3 py-1 font-mono">{r.toCode}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Авиабилеты {r.from} — {r.to}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{r.intro}</p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Цены от</div>
              <div className="font-display text-4xl font-bold text-ocean">
                {r.minPrice.toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <Button size="lg" className="bg-coral hover:bg-coral/90">
              Найти билеты
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, label: "В пути", value: `${r.durationHours} часов` },
            { icon: Calendar, label: "Рейсов в неделю", value: String(r.flightsPerWeek) },
            { icon: TrendingDown, label: "Лучшие месяцы", value: r.bestMonths },
            { icon: Plane, label: "Авиакомпании", value: `${r.airlines.length}` },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-card p-5">
              <f.icon className="h-5 w-5 text-ocean" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
              <div className="mt-1 font-display text-lg font-semibold">{f.value}</div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Авиакомпании на маршруте</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {r.airlines.map((a) => (
              <span key={a} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                {a}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Другие популярные маршруты</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/aviabilety/$route"
                params={{ route: o.slug }}
                className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-soft"
              >
                <div className="text-xs text-muted-foreground">{o.fromCode} → {o.toCode}</div>
                <div className="mt-2 font-display font-semibold">{o.from} — {o.to}</div>
                <div className="mt-1 text-sm text-ocean">от {o.minPrice.toLocaleString("ru-RU")} ₽</div>
              </Link>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Гайды по маршруту</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-soft"
                >
                  <div className="text-xs uppercase tracking-wider text-ocean">{p.category}</div>
                  <div className="mt-2 font-display font-semibold leading-snug">{p.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}