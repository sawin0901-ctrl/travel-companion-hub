import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plane, Filter, ArrowRight, Luggage, Clock, Star, ChevronDown, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flights")({
  head: () => ({
    meta: [
      { title: "Авиабилеты Москва → Стамбул — JetSale" },
      { name: "description", content: "Сравните цены на авиабилеты от ведущих авиакомпаний и партнёров. Прямые рейсы, с пересадками, гибкие даты." },
      { property: "og:title", content: "Авиабилеты — JetSale" },
      { property: "og:url", content: "/flights" },
    ],
    links: [{ rel: "canonical", href: "/flights" }],
  }),
  component: FlightsPage,
});

type Flight = {
  id: string;
  airline: string;
  logo: string;
  depart: string;
  arrive: string;
  from: string;
  to: string;
  duration: string;
  stops: number;
  baggage: boolean;
  price: number;
  partner: string;
  rating: number;
};

const FLIGHTS: Flight[] = [
  { id: "1", airline: "Turkish Airlines", logo: "🇹🇷", depart: "06:40", arrive: "10:15", from: "SVO", to: "IST", duration: "3ч 35м", stops: 0, baggage: true, price: 12480, partner: "Aviasales", rating: 8.9 },
  { id: "2", airline: "Pegasus", logo: "✈️", depart: "08:10", arrive: "11:55", from: "VKO", to: "SAW", duration: "3ч 45м", stops: 0, baggage: false, price: 9870, partner: "Kiwi", rating: 8.1 },
  { id: "3", airline: "Аэрофлот", logo: "🛫", depart: "11:25", arrive: "15:00", from: "SVO", to: "IST", duration: "3ч 35м", stops: 0, baggage: true, price: 14320, partner: "Aviasales", rating: 9.1 },
  { id: "4", airline: "Qatar Airways", logo: "🇶🇦", depart: "13:50", arrive: "23:40", from: "DME", to: "IST", duration: "9ч 50м", stops: 1, baggage: true, price: 18200, partner: "Trip.com", rating: 9.4 },
  { id: "5", airline: "Air Arabia", logo: "🇦🇪", depart: "19:10", arrive: "05:30+1", from: "DME", to: "IST", duration: "10ч 20м", stops: 1, baggage: false, price: 8990, partner: "Kiwi", rating: 7.8 },
  { id: "6", airline: "Lufthansa", logo: "🇩🇪", depart: "07:55", arrive: "16:20", from: "SVO", to: "IST", duration: "8ч 25м", stops: 1, baggage: true, price: 21450, partner: "Booking", rating: 9.2 },
  { id: "7", airline: "Wizz Air", logo: "💜", depart: "14:30", arrive: "18:00", from: "VKO", to: "SAW", duration: "3ч 30м", stops: 0, baggage: false, price: 7990, partner: "Kiwi", rating: 7.6 },
  { id: "8", airline: "Emirates", logo: "🇦🇪", depart: "22:10", arrive: "08:55+1", from: "DME", to: "IST", duration: "10ч 45м", stops: 1, baggage: true, price: 24800, partner: "Aviasales", rating: 9.5 },
];

const AIRLINES = Array.from(new Set(FLIGHTS.map((f) => f.airline)));

type SortKey = "price" | "duration" | "departure" | "rating";

function FlightsPage() {
  const [priceMax, setPriceMax] = useState(25000);
  const [maxStops, setMaxStops] = useState<0 | 1 | 2>(2);
  const [baggageOnly, setBaggageOnly] = useState(false);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("price");

  const flights = useMemo(() => {
    const filtered = FLIGHTS.filter((f) => f.price <= priceMax)
      .filter((f) => f.stops <= maxStops)
      .filter((f) => (baggageOnly ? f.baggage : true))
      .filter((f) => (airlines.length ? airlines.includes(f.airline) : true));
    const sorters: Record<SortKey, (a: Flight, b: Flight) => number> = {
      price: (a, b) => a.price - b.price,
      duration: (a, b) =>
        parseInt(a.duration) * 60 + (parseInt(a.duration.split("ч")[1]) || 0) -
        (parseInt(b.duration) * 60 + (parseInt(b.duration.split("ч")[1]) || 0)),
      departure: (a, b) => a.depart.localeCompare(b.depart),
      rating: (a, b) => b.rating - a.rating,
    };
    return [...filtered].sort(sorters[sort]);
  }, [priceMax, maxStops, baggageOnly, airlines, sort]);

  return (
    <div className="min-h-screen bg-muted/30">
      <SiteHeader />
      <SearchSummary />

      <div className="container mx-auto grid gap-6 px-4 py-6 md:grid-cols-[280px_1fr] md:px-6 md:py-8">
        <div className="hidden md:block">
          <FlightFilters
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            maxStops={maxStops}
            setMaxStops={setMaxStops}
            baggageOnly={baggageOnly}
            setBaggageOnly={setBaggageOnly}
            airlines={airlines}
            setAirlines={setAirlines}
          />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" /> Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FlightFilters
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          maxStops={maxStops}
          setMaxStops={setMaxStops}
          baggageOnly={baggageOnly}
          setBaggageOnly={setBaggageOnly}
          airlines={airlines}
          setAirlines={setAirlines}
        />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <ResultsToolbar count={flights.length} sort={sort} setSort={setSort} kind="перелётов" />
          <div className="mt-4 space-y-3">
            {flights.map((f) => (
              <FlightCard key={f.id} f={f} />
            ))}
            {flights.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
                Ничего не найдено. Попробуйте ослабить фильтры.
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function SearchSummary() {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-5 md:px-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← На главную</Link>
        <div className="ml-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span>Москва (MOW)</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span>Стамбул (IST)</span>
          <span className="text-muted-foreground font-normal">· 20 авг · 1 пассажир · эконом</span>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">Изменить</Button>
      </div>
    </div>
  );
}

export function ResultsToolbar({
  count,
  sort,
  setSort,
  kind,
}: {
  count: number;
  sort: string;
  setSort: (v: never) => void;
  kind: string;
}) {
  const options =
    kind === "перелётов"
      ? [
          { v: "price", l: "По цене" },
          { v: "duration", l: "По длительности" },
          { v: "departure", l: "По времени вылета" },
          { v: "rating", l: "По рейтингу" },
        ]
      : [
          { v: "price", l: "По цене" },
          { v: "rating", l: "По рейтингу" },
          { v: "distance", l: "По удалённости от центра" },
        ];
  return (
    <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium">
        Найдено <span className="font-bold">{count}</span> {kind}
      </p>
      <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto rounded-xl bg-muted/60 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => setSort(o.v as never)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all",
              sort === o.v
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 font-display text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function FlightFilters(props: {
  priceMax: number;
  setPriceMax: (v: number) => void;
  maxStops: 0 | 1 | 2;
  setMaxStops: (v: 0 | 1 | 2) => void;
  baggageOnly: boolean;
  setBaggageOnly: (v: boolean) => void;
  airlines: string[];
  setAirlines: (v: string[]) => void;
}) {
  const toggleAirline = (a: string) =>
    props.setAirlines(
      props.airlines.includes(a) ? props.airlines.filter((x) => x !== a) : [...props.airlines, a],
    );
  const hasFilters =
    props.priceMax < 25000 || props.maxStops !== 2 || props.baggageOnly || props.airlines.length > 0;

  return (
    <aside className="space-y-3 md:sticky md:top-20 md:self-start">
      <div className="flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <Filter className="h-4 w-4" /> Фильтры
        </h2>
        {hasFilters && (
          <button
            onClick={() => {
              props.setPriceMax(25000);
              props.setMaxStops(2);
              props.setBaggageOnly(false);
              props.setAirlines([]);
            }}
            className="inline-flex items-center gap-1 text-xs text-coral hover:underline"
          >
            <X className="h-3 w-3" /> Сбросить
          </button>
        )}
      </div>

      <FilterCard title="Цена за билет">
        <Slider
          min={5000}
          max={25000}
          step={500}
          value={[props.priceMax]}
          onValueChange={(v) => props.setPriceMax(v[0])}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>5 000 ₽</span>
          <span className="font-semibold text-foreground">до {props.priceMax.toLocaleString("ru")} ₽</span>
        </div>
      </FilterCard>

      <FilterCard title="Пересадки">
        <div className="space-y-2">
          {[
            { v: 0 as const, l: "Только прямые" },
            { v: 1 as const, l: "До 1 пересадки" },
            { v: 2 as const, l: "Любое количество" },
          ].map((o) => (
            <label key={o.v} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
              <input
                type="radio"
                name="stops"
                checked={props.maxStops === o.v}
                onChange={() => props.setMaxStops(o.v)}
                className="accent-ocean"
              />
              {o.l}
            </label>
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Багаж">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <Checkbox checked={props.baggageOnly} onCheckedChange={(v) => props.setBaggageOnly(!!v)} />
          Только с багажом
        </label>
      </FilterCard>

      <FilterCard title="Авиакомпания">
        <div className="space-y-2">
          {AIRLINES.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-3 text-sm">
              <Checkbox checked={props.airlines.includes(a)} onCheckedChange={() => toggleAirline(a)} />
              <span className="flex-1">{a}</span>
            </label>
          ))}
        </div>
      </FilterCard>
    </aside>
  );
}

function FlightCard({ f }: { f: Flight }) {
  return (
    <article className="group grid gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-soft sm:p-5 md:grid-cols-[1fr_auto] md:gap-8 md:p-6">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-xl sm:h-12 sm:w-12 sm:text-2xl">
          {f.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="font-display text-lg font-bold tabular-nums sm:text-2xl">{f.depart}</span>
              <span className="text-xs text-muted-foreground sm:text-sm">{f.from}</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-2 sm:px-4">
              <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                <Clock className="h-3 w-3" /> {f.duration}
              </span>
              <div className="relative my-1 h-px w-full bg-border">
                <Plane className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-90 text-ocean" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground sm:text-[11px]">
                {f.stops === 0 ? "Прямой" : `${f.stops} пересадка`}
              </span>
            </div>
            <div className="flex flex-col text-right sm:flex-row sm:items-baseline sm:gap-2 sm:text-left">
              <span className="font-display text-lg font-bold tabular-nums sm:text-2xl">{f.arrive}</span>
              <span className="text-xs text-muted-foreground sm:text-sm">{f.to}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{f.airline}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-coral text-coral" /> {f.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Luggage className={cn("h-3.5 w-3.5", f.baggage ? "text-emerald-600" : "text-muted-foreground/50")} />
              {f.baggage ? "Багаж включён" : "Только ручная кладь"}
            </span>
            <span>· через {f.partner}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border pt-4 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div className="md:text-right">
          <div className="font-display text-2xl font-bold">{f.price.toLocaleString("ru")} ₽</div>
          <div className="text-xs text-muted-foreground">за 1 пассажира</div>
        </div>
        <Button className="gap-1.5">
          К покупке <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
      </div>
    </article>
  );
}