import { useEffect, useState } from "react";
import {
  Plane,
  Hotel,
  Home,
  Car,
  MapPin,
  ShieldCheck,
  Award,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "flights"
  | "hotels"
  | "stays"
  | "cars"
  | "transfer"
  | "insurance"
  | "tours";

export interface Category {
  id: CategoryId;
  label: string;
  caption: string;
  color: string;
  icon: LucideIcon;
  /** Появляется в виде вкладки в поисковом блоке. */
  inSearch: boolean;
}

export const ALL_CATEGORIES: Category[] = [
  { id: "flights", label: "Авиабилеты", caption: "от 4 990 ₽", color: "from-sky-400/20 to-sky-600/5", icon: Plane, inSearch: true },
  { id: "hotels", label: "Отели", caption: "1.2 млн вариантов", color: "from-amber-400/20 to-amber-600/5", icon: Hotel, inSearch: true },
  { id: "stays", label: "Жильё", caption: "Квартиры и виллы", color: "from-fuchsia-400/20 to-fuchsia-600/5", icon: Home, inSearch: true },
  { id: "cars", label: "Аренда авто", caption: "от 1 800 ₽/день", color: "from-emerald-400/20 to-emerald-600/5", icon: Car, inSearch: true },
  { id: "transfer", label: "Трансферы", caption: "в 180 странах", color: "from-violet-400/20 to-violet-600/5", icon: MapPin, inSearch: true },
  { id: "insurance", label: "Страховки", caption: "от 150 ₽/день", color: "from-rose-400/20 to-rose-600/5", icon: ShieldCheck, inSearch: true },
  { id: "tours", label: "Экскурсии", caption: "32 000 туров", color: "from-cyan-400/20 to-cyan-600/5", icon: Award, inSearch: false },
];

const STORAGE_KEY = "jetsale:categories:v1";
const EVENT = "jetsale:categories-changed";

export type EnabledMap = Record<CategoryId, boolean>;

function defaults(): EnabledMap {
  return Object.fromEntries(ALL_CATEGORIES.map((c) => [c.id, true])) as EnabledMap;
}

export function loadEnabled(): EnabledMap {
  if (typeof window === "undefined") return defaults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults();
    return { ...defaults(), ...(JSON.parse(raw) as Partial<EnabledMap>) };
  } catch {
    return defaults();
  }
}

export function saveEnabled(value: EnabledMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(EVENT));
}

export function useEnabledCategories(): EnabledMap {
  const [state, setState] = useState<EnabledMap>(() => loadEnabled());
  useEffect(() => {
    const sync = () => setState(loadEnabled());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}