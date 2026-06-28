import { useEffect, useMemo, useState } from "react";
import { Plane, Hotel, Home, Car, MapPin, ShieldCheck, Search, Calendar, Users, ArrowLeftRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ALL_CATEGORIES, useEnabledCategories, type CategoryId } from "@/lib/categories";

type TabId = CategoryId;

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
  const enabled = useEnabledCategories();
  const tabs = useMemo(
    () => ALL_CATEGORIES.filter((c) => c.inSearch && enabled[c.id]),
    [enabled],
  );
  const [active, setActive] = useState<TabId>("flights");
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === active)) {
      setActive(tabs[0].id);
    }
  }, [tabs, active]);

  if (tabs.length === 0) {
    return (
      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-card/95 p-8 text-center shadow-glow ring-1 ring-border/60 backdrop-blur-xl">
        <p className="text-sm text-muted-foreground">
          Сейчас нет активных категорий. Включите их в админ-панели.
        </p>
      </div>
    );
  }

  const targetPath = active === "flights" ? "/flights" : "/hotels";
  const SubmitButton = (
    <Button
      asChild
      size="lg"
      className="col-span-full h-12 w-full gap-2 rounded-xl px-7 text-base font-semibold md:col-auto md:h-auto md:w-auto md:self-stretch"
    >
      <Link to={targetPath}>
        <Search className="h-4 w-4" /> Найти
      </Link>
    </Button>
  );

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-card/95 p-2 shadow-glow ring-1 ring-border/60 backdrop-blur-xl">
      <div className="-mx-0 flex gap-1 overflow-x-auto rounded-2xl bg-muted/40 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all md:flex-1 md:shrink",
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
            {SubmitButton}
          </div>
        )}
        {active === "hotels" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Направление" icon={MapPin} placeholder="Дубай, ОАЭ" />
            <Field label="Заезд" icon={Calendar} placeholder="20 авг" />
            <Field label="Выезд" icon={Calendar} placeholder="27 авг" />
            <Field label="Гости" icon={Users} placeholder="2 гостя, 1 номер" />
            {SubmitButton}
          </div>
        )}
        {active === "stays" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Город или район" icon={Home} placeholder="Тбилиси, Старый город" />
            <Field label="Заезд" icon={Calendar} placeholder="1 сен" />
            <Field label="Выезд" icon={Calendar} placeholder="8 сен" />
            <Field label="Гости" icon={Users} placeholder="3 гостя" />
            {SubmitButton}
          </div>
        )}
        {active === "cars" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto]">
            <Field label="Место получения" icon={Car} placeholder="Аэропорт Антальи" />
            <Field label="Получение" icon={Calendar} placeholder="5 авг, 12:00" />
            <Field label="Возврат" icon={Calendar} placeholder="12 авг, 12:00" />
            {SubmitButton}
          </div>
        )}
        {active === "transfer" && (
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <Field label="Откуда" icon={MapPin} placeholder="Аэропорт DXB" />
            <Field label="Куда" icon={MapPin} placeholder="Отель Marina" />
            <Field label="Дата" icon={Calendar} placeholder="20 авг" />
            <Field label="Пассажиры" icon={Users} placeholder="2 пассажира" />
            {SubmitButton}
          </div>
        )}
        {active === "insurance" && (
          <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <Field label="Страна поездки" icon={ShieldCheck} placeholder="Шенген" />
            <Field label="С" icon={Calendar} placeholder="1 сен" />
            <Field label="По" icon={Calendar} placeholder="14 сен" />
            <Field label="Туристы" icon={Users} placeholder="1 взрослый" />
            {SubmitButton}
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