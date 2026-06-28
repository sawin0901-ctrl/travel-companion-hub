import { useState, useEffect } from "react";
import { ArrowLeftRight, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CityInput } from "./CityInput";

const MARKER = "372499";

function extractIata(v: string): string {
  const m = v.match(/\(([A-Z]{3})\)/);
  if (m) return m[1];
  const t = v.trim().toUpperCase();
  if (/^[A-Z]{3}$/.test(t)) return t;
  return "";
}

function ddmm(iso: string): string {
  if (!iso) return "";
  const [, mo, d] = iso.split("-");
  return `${d}${mo}`;
}

function buildUrl(orig: string, dest: string, dep: string, ret: string, adults: number): string {
  const o = extractIata(orig);
  const d = extractIata(dest);
  if (!o || !d || !dep) return "";
  let path = `/${o}${ddmm(dep)}${d}${adults}`;
  if (ret) path += `${ddmm(ret)}${o}${adults}`;
  return `https://www.aviasales.ru/search${path}?marker=${MARKER}`;
}

function ruDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("ru-RU", {
      day: "numeric", month: "short", weekday: "short",
    });
  } catch { return iso; }
}

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function plusDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function DateField({
  label, value, onChange, min, className,
}: {
  label: string; value: string; onChange: (v: string) => void; min?: string; className?: string;
}) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors hover:border-ocean/40 focus-within:border-ocean focus-within:bg-background",
        className,
      )}
    >
      <span className="pointer-events-none text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="pointer-events-none h-7 text-base font-medium leading-7">
        {value
          ? ruDate(value)
          : <span className="text-muted-foreground/50">Выберите дату</span>}
      </span>
      <input
        type="date"
        value={value}
        min={min ?? todayIso()}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [dep, setDep] = useState(plusDays(14));
  const [ret, setRet] = useState(plusDays(21));
  const [adults, setAdults] = useState(1);
  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [cabinClass, setCabinClass] = useState<"economy" | "business">("economy");

  useEffect(() => {
    fetch("/api/whereami")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.name && d?.iata) setOrigin(`${d.name} (${d.iata})`); })
      .catch(() => {});
  }, []);

  const swap = () => { setOrigin(dest); setDest(origin); };

  const search = () => {
    const url = buildUrl(origin, dest, dep, tripType === "round" ? ret : "", adults);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const canSearch = !!extractIata(origin) && !!extractIata(dest) && !!dep;

  return (
    <div className="space-y-3">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        {[{ v: "round", l: "Туда-обратно" }, { v: "one", l: "В одну сторону" }].map((o) => (
          <button
            key={o.v}
            onClick={() => setTripType(o.v as "round" | "one")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
              tripType === o.v
                ? "bg-ocean/15 text-ocean ring-1 ring-ocean/30"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.l}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <button
            onClick={() => setAdults(Math.max(1, adults - 1))}
            className="px-1 text-muted-foreground hover:text-foreground"
          >−</button>
          <span className="w-4 text-center tabular-nums">{adults}</span>
          <button
            onClick={() => setAdults(Math.min(9, adults + 1))}
            className="px-1 text-muted-foreground hover:text-foreground"
          >+</button>
          <span className="ml-1 text-muted-foreground">
            {adults} {plural(adults, "пассажир", "пассажира", "пассажиров")}
          </span>
          <span className="mx-1 text-border">·</span>
          <button
            onClick={() => setCabinClass(cabinClass === "economy" ? "business" : "economy")}
            className="text-muted-foreground hover:text-foreground"
          >
            {cabinClass === "economy" ? "Эконом" : "Бизнес"}
          </button>
        </div>
      </div>

      {/* Search fields */}
      <div
        className={cn(
          "grid gap-2",
          tripType === "round"
            ? "md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto]"
            : "md:grid-cols-[1fr_auto_1fr_1fr_auto]",
        )}
      >
        <CityInput
          label="Откуда"
          placeholder="Город вылета"
          value={origin}
          onChange={setOrigin}
        />

        <button
          onClick={swap}
          className="hidden h-full items-center self-end rounded-xl border border-border bg-background px-2.5 text-muted-foreground transition-all hover:border-ocean/40 hover:text-ocean md:flex"
          title="Поменять местами"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <CityInput
          label="Куда"
          placeholder="Город назначения"
          value={dest}
          onChange={setDest}
        />

        <DateField label="Туда" value={dep} onChange={setDep} />

        {tripType === "round" && (
          <DateField label="Обратно" value={ret} onChange={setRet} min={dep} />
        )}

        <Button
          size="lg"
          className="col-span-full h-12 gap-2 rounded-xl px-7 text-base font-semibold md:col-auto md:h-auto md:self-stretch"
          onClick={search}
          disabled={!canSearch}
        >
          <Search className="h-4 w-4" />
          Найти билеты
        </Button>
      </div>

      <p className="px-1 text-right text-xs text-ocean">Сравниваем 850+ партнёров</p>
    </div>
  );
}
