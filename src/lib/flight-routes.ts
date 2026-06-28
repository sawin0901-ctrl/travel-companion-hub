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
  // ===== Extended routes (SEO) =====
  fr("moskva-antaliya","Москва","Анталия","MOW","AYT","Турция",3.8,16200,["Turkish Airlines","Pegasus","Аэрофлот","Nordwind"],168,"апрель — октябрь","Главное пляжное направление: до 24 рейсов в день в высокий сезон, 3 ч 48 мин в пути."),
  fr("moskva-sharm","Москва","Шарм-эль-Шейх","MOW","SSH","Египет",4.5,19600,["AZAL","Nordwind","Red Wings"],28,"октябрь — апрель","Прямое сообщение с Шармом — 4 ч 30 мин, до 4 рейсов в день в пик."),
  fr("moskva-hurghada","Москва","Хургада","MOW","HRG","Египет",4.5,18900,["Nordwind","AZUR air","Red Wings"],35,"октябрь — апрель","Чартеры Nordwind и AZUR — основной поток. От 18 900 ₽ туда-обратно в межсезон."),
  fr("moskva-baku","Москва","Баку","MOW","GYD","Азербайджан",3,12400,["AZAL","Аэрофлот","Pobeda"],42,"апрель — октябрь","Безвизовый Азербайджан в 3 ч полёта. До 6 рейсов в день."),
  fr("moskva-almaty","Москва","Алматы","MOW","ALA","Казахстан",4.5,15800,["Air Astana","SCAT","Аэрофлот"],49,"круглый год","Полёты по российскому паспорту, до 7 рейсов в день."),
  fr("moskva-astana","Москва","Астана","MOW","NQZ","Казахстан",3.5,14200,["Air Astana","Аэрофлот","FlyArystan"],35,"май — сентябрь","До 5 прямых рейсов в день в новую столицу Казахстана."),
  fr("moskva-tashkent","Москва","Ташкент","MOW","TAS","Узбекистан",4.5,16700,["Uzbekistan Airways","Аэрофлот","Pobeda"],42,"март — июнь","Прямые рейсы в столицу Узбекистана 6 раз в день."),
  fr("moskva-pekin","Москва","Пекин","MOW","PEK","Китай",7.5,28400,["Air China","Аэрофлот","Hainan"],14,"апрель — октябрь","Прямые рейсы 2 раза в день. С 2024 — безвиз 30 дней."),
  fr("moskva-shanghai","Москва","Шанхай","MOW","PVG","Китай",9,32800,["China Eastern","Аэрофлот"],10,"март — май, сентябрь — ноябрь","Прямой рейс в финансовую столицу Китая. 9 ч в пути на B777."),
  fr("moskva-sanya","Москва","Санья","MOW","SYX","Китай",10,35900,["Hainan Airlines","Nordwind"],7,"ноябрь — март","Прямые чартеры на тропический Хайнань. От 10 ч полёта."),
  fr("moskva-bangkok","Москва","Бангкок","MOW","BKK","Таиланд",9,42100,["Аэрофлот","Nordwind"],14,"ноябрь — март","Прямые рейсы Аэрофлот и Nordwind, до 2 раз в день в сезон."),
  fr("moskva-mahe","Москва","Мале","MOW","MLE","Мальдивы",9,68000,["Аэрофлот","flydubai"],7,"ноябрь — апрель","Прямой рейс Аэрофлот, 1 раз в день. Виллы на воде ждут."),
  fr("moskva-tel-aviv","Москва","Тель-Авив","MOW","TLV","Израиль",4,32400,["Эль Аль","Аэрофлот","Red Wings"],21,"октябрь — май","Прямые рейсы в обе стороны, 3 авиакомпании, до 3 раз в день."),
  fr("moskva-erevan-tbilisi","Москва","Минск","MOW","MSQ","Беларусь",1.5,7800,["Belavia","Аэрофлот","Pobeda"],49,"круглый год","Самый дешёвый зарубежный рейс — от 7 800 ₽ туда-обратно."),
  fr("moskva-bishkek","Москва","Бишкек","MOW","FRU","Киргизия",4,16400,["Аэрофлот","Avia Traffic","Pobeda"],28,"апрель — октябрь","Безвизовое направление по внутреннему паспорту, до 4 рейсов в день."),
  fr("moskva-belgrad","Москва","Белград","MOW","BEG","Сербия",3.5,19800,["Air Serbia","Аэрофлот"],14,"апрель — октябрь","Главный шенген-хаб для россиян. До 2 рейсов в день Air Serbia."),
  fr("moskva-podgorica","Москва","Подгорица","MOW","TGD","Черногория",3.8,24600,["Аэрофлот","Air Montenegro"],10,"июнь — сентябрь","Прямые рейсы только летом. Адриатика без визы и шенгена."),
  fr("moskva-mahachkala","Москва","Махачкала","MOW","MCX","Россия",2.5,5600,["Pobeda","Smartavia","Аэрофлот"],84,"круглый год","Внутренний рейс в Дагестан: горы, Каспий, древний Дербент."),
  fr("spb-dubai","Санкт-Петербург","Дубай","LED","DXB","ОАЭ",6,26900,["Emirates","Аэрофлот","flydubai"],28,"ноябрь — март","Прямые рейсы из Пулково, 4 раза в день."),
  fr("ekaterinburg-antaliya","Екатеринбург","Анталия","SVX","AYT","Турция",5,18900,["Turkish Airlines","Pegasus","Ural Airlines"],14,"апрель — октябрь","Прямые рейсы Ural Airlines и Turkish 2 раза в день в сезон."),
];

export function getRoute(slug: string): FlightRoute | undefined {
  return FLIGHT_ROUTES.find((r) => r.slug === slug);
}

function fr(
  slug: string, from: string, to: string, fromCode: string, toCode: string,
  country: string, durationHours: number, minPrice: number, airlines: string[],
  flightsPerWeek: number, bestMonths: string, intro: string,
): FlightRoute {
  return { slug, from, to, fromCode, toCode, fromCity: from, toCity: to, country, durationHours, minPrice, airlines, flightsPerWeek, bestMonths, intro };
}