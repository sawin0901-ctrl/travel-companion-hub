import { Star, Flame, TrendingDown, Sparkles, Plane, MapPin, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_CATEGORIES, useEnabledCategories } from "@/lib/categories";
import santorini from "@/assets/dest-santorini.jpg";
import bali from "@/assets/dest-bali.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import paris from "@/assets/dest-paris.jpg";
import tokyo from "@/assets/dest-tokyo.jpg";

const destinations = [
  { name: "Санторини", country: "Греция", price: "от 18 400 ₽", img: santorini, tag: "Острова" },
  { name: "Бали", country: "Индонезия", price: "от 42 900 ₽", img: bali, tag: "Тропики" },
  { name: "Дубай", country: "ОАЭ", price: "от 23 100 ₽", img: dubai, tag: "Город" },
  { name: "Мальдивы", country: "Мальдивы", price: "от 58 700 ₽", img: maldives, tag: "Премиум" },
  { name: "Париж", country: "Франция", price: "от 19 800 ₽", img: paris, tag: "Европа" },
  { name: "Токио", country: "Япония", price: "от 49 200 ₽", img: tokyo, tag: "Азия" },
];

export function PopularDestinations() {
  return (
    <section id="oteli" className="container mx-auto px-4 py-14 md:px-6 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Лучшее этим летом
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
            Популярные направления
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Тысячи путешественников выбирают эти места прямо сейчас. Цены обновляются каждые 10 минут.
          </p>
        </div>
        <Button variant="ghost" className="hidden md:inline-flex">Все направления →</Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <a
            key={d.name}
            href="#"
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-card"
          >
            <img
              src={d.img}
              alt={`${d.name}, ${d.country}`}
              loading="lazy"
              width={800}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
              <MapPin className="h-3 w-3" /> {d.tag}
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
              <div>
                <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                <p className="text-sm text-white/80">{d.country}</p>
              </div>
              <div className="rounded-2xl bg-white/15 px-3 py-2 text-right text-sm font-semibold backdrop-blur-md">
                <div className="text-[10px] font-medium uppercase tracking-wider text-white/70">Перелёт</div>
                {d.price}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const hotDeals = [
  { route: "Москва → Дубай", airline: "Emirates", date: "12 авг · прямой", price: "14 320 ₽", drop: "−38%" },
  { route: "Москва → Стамбул", airline: "Turkish Airlines", date: "20 авг · прямой", price: "9 870 ₽", drop: "−24%" },
  { route: "СПб → Ереван", airline: "Аэрофлот", date: "5 сен · 1 пересадка", price: "12 450 ₽", drop: "−31%" },
  { route: "Москва → Бангкок", airline: "Qatar Airways", date: "18 сен · 1 пересадка", price: "38 900 ₽", drop: "−19%" },
  { route: "Москва → Тбилиси", airline: "Georgian Airways", date: "1 окт · прямой", price: "11 200 ₽", drop: "−27%" },
  { route: "Казань → Анталья", airline: "Pegasus", date: "9 авг · прямой", price: "13 700 ₽", drop: "−22%" },
];

export function HotDeals() {
  return (
    <section id="aviabilety" className="bg-card py-14 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">
              <Flame className="h-3.5 w-3.5" /> Горящие предложения
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
              Авиабилеты <span className="text-gradient-ocean">по лучшей цене</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Алгоритм отслеживает падение цен 24/7. Бронируйте, пока другие ищут.
            </p>
          </div>
          <Button variant="outline">Все горящие билеты</Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotDeals.map((d) => (
            <div
              key={d.route}
              className="group flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-soft"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Plane className="h-3.5 w-3.5" />
                  {d.airline}
                </div>
                <h3 className="mt-1 truncate font-display text-lg font-semibold">{d.route}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{d.date}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 rounded-full bg-coral/10 px-2 py-0.5 text-[11px] font-bold text-coral">
                  <TrendingDown className="h-3 w-3" /> {d.drop}
                </div>
                <div className="mt-1 font-display text-xl font-bold">{d.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  const enabled = useEnabledCategories();
  const categories = ALL_CATEGORIES.filter((c) => enabled[c.id]);

  if (categories.length === 0) return null;

  return (
    <section id="zhile" className="container mx-auto px-4 py-14 md:px-6 md:py-28">
      <div className="max-w-2xl">
        <h2 className="text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
          Всё для путешествия в одном месте
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Сравнивайте цены и бронируйте у проверенных партнёров — Booking, Aviasales, Kiwi, Rentalcars и других.
        </p>
      </div>

      <div
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5"
        style={{
          gridTemplateColumns: undefined,
        }}
      >
        {/* On lg+, fit all enabled categories on a single row (no empty cells) */}
        <style>{`
          @media (min-width: 1024px) {
            .jetsale-cats { grid-template-columns: repeat(${Math.min(
              Math.max(categories.length, 1),
              8,
            )}, minmax(0, 1fr)); }
          }
        `}</style>
      </div>
      <div className="jetsale-cats mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.id}
              href="#"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ocean/40 hover:shadow-soft"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display font-semibold">{c.label}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.caption}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

const countries = [
  { name: "Турция", emoji: "🇹🇷", count: "12 480 отелей" },
  { name: "ОАЭ", emoji: "🇦🇪", count: "5 230 отелей" },
  { name: "Грузия", emoji: "🇬🇪", count: "8 110 отелей" },
  { name: "Таиланд", emoji: "🇹🇭", count: "14 670 отелей" },
  { name: "Италия", emoji: "🇮🇹", count: "22 400 отелей" },
  { name: "Испания", emoji: "🇪🇸", count: "19 850 отелей" },
  { name: "Греция", emoji: "🇬🇷", count: "11 320 отелей" },
  { name: "Япония", emoji: "🇯🇵", count: "9 740 отелей" },
  { name: "Армения", emoji: "🇦🇲", count: "1 980 отелей" },
  { name: "Кипр", emoji: "🇨🇾", count: "3 410 отелей" },
  { name: "Вьетнам", emoji: "🇻🇳", count: "6 290 отелей" },
  { name: "Египет", emoji: "🇪🇬", count: "4 680 отелей" },
];

export function PopularCountries() {
  return (
    <section id="tury" className="bg-card py-14 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl md:text-5xl">Популярные страны</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Куда летят россияне прямо сейчас — статистика обновляется ежедневно.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {countries.map((c) => (
            <a
              key={c.name}
              href="#"
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-ocean/40"
            >
              <span className="text-3xl leading-none">{c.emoji}</span>
              <div>
                <div className="font-display font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.count}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Анна Соколова",
    place: "Бронировала отель на Бали",
    rating: 5,
    text: "Нашла идеальную виллу на 30% дешевле, чем на Booking напрямую. Сравнение партнёров — топ. Буду пользоваться постоянно.",
  },
  {
    name: "Дмитрий Орлов",
    place: "Авиабилеты Москва — Тбилиси",
    rating: 5,
    text: "Уведомление о падении цены пришло вовремя — сэкономил 6 000 ₽. Интерфейс приятный, всё понятно с первого взгляда.",
  },
  {
    name: "Карина Меликян",
    place: "Аренда авто в Анталье",
    rating: 5,
    text: "Забронировала машину за 5 минут. На месте всё подтвердилось без сюрпризов, цена в чеке совпала с сайтом до копейки.",
  },
];

export function Reviews() {
  return (
    <section id="blog" className="container mx-auto px-4 py-14 md:px-6 md:py-28">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          <Heart className="h-3.5 w-3.5 text-coral" /> 4.9 из 5 · 28 400 отзывов
        </span>
        <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
          Что говорят путешественники
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="relative rounded-3xl border border-border bg-card p-7 shadow-card"
          >
            <Quote className="h-7 w-7 text-ocean/30" />
            <blockquote className="mt-3 text-[15px] leading-relaxed text-foreground/90">
              {r.text}
            </blockquote>
            <div className="mt-6 flex items-center justify-between">
              <figcaption>
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.place}</div>
              </figcaption>
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-coral text-coral" />
                ))}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section id="avto" className="container mx-auto px-4 pb-16 md:px-6 md:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] gradient-ocean px-6 py-10 text-ocean-foreground sm:px-8 sm:py-14 md:px-16 md:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Промокод WANDER10
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              −10% на первое бронирование жилья
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              Зарегистрируйтесь, чтобы сохранять избранное, следить за ценами и получать персональные подборки.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-ocean hover:bg-white/90">
                Создать аккаунт
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/15 hover:text-white">
                Узнать больше
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: "850+", l: "партнёров" },
              { v: "1.2M", l: "объектов" },
              { v: "180", l: "стран" },
              { v: "24/7", l: "поддержка" },
              { v: "4.9★", l: "рейтинг" },
              { v: "0 ₽", l: "комиссия" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 px-3 py-5 backdrop-blur">
                <div className="font-display text-2xl font-bold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}