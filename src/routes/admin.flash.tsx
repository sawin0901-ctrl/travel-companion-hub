import { createFileRoute } from "@tanstack/react-router";
import { Plus, Zap, Clock } from "lucide-react";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/flash")({ component: FlashPage });

const SALES = [
  { title: "Турция -25%", scope: "Отели Антальи и Кемера", price: "от 28 900 ₽", left: "до 30.06 23:59", sold: 142, total: 300, active: true },
  { title: "Авиа в Сочи -30%", scope: "Прямые рейсы из MOW/LED", price: "от 4 990 ₽", left: "до 05.07 12:00", sold: 87, total: 200, active: true },
  { title: "ОАЭ all inclusive", scope: "Отели 5★ Дубай", price: "от 78 400 ₽", left: "до 10.07 00:00", sold: 24, total: 100, active: true },
  { title: "Тур в Грузию", scope: "Тбилиси + Батуми, 7 ночей", price: "от 32 100 ₽", left: "до 12.07 23:59", sold: 0, total: 150, active: false },
];

function FlashPage() {
  return (
    <AdminShell
      title="Flash-продажи"
      description="Ограниченные по времени предложения с обратным отсчётом."
      actions={<Button><Plus className="h-4 w-4" /> Создать акцию</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {SALES.map((s) => {
          const pct = Math.round((s.sold / s.total) * 100);
          return (
            <Panel
              key={s.title}
              title={s.title}
              description={s.scope}
              actions={<Switch defaultChecked={s.active} />}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-coral">
                  <Zap className="h-4 w-4" /> {s.price}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {s.left}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Продано {s.sold} из {s.total}</span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-to-r from-ocean to-coral" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Редактировать</Button>
                <Button variant="ghost" size="sm" className="text-rose-500">Завершить</Button>
              </div>
            </Panel>
          );
        })}
      </div>
    </AdminShell>
  );
}