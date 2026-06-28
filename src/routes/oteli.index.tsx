import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DESTINATIONS } from "@/lib/destinations";

export const Route = createFileRoute("/oteli/")({
  head: () => ({
    meta: [
      { title: "Отели по странам — бронирование с кэшбэком | JetSale" },
      { name: "description", content: "Отели в Турции, ОАЭ, Грузии, Таиланде, Италии и Египте. Подбор от партнёров с лучшими ценами в рублях." },
      { property: "og:title", content: "Отели по странам — JetSale" },
      { property: "og:description", content: "Подберите отели в 6 популярных направлениях." },
      { property: "og:url", content: "/oteli" },
    ],
    links: [{ rel: "canonical", href: "/oteli" }],
  }),
  component: OteliIndex,
});

function OteliIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10 md:px-6 md:py-16">
        <h1 className="font-display text-3xl font-bold md:text-5xl">Отели по странам</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Выбирайте направление — мы подберём лучшее жильё от Booking, Ostrovok, Yandex.Travel и Tripster.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              to="/oteli/$country"
              params={{ country: d.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${d.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
                  <span className="text-lg">{d.emoji}</span>
                  <span>{d.hotels.toLocaleString("ru-RU")} отелей</span>
                </div>
                <h2 className="mt-1 font-display text-2xl font-bold">{d.country}</h2>
                <p className="mt-1 text-sm opacity-90">{d.avgHotel}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}