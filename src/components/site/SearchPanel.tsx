import { useEffect, useMemo, useState } from "react";
import { Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ALL_CATEGORIES, useEnabledCategories, type CategoryId } from "@/lib/categories";
import { CityInput } from "./CityInput";
import { FlightSearch } from "./FlightSearch";
import { hotellookUrl, carsUrl, transferUrl, insuranceUrl } from "@/lib/affiliate";

function DateField({ label, value, onChange, className }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={cn("group flex flex-col gap-1 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors focus-within:border-ocean focus-within:bg-background", className)}>
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 border-0 bg-transparent p-0 text-base font-medium outline-none"
      />
    </label>
  );
}

function NumberField({ label, icon: Icon, placeholder, value, onChange, className }: { label: string; icon: typeof Users; placeholder: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={cn("group flex flex-col gap-1 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors focus-within:border-ocean focus-within:bg-background", className)}>
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <input
        type="number"
        min="1"
        max="9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-full border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function openTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function HotelForm() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  return (
    <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto_auto]">
      <CityInput label="Направление" placeholder="Дубай, Стамбул..." value={city} onChange={setCity} />
      <DateField label="Заезд" value={checkIn} onChange={setCheckIn} />
      <DateField label="Выезд" value={checkOut} onChange={setCheckOut} />
      <NumberField label="Гости" icon={Users} placeholder="2" value={guests} onChange={setGuests} />
      <Button
        size="lg"
        className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold"
        onClick={() => openTab(hotellookUrl(city || "Москва", checkIn, checkOut, guests || "2"))}
      >
        <Search className="h-4 w-4" /> Найти
      </Button>
    </div>
  );
}

function StaysForm() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  return (
    <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto_auto]">
      <CityInput label="Город или район" placeholder="Тбилиси, Старый город..." value={city} onChange={setCity} />
      <DateField label="Заезд" value={checkIn} onChange={setCheckIn} />
      <DateField label="Выезд" value={checkOut} onChange={setCheckOut} />
      <NumberField label="Гости" icon={Users} placeholder="2" value={guests} onChange={setGuests} />
      <Button
        size="lg"
        className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold"
        onClick={() => openTab(hotellookUrl(city || "Тбилиси", checkIn, checkOut, guests || "2"))}
      >
        <Search className="h-4 w-4" /> Найти
      </Button>
    </div>
  );
}

function CarsForm() {
  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  return (
    <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto]">
      <CityInput label="Место получения" placeholder="Аэропорт Антальи..." value={pickup} onChange={setPickup} />
      <DateField label="Получение" value={pickupDate} onChange={setPickupDate} />
      <DateField label="Возврат" value={returnDate} onChange={setReturnDate} />
      <Button
        size="lg"
        className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold"
        onClick={() => openTab(carsUrl(pickup || "Antalya Airport", pickupDate, returnDate))}
      >
        <Search className="h-4 w-4" /> Найти
      </Button>
    </div>
  );
}

function TransferForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("2");
  return (
    <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto_auto]">
      <CityInput label="Откуда" placeholder="Аэропорт DXB" value={from} onChange={setFrom} />
      <CityInput label="Куда" placeholder="Отель Marina" value={to} onChange={setTo} />
      <DateField label="Дата" value={date} onChange={setDate} />
      <NumberField label="Пассажиры" icon={Users} placeholder="2" value={passengers} onChange={setPassengers} />
      <Button
        size="lg"
        className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold"
        onClick={() => openTab(transferUrl(from, to, date, passengers || "2"))}
      >
        <Search className="h-4 w-4" /> Найти
      </Button>
    </div>
  );
}

function InsuranceForm() {
  const [country, setCountry] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tourists, setTourists] = useState("1");
  return (
    <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto_auto]">
      <CityInput label="Страна поездки" placeholder="Турция, Шенген..." value={country} onChange={setCountry} />
      <DateField label="С" value={dateFrom} onChange={setDateFrom} />
      <DateField label="По" value={dateTo} onChange={setDateTo} />
      <NumberField label="Туристы" icon={Users} placeholder="1" value={tourists} onChange={setTourists} />
      <Button
        size="lg"
        className="h-auto self-stretch gap-2 rounded-xl px-7 text-base font-semibold"
        onClick={() => openTab(insuranceUrl(country || "Turkey", dateFrom, dateTo, tourists || "1"))}
      >
        <Search className="h-4 w-4" /> Найти
      </Button>
    </div>
  );
}

type TabId = CategoryId;

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
        {active === "flights" && <FlightSearch />}
        {active === "hotels" && <HotelForm />}
        {active === "stays" && <StaysForm />}
        {active === "cars" && <CarsForm />}
        {active === "transfer" && <TransferForm />}
        {active === "insurance" && <InsuranceForm />}

        {active === "flights" && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-muted-foreground">
            <span className="ml-auto text-ocean">Сравниваем 850+ партнёров</span>
          </div>
        )}
      </div>
    </div>
  );
}
