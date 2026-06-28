import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "jetsale-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      );
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur md:inset-x-auto md:right-4 md:left-auto md:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-ocean/10 p-2 text-ocean">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h2 className="font-display font-semibold">Мы используем cookies</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Файлы cookie помогают находить вам лучшие цены и хранить избранное. Продолжая использовать сайт, вы
            принимаете{" "}
            <Link to="/legal/privacy" className="text-ocean underline">
              политику конфиденциальности
            </Link>{" "}
            (152-ФЗ).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" className="bg-ocean hover:bg-ocean/90" onClick={() => decide("all")}>
              Принять все
            </Button>
            <Button size="sm" variant="outline" onClick={() => decide("necessary")}>
              Только необходимые
            </Button>
          </div>
        </div>
        <button
          onClick={() => decide("necessary")}
          aria-label="Закрыть"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}