import { Link } from "@tanstack/react-router";
import { Plane, Menu, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Авиабилеты", href: "#aviabilety" },
  { label: "Отели", href: "#oteli" },
  { label: "Жильё", href: "#zhile" },
  { label: "Авто", href: "#avto" },
  { label: "Туры", href: "#tury" },
  { label: "Блог", href: "#blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-ocean text-ocean-foreground shadow-soft">
            <Plane className="h-4 w-4 -rotate-45" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            JetSale
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden gap-1.5 md:inline-flex">
            <Globe2 className="h-4 w-4" />
            RU · ₽
          </Button>
          <Button size="sm" className="hidden md:inline-flex">Войти</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}