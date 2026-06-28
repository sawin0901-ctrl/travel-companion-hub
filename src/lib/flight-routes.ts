export type FlightRoute = {
  slug: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  fromCity: string;
  toCity: string;
  country: string;
  durationHours: number;
  minPrice: number;
  airlines: string[];
  flightsPerWeek: number;
  bestMonths: string;
  intro: string;
};

export const FLIGHT_ROUTES: FlightRoute[] = [
  {
    slug: "moskva-stambul",
    from: "Москва",
    to: "Стамбул",
    fromCode: "MOW",
    toCode: "IST",
    fromCity: "Москва",
    toCity: "Стамбул",
    country: "Турция",
    durationHours: 3.5,
    minPrice: 14900,
    airlines: ["Turkish Airlines", "Аэрофлот", "Pegasus", "AZAL"],
    flightsPerWeek: 84,
    bestMonths: "март, апрель, октябрь, ноябрь",
    intro:
      "Прямые рейсы Москва — Стамбул выполняют 4 авиакомпании, до 12 рейсов в день. Среднее время в воздухе — 3 ч 30 мин.",
  },
  {
    slug: "moskva-dubai",
    from: "Москва",
    to: "Дубай",
    fromCode: "MOW",
    toCode: "DXB",
    fromCity: "Москва",
    toCity: "Дубай",
    country: "ОАЭ",
    durationHours: 5.5,
    minPrice: 24800,
    airlines: ["Emirates", "flydubai", "Аэрофлот", "S7"],
    flightsPerWeek: 56,
    bestMonths: "ноябрь — март",
    intro:
      "До 8 прямых рейсов в день из Шереметьево и Домодедово. Emirates выполняет рейсы на A380.",
  },
  {
    slug: "spb-stambul",
    from: "Санкт-Петербург",
    to: "Стамбул",
    fromCode: "LED",
    toCode: "IST",
    fromCity: "Санкт-Петербург",
    toCity: "Стамбул",
    country: "Турция",
    durationHours: 3.8,
    minPrice: 16400,
    airlines: ["Turkish Airlines", "Pegasus"],
    flightsPerWeek: 28,
    bestMonths: "май, сентябрь",
    intro:
      "Прямые рейсы из Пулково ежедневно. Turkish даёт стыковки в 120 городов мира через Стамбул.",
  },
  {
    slug: "moskva-tbilisi",
    from: "Москва",
    to: "Тбилиси",
    fromCode: "MOW",
    toCode: "TBS",
    fromCity: "Москва",
    toCity: "Тбилиси",
    country: "Грузия",
    durationHours: 3,
    minPrice: 11400,
    airlines: ["Red Wings", "Georgian Airways", "Azimuth"],
    flightsPerWeek: 35,
    bestMonths: "май, июнь, сентябрь",
    intro:
      "Прямое сообщение возобновлено в 2023 году. До 5 рейсов в день из Внуково и Жуковского.",
  },
  {
    slug: "moskva-erevan",
    from: "Москва",
    to: "Ереван",
    fromCode: "MOW",
    toCode: "EVN",
    fromCity: "Москва",
    toCity: "Ереван",
    country: "Армения",
    durationHours: 2.8,
    minPrice: 9800,
    airlines: ["Аэрофлот", "FlyOne Armenia", "Red Wings"],
    flightsPerWeek: 70,
    bestMonths: "круглый год",
    intro:
      "Безвизовая Армения с прямыми рейсами 10 раз в день. Внутренний рейс — летите по российскому паспорту.",
  },
  {
    slug: "sochi-stambul",
    from: "Сочи",
    to: "Стамбул",
    fromCode: "AER",
    toCode: "IST",
    fromCity: "Сочи",
    toCity: "Стамбул",
    country: "Турция",
    durationHours: 2.5,
    minPrice: 12200,
    airlines: ["Turkish Airlines", "Pegasus"],
    flightsPerWeek: 14,
    bestMonths: "апрель — июнь",
    intro:
      "Самый короткий международный перелёт с юга России — 2 ч 30 мин. Удобная пересадка в 120 городов мира.",
  },
  {
    slug: "moskva-pukhet",
    from: "Москва",
    to: "Пхукет",
    fromCode: "MOW",
    toCode: "HKT",
    fromCity: "Москва",
    toCity: "Пхукет",
    country: "Таиланд",
    durationHours: 10.5,
    minPrice: 38200,
    airlines: ["Аэрофлот", "Nordwind", "S7"],
    flightsPerWeek: 21,
    bestMonths: "ноябрь — март",
    intro:
      "Прямые рейсы 3 раза в день в высокий сезон. Полёт около 10 ч на Boeing 777 и A330.",
  },
  {
    slug: "kazan-stambul",
    from: "Казань",
    to: "Стамбул",
    fromCode: "KZN",
    toCode: "IST",
    fromCity: "Казань",
    toCity: "Стамбул",
    country: "Турция",
    durationHours: 3.2,
    minPrice: 13500,
    airlines: ["Turkish Airlines", "Pegasus"],
    flightsPerWeek: 21,
    bestMonths: "май, сентябрь",
    intro:
      "Прямые рейсы Turkish Airlines и Pegasus 3 раза в неделю каждая. Аэропорт Казань — современный терминал.",
  },
];

export function getRoute(slug: string): FlightRoute | undefined {
  return FLIGHT_ROUTES.find((r) => r.slug === slug);
}