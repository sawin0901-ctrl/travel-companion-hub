import { useState } from "react";
import { Plane, Hotel, Home, Car, MapPin, ShieldCheck, Search, Calendar, Users, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "flights", label: "Авиабилеты", icon: Plane },
  { id: "hotels", label: "Отели", icon: Hotel },
  { id: "stays", label: "Жильё", icon: Home },
  { id: "cars", label: "Авто", icon: Car },
  { id: "transfer", label: "Трансферы", icon: MapPin },
  { id: "insurance", label: "Страховки", icon: ShieldCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Field({
  label,
  icon: Icon,
  placeholder,
  className,
}: {
  label: string;
  icon: typeof Plane;
  placeholder: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group flex flex-col gap-1 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors focus-within:border-ocean focus-within:bg-background",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <Input
        placeholder={placeholder}
        className="h-7 border-0 bg-transparent p-0 text-base font-medium shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
      />
    </label>
  );
}

export function SearchPanel() {
  const [active, setActive] = useState<TabId>("flights");

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-card/95 p-2 shadow-glow ring-1 ring-border/60 backdrop-blur-xl">
      <div className="flex flex-wrap gap-1 rounded-2xl bg-muted/40 p-1.5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex flex-1 min-w-[110px] items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 md:p-5">
        {active === "flights" && (
          <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto]">
            <Field label="Откуда" icon={Plane} placeholder="Москва" />
            <button className="hidden h-full items-center justify-center self-end rounded-xl border border-border bg-background px-2.5 text-muted-foreground transition hover:text-ocean md:flex">
              <ArrowLeftRight className="h-4 w-4" />
            </button>
            <Field label="Куда" icon={Plane} placeholder="Стамбул" />
            <Field label="Когда" icon={Calendar} placeholder="14 авг" />
            <Field label="Пассажиры" icon={Users} placeholder="1 взрослый" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}
        {active === "hotels" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Направление" icon={MapPin} placeholder="Дубай, ОАЭ" />
            <Field label="Заезд" icon={Calendar} placeholder="20 авг" />
            <Field label="Выезд" icon={Calendar} placeholder="27 авг" />
            <Field label="Гости" icon={Users} placeholder="2 гостя, 1 номер" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}
        {active === "stays" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Город или район" icon={Home} placeholder="Тбилиси, Старый город" />
            <Field label="Заезд" icon={Calendar} placeholder="1 сен" />
            <Field label="Выезд" icon={Calendar} placeholder="8 сен" />
            <Field label="Гости" icon={Users} placeholder="3 гостя" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}
        {active === "cars" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto]">
            <Field label="Место получения" icon={Car} placeholder="Аэропорт Антальи" />
            <Field label="Получение" icon={Calendar} placeholder="5 авг, 12:00" />
            <Field label="Возврат" icon={Calendar} placeholder="12 авг, 12:00" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}
        {active === "transfer" && (
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <Field label="Откуда" icon={MapPin} placeholder="Аэропорт DXB" />
            <Field label="Куда" icon={MapPin} placeholder="Отель Marina" />
            <Field label="Дата" icon={Calendar} placeholder="20 авг" />
            <Field label="Пассажиры" icon={Users} placeholder="2 пассажира" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}
        {active === "insurance" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Страна поездки" icon={ShieldCheck} placeholder="Шенген" />
            <Field label="С" icon={Calendar} placeholder="1 сен" />
            <Field label="По" icon={Calendar} placeholder="14 сен" />
            <Field label="Туристы" icon={Users} placeholder="1 взрослый" />
            <Button size="lg" className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold">
              <Search className="h-4 w-4" /> Найти
            </Button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-muted-foreground">
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-ocean" /> Только прямые</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-ocean" defaultChecked /> С багажом</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-ocean" /> Гибкие даты ±3 дня</label>
          <span className="ml-auto text-ocean">Сравниваем 850+ партнёров</span>
        </div>
      </div>
    </div>
  );
}