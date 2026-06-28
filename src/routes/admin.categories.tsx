import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, RotateCcw, Eye, EyeOff } from "lucide-react";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ALL_CATEGORIES, loadEnabled, saveEnabled, type EnabledMap } from "@/lib/categories";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  const [state, setState] = useState<EnabledMap | null>(null);
  useEffect(() => setState(loadEnabled()), []);
  if (!state) return <AdminShell title="Категории">Загрузка…</AdminShell>;

  const toggle = (id: keyof EnabledMap) =>
    setState((s) => (s ? { ...s, [id]: !s[id] } : s));

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
  const enabled = Object.values(state).filter(Boolean).length;

  return (
    <AdminShell
      title="Категории сайта"
      description={`Включайте и отключайте разделы. Активно: ${enabled} из ${ALL_CATEGORIES.length}.`}
      actions={
        <>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Сбросить
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" /> Сохранить
          </Button>
        </>
      }
    >
      <Panel>
        <div className="divide-y divide-border">
          {ALL_CATEGORIES.map((c) => {
            const Icon = c.icon;
            const on = state[c.id];
            return (
              <div key={c.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold">{c.label}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        c.inSearch
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.inSearch ? "В поиске" : "Только в каталоге"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.caption}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  {on ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Eye className="h-3.5 w-3.5" /> Видна
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <EyeOff className="h-3.5 w-3.5" /> Скрыта
                    </span>
                  )}
                  <Switch checked={on} onCheckedChange={() => toggle(c.id)} aria-label={c.label} />
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </AdminShell>
  );
}