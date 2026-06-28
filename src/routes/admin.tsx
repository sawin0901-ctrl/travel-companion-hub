import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings2, Save, RotateCcw, Eye, EyeOff } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  ALL_CATEGORIES,
  loadEnabled,
  saveEnabled,
  type EnabledMap,
} from "@/lib/categories";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Админ-панель — JetSale" },
      { name: "description", content: "Управление категориями сервиса JetSale." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [state, setState] = useState<EnabledMap | null>(null);

  useEffect(() => {
    setState(loadEnabled());
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 md:px-6">Загрузка…</div>
      </div>
    );
  }

  const toggle = (id: keyof EnabledMap) => {
    setState((s) => (s ? { ...s, [id]: !s[id] } : s));
  };

  const handleSave = () => {
    saveEnabled(state);
    toast.success("Настройки категорий сохранены");
  };

  const handleReset = () => {
    const next = Object.fromEntries(ALL_CATEGORIES.map((c) => [c.id, true])) as EnabledMap;
    setState(next);
    saveEnabled(next);
    toast.success("Все категории включены");
  };

  const enabledCount = Object.values(state).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Settings2 className="h-3.5 w-3.5" /> Админ-панель
              </span>
              <h1 className="mt-4 text-balance text-3xl font-bold md:text-4xl">
                Категории сайта
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Включайте и отключайте разделы. Изменения применяются ко всем посетителям сайта на этом устройстве.
                Активно: <span className="font-semibold text-foreground">{enabledCount}</span> из {ALL_CATEGORIES.length}.
              </p>
            </div>
          </div>

          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
            {ALL_CATEGORIES.map((c) => {
              const Icon = c.icon;
              const on = state[c.id];
              return (
                <div key={c.id} className="flex items-center gap-4 p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold">{c.label}</h3>
                      {c.inSearch ? (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                          В поиске
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Только в каталоге
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.caption}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    {on ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Eye className="h-3.5 w-3.5" /> Видна
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <EyeOff className="h-3.5 w-3.5" /> Скрыта
                      </span>
                    )}
                    <Switch checked={on} onCheckedChange={() => toggle(c.id)} aria-label={`Включить ${c.label}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" /> Сбросить
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4" /> Сохранить
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Настройки хранятся локально в браузере (localStorage). Для синхронизации между пользователями и серверами
            подключите Lovable Cloud — тогда категории будут храниться в базе данных и доступны только авторизованным
            администраторам.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}