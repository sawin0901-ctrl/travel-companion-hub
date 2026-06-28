import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Filter, Star, Heart, Wifi, UtensilsCrossed, Waves, ParkingCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ResultsToolbar } from "./flights";
import { cn } from "@/lib/utils";
import santorini from "@/assets/dest-santorini.jpg";
import bali from "@/assets/dest-bali.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import paris from "@/assets/dest-paris.jpg";
import tokyo from "@/assets/dest-tokyo.jpg";

export const Route = createFileRoute("/hotels")({
  head: () => ({
    meta: [
      { title: "Отели в Дубае — JetSale" },
      { name: "description", content: "1.2 млн отелей по лучшим ценам от Booking, Agoda, Hotels.com и других партнёров." },
      { property: "og:title", content: "Отели — JetSale" },
      { property: "og:url", content: "/hotels" },
    ],
    links: [{ rel: "canonical", href: "/hotels" }],
  }),
  component: HotelsPage,
});

type Hotel = {
  id: string;
  name: string;
  type: string;
  district: string;
  distance: number;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  image: string;
  amenities: string[];
  partner: string;
  badge?: string;
};

const HOTELS: Hotel[] = [
  { id: "1", name: "Atlantis The Palm", type: "Отель", district: "The Palm Jumeirah", distance: 14, stars: 5, rating: 9.2, reviews: 4820, price: 38400, oldPrice: 52000, image: dubai, amenities: ["wifi", "pool", "restaurant", "parking"], partner: "Booking", badge: "−26%" },
  { id: "2", name: "Riad Santorini Sunset", type: "Бутик-отель", district: "Oia", distance: 2, stars: 4, rating: 9.4, reviews: 1240, price: 14800, image: santorini, amenities: ["wifi", "restaurant"], partner: "Agoda" },
  { id: "3", name: "Bali Jungle Villa", type: "Вилла", district: "Ubud", distance: 8, stars: 5, rating: 9.6, reviews: 612, price: 18900, image: bali, amenities: ["wifi", "pool", "parking"], partner: "Booking", badge: "Топ выбор" },
  { id: "4", name: "Overwater Bungalow Resort", type: "Курорт", district: "South Malé Atoll", distance: 22, stars: 5, rating: 9.7, reviews: 980, price: 64200, image: maldives, amenities: ["wifi", "pool", "restaurant"], partner: "Hotels.com" },
  { id: "5", name: "Hôtel Eiffel Trocadéro", type: "Отель", district: "16-й округ", distance: 0.4, stars: 4, rating: 8.9, reviews: 2320, price: 22100, oldPrice: 26500, image: paris, amenities: ["wifi", "restaurant", "parking"], partner: "Booking", badge: "−17%" },
  { id: "6", name: "Shibuya Sky Apartments", type: "Апартаменты", district: "Сибуя", distance: 1.1, stars: 4, rating: 9.0, reviews: 870, price: 16700, image: tokyo, amenities: ["wifi", "parking"], partner: "Airbnb" },
];

const PROPERTY_TYPES = ["Отель", "Апартаменты", "Вилла", "Бутик-отель", "Курорт", "Хостел"];
const AMENITY_LIST = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "pool", label: "Бассейн", icon: Waves },
  { id: "restaurant", label: "Ресторан", icon: UtensilsCrossed },
  { id: "parking", label: "Парковка", icon: ParkingCircle },
] as const;

type SortKey = "price" | "rating" | "distance";

function HotelsPage() {
  const [priceMax, setPriceMax] = useState(70000);
  const [minStars, setMinStars] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("rating");

  const hotels = useMemo(() => {
    const filtered = HOTELS.filter((h) => h.price <= priceMax)
      .filter((h) => h.stars >= minStars)
      .filter((h) => h.rating >= minRating)
      .filter((h) => (types.length ? types.includes(h.type) : true))
      .filter((h) => (amenities.length ? amenities.every((a) => h.amenities.includes(a)) : true));
    const sorters: Record<SortKey, (a: Hotel, b: Hotel) => number> = {
      price: (a, b) => a.price - b.price,
      rating: (a, b) => b.rating - a.rating,
      distance: (a, b) => a.distance - b.distance,
    };
    return [...filtered].sort(sorters[sort]);
  }, [priceMax, minStars, minRating, types, amenities, sort]);

  return (
    <div className="min-h-screen bg-muted/30">
      <SiteHeader />
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-5 md:px-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← На главную</Link>
          <div className="ml-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
            <MapPin className="h-4 w-4 text-ocean" /> Дубай, ОАЭ
            <span className="font-normal text-muted-foreground">· 20–27 авг · 2 гостя · 1 номер</span>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">Изменить</Button>
        </div>
      </div>

      <div className="container mx-auto grid gap-6 px-4 py-8 md:grid-cols-[280px_1fr] md:px-6">
        <HotelFilters
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          minStars={minStars}
          setMinStars={setMinStars}
          minRating={minRating}
          setMinRating={setMinRating}
          types={types}
          setTypes={setTypes}
          amenities={amenities}
          setAmenities={setAmenities}
        />

        <div>
          <ResultsToolbar
            count={hotels.length}
            sort={sort}
            setSort={(v) => setSort(v as SortKey)}
            kind="вариантов жилья"
          />
          <div className="mt-4 space-y-4">
            {hotels.map((h) => (
              <HotelCard key={h.id} h={h} />
            ))}
            {hotels.length === 0 && (
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

function FilterCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 font-display text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function HotelFilters(props: {
  priceMax: number;
  setPriceMax: (v: number) => void;
  minStars: number;
  setMinStars: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  types: string[];
  setTypes: (v: string[]) => void;
  amenities: string[];
  setAmenities: (v: string[]) => void;
}) {
  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const hasFilters =
    props.priceMax < 70000 || props.minStars > 0 || props.minRating > 0 || props.types.length || props.amenities.length;

  return (
    <aside className="space-y-3 md:sticky md:top-20 md:self-start">
      <div className="flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <Filter className="h-4 w-4" /> Фильтры
        </h2>
        {hasFilters && (
          <button
            onClick={() => {
              props.setPriceMax(70000);
              props.setMinStars(0);
              props.setMinRating(0);
              props.setTypes([]);
              props.setAmenities([]);
            }}
            className="inline-flex items-center gap-1 text-xs text-coral hover:underline"
          >
            <X className="h-3 w-3" /> Сбросить
          </button>
        )}
      </div>

      <FilterCard title="Цена за ночь">
        <Slider min={5000} max={70000} step={1000} value={[props.priceMax]} onValueChange={(v) => props.setPriceMax(v[0])} />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>5 000 ₽</span>
          <span className="font-semibold text-foreground">до {props.priceMax.toLocaleString("ru")} ₽</span>
        </div>
      </FilterCard>

      <FilterCard title="Класс отеля">
        <div className="flex gap-1.5">
          {[0, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => props.setMinStars(s)}
              className={cn(
                "flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                props.minStars === s ? "border-ocean bg-ocean text-ocean-foreground" : "border-border hover:border-ocean/40",
              )}
            >
              {s === 0 ? "Любой" : `${s}★+`}
            </button>
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Оценка гостей">
        <Slider min={0} max={10} step={0.5} value={[props.minRating]} onValueChange={(v) => props.setMinRating(v[0])} />
        <div className="mt-3 text-xs text-muted-foreground">
          От <span className="font-semibold text-foreground">{props.minRating.toFixed(1)}</span> / 10
        </div>
      </FilterCard>

      <FilterCard title="Тип жилья">
        <div className="space-y-2">
          {PROPERTY_TYPES.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-3 text-sm">
              <Checkbox checked={props.types.includes(t)} onCheckedChange={() => toggle(props.types, props.setTypes, t)} />
              {t}
            </label>
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Удобства">
        <div className="space-y-2">
          {AMENITY_LIST.map((a) => {
            const Icon = a.icon;
            return (
              <label key={a.id} className="flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox
                  checked={props.amenities.includes(a.id)}
                  onCheckedChange={() => toggle(props.amenities, props.setAmenities, a.id)}
                />
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                {a.label}
              </label>
            );
          })}
        </div>
      </FilterCard>
    </aside>
  );
}

function HotelCard({ h }: { h: Hotel }) {
  const [fav, setFav] = useState(false);
  return (
    <article className="group grid gap-0 overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-soft md:grid-cols-[280px_1fr]">
      <div className="relative aspect-[4/3] md:aspect-auto">
        <img src={h.image} alt={h.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        {h.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-2.5 py-1 text-[11px] font-bold text-coral-foreground">
            {h.badge}
          </span>
        )}
        <button
          onClick={() => setFav(!fav)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={cn("h-4 w-4", fav ? "fill-coral text-coral" : "text-foreground/70")} />
        </button>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:p-6">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>{h.type}</span>
            <span>·</span>
            <div className="flex">
              {Array.from({ length: h.stars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight">{h.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {h.district} · {h.distance} км до центра
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {h.amenities.map((a) => {
              const item = AMENITY_LIST.find((x) => x.id === a);
              if (!item) return null;
              const Icon = item.icon;
              return (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  <Icon className="h-3 w-3" /> {item.label}
                </span>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">через {h.partner}</p>
        </div>
        <div className="flex shrink-0 items-end justify-between gap-3 border-t border-border pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-xl bg-ocean px-2.5 py-1.5 text-sm font-bold text-ocean-foreground">
              {h.rating.toFixed(1)}
              <span className="text-[10px] font-medium opacity-80">{h.reviews} отзывов</span>
            </div>
            <div className="mt-3">
              {h.oldPrice && (
                <div className="text-xs text-muted-foreground line-through">
                  {h.oldPrice.toLocaleString("ru")} ₽
                </div>
              )}
              <div className="font-display text-2xl font-bold">{h.price.toLocaleString("ru")} ₽</div>
              <div className="text-xs text-muted-foreground">за ночь</div>
            </div>
          </div>
          <Button>Забронировать</Button>
        </div>
      </div>
    </article>
  );
}