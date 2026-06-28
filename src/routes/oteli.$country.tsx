import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plane, Wallet, CheckCircle2 } from "lucide-react";
import { DESTINATIONS, getDestination, type Destination } from "@/lib/destinations";

export const Route = createFileRoute("/oteli/$country")({
  loader: ({ params }) => {
    const dest = getDestination(params.country);
    if (!dest) throw notFound();
    return dest;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Направление не найдено" }] };
    const d = loaderData;
    const title = `Отели в ${d.country} ${d.emoji} — ${d.avgHotel} | JetSale`;
    const description = `Бронирование отелей в ${d.country}: ${d.hotels.toLocaleString("ru-RU")} вариантов от ${d.avgHotel}. ${d.visa}. Лучший сезон — ${d.bestSeason}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: d.image },
        { property: "og:url", content: `/oteli/${params.country}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/oteli/${params.country}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: d.country,
            description: d.intro,
            image: d.image,
            touristType: "Семьи, пары, индивидуальные путешественники",
            includesAttraction: d.cities.map((c) => ({ "@type": "TouristAttraction", name: c.name })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: d.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Направление не найдено</h1>
      <Link to="/oteli" className="mt-4 inline-block text-ocean underline">
        Все направления
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Ошибка</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: CountryPage,
});

function CountryPage() {
  const d = Route.useLoaderData() as Destination;
  const others = DESTINATIONS.filter((x) => x.slug !== d.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${d.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative container mx-auto flex h-full flex-col justify-end px-4 pb-10 text-white md:px-6 md:pb-16">
          <nav className="mb-4 flex items-center gap-2 text-xs opacity-80">
            <Link to="/" className="hover:underline">Главная</Link>
            <span>/</span>
            <Link to="/oteli" className="hover:underline">Отели</Link>
            <span>/</span>
            <span>{d.country}</span>
          </nav>
          <div className="flex items-center gap-3 text-sm opacity-90">
            <span className="text-3xl">{d.emoji}</span>
            <span>{d.hotels.toLocaleString("ru-RU")} отелей · {d.visa}</span>
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Отели в {d.country}
          </h1>
          <p className="mt-3 max-w-2xl text-base opacity-90 md:text-lg">{d.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="bg-coral hover:bg-coral/90">
              Найти отель от {d.avgHotel}
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              Авиабилеты
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Quick facts */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Plane, label: "Перелёт", value: d.avgFlight },
            { icon: Wallet, label: "Отель от", value: d.avgHotel },
            { icon: Calendar, label: "Сезон", value: d.bestSeason },
            { icon: MapPin, label: "Валюта", value: d.currency },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-card p-5">
              <f.icon className="h-5 w-5 text-ocean" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
              <div className="mt-1 font-display text-lg font-semibold">{f.value}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Почему {d.country}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cities */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Куда поехать</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.cities.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-soft">
                <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Частые вопросы</h2>
          <div className="mt-6 space-y-3">
            {d.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 transition-shadow open:shadow-soft">
                <summary className="cursor-pointer list-none font-semibold">
                  <span className="float-right text-ocean transition-transform group-open:rotate-45">+</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other destinations */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Похожие направления</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/oteli/$country"
                params={{ country: o.slug }}
                className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-soft"
              >
                <div className="text-2xl">{o.emoji}</div>
                <div className="mt-2 font-display font-semibold">{o.country}</div>
                <div className="text-xs text-muted-foreground">{o.avgHotel}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}