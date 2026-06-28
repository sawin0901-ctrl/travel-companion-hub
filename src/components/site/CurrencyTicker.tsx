import { useEffect, useMemo, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

type Rate = {
  code: string;
  flag: string;
  name: string;
  value: number;
  delta: number;
};

const BASE: Rate[] = [
  { code: "USD", flag: "🇺🇸", name: "Доллар",  value: 89.42, delta: +0.18 },
  { code: "EUR", flag: "🇪🇺", name: "Евро",    value: 96.71, delta: -0.24 },
  { code: "CNY", flag: "🇨🇳", name: "Юань",    value: 12.31, delta: +0.05 },
  { code: "GBP", flag: "🇬🇧", name: "Фунт",    value: 113.84, delta: +0.42 },
  { code: "AED", flag: "🇦🇪", name: "Дирхам",  value: 24.35, delta: -0.07 },
  { code: "TRY", flag: "🇹🇷", name: "Лира",    value: 2.71,  delta: -0.01 },
  { code: "GEL", flag: "🇬🇪", name: "Лари",    value: 33.04, delta: +0.11 },
  { code: "THB", flag: "🇹🇭", name: "Бат",     value: 2.48,  delta: +0.02 },
  { code: "JPY", flag: "🇯🇵", name: "Иена",    value: 0.57,  delta: -0.003 },
  { code: "KZT", flag: "🇰🇿", name: "Тенге",   value: 0.18,  delta: 0 },
];

function formatRate(v: number) {
  return v.toLocaleString("ru-RU", {
    minimumFractionDigits: v < 1 ? 3 : 2,
    maximumFractionDigits: v < 1 ? 3 : 2,
  });
}

function formatDelta(d: number) {
  const sign = d > 0 ? "+" : d < 0 ? "−" : "";
  const abs = Math.abs(d);
  return `${sign}${abs.toLocaleString("ru-RU", {
    minimumFractionDigits: abs < 1 ? 2 : 2,
    maximumFractionDigits: abs < 1 ? 3 : 2,
  })} ₽`;
}

export function CurrencyTicker() {
  const [rates, setRates] = useState<Rate[]>(BASE);
  const updated = useMemo(
    () =>
      new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [rates],
  );

  // simulate live ticking
  useEffect(() => {
    const id = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const jitter = (Math.random() - 0.5) * (r.value < 1 ? 0.01 : 0.15);
          const next = Math.max(0.01, r.value + jitter);
          return { ...r, value: next, delta: jitter };
        }),
      );
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const items = [...rates, ...rates]; // duplicate for seamless marquee

  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-gradient-to-r from-ocean/95 via-ocean to-ocean/95 text-ocean-foreground">
      <div className="container mx-auto flex items-center gap-3 px-4 md:px-6">
        <div className="flex shrink-0 items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/90">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          <span className="hidden sm:inline">Курсы ЦБ РФ · {updated}</span>
          <span className="sm:hidden">ЦБ РФ</span>
        </div>

        <div
          className="group relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
          }}
        >
          <div className="flex w-max animate-[ticker_60s_linear_infinite] gap-6 py-2 group-hover:[animation-play-state:paused]">
            {items.map((r, i) => {
              const up = r.delta > 0;
              const flat = r.delta === 0;
              return (
                <div
                  key={`${r.code}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-[12.5px] leading-none"
                >
                  <span className="text-base leading-none">{r.flag}</span>
                  <span className="font-semibold tracking-wide">{r.code}</span>
                  <span className="tabular-nums text-white">{formatRate(r.value)} ₽</span>
                  <span
                    className={[
                      "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums",
                      flat
                        ? "bg-white/10 text-white/70"
                        : up
                          ? "bg-emerald-400/20 text-emerald-200"
                          : "bg-rose-400/20 text-rose-200",
                    ].join(" ")}
                  >
                    {flat ? (
                      <span className="h-2 w-2 rounded-full bg-white/40" />
                    ) : up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {flat ? "0,00 ₽" : formatDelta(r.delta)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Обновить курсы"
          onClick={() =>
            setRates((prev) =>
              prev.map((r) => {
                const jitter = (Math.random() - 0.5) * (r.value < 1 ? 0.01 : 0.2);
                return { ...r, value: Math.max(0.01, r.value + jitter), delta: jitter };
              }),
            )
          }
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 transition-colors hover:bg-white/15 md:inline-flex"
        >
          <RefreshCw className="h-3 w-3" />
          Обновить
        </button>
      </div>
    </div>
  );
}