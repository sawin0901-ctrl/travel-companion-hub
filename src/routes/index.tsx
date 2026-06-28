import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-travel.jpg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SearchPanel } from "@/components/site/SearchPanel";
import {
  PopularDestinations,
  HotDeals,
  Categories,
  PopularCountries,
  Reviews,
  CtaBanner,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JetSale — авиабилеты, отели и жильё по лучшей цене" },
      {
        name: "description",
        content:
          "Сравниваем предложения 850+ партнёров: авиабилеты, отели, квартиры, аренда авто, трансферы и страховки. Бронируйте путешествие в одном месте.",
      },
      { property: "og:title", content: "JetSale — путешествия по лучшей цене" },
      {
        property: "og:description",
        content:
          "Партнёрский маркетплейс путешествий: авиабилеты, отели, жильё, авто, трансферы и страховки. 1.2M объектов в 180 странах.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <PopularDestinations />
        <HotDeals />
        <PopularCountries />
        <Reviews />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="Тропический остров на закате"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/10 to-background" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-background" />

      <div className="container mx-auto px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-3xl text-center [text-shadow:0_2px_18px_rgb(0_0_0/0.55)]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
            ✨ Сравниваем 850+ партнёров одним поиском
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            Найдите идеальное <span className="bg-gradient-to-r from-sky-200 to-coral bg-clip-text text-transparent">путешествие</span> — быстрее и дешевле
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/90 md:text-lg">
            Авиабилеты, отели, квартиры, аренда авто, трансферы и страховки. Одна форма поиска — лучшие цены от Booking, Aviasales, Kiwi, Rentalcars и сотен других партнёров.
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <SearchPanel />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider text-white/85 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
          <span>В партнёрстве с</span>
          <span>Booking</span>
          <span>Aviasales</span>
          <span>Kiwi</span>
          <span>Rentalcars</span>
          <span>Tripster</span>
          <span>Cherehapa</span>
        </div>
      </div>
    </section>
  );
}