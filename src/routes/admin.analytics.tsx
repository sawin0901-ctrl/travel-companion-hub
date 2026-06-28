import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, Globe, MousePointerClick } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

const traffic = [42, 56, 38, 64, 72, 58, 80, 96, 74, 88, 102, 118, 96, 124];

const sources = [
  { name: "Яндекс (органика)", visits: "48 210", share: 41, color: "bg-rose-500" },
  { name: "Google (органика)", visits: "29 740", share: 25, color: "bg-blue-500" },
  { name: "Прямые заходы", visits: "16 320", share: 14, color: "bg-emerald-500" },
  { name: "Яндекс.Директ", visits: "11 870", share: 10, color: "bg-amber-500" },
  { name: "Соцсети (VK, TG)", visits: "7 410", share: 6, color: "bg-violet-500" },
  { name: "Партнёрки", visits: "4 920", share: 4, color: "bg-ocean" },
];

function AnalyticsPage() {
  const max = Math.max(...traffic);
  return (
    <AdminShell
      title="Аналитика"
      description="Поток трафика, источники и поведение пользователей. Подключено к Яндекс.Метрике и Google Analytics."
      actions={
        <>
          <Button variant="outline">Период: 30 дней</Button>
          <Button>Открыть Метрику</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Сеансы" value="118 420" delta="+9.2%" icon={MousePointerClick} tone="ocean" />
        <StatCard label="Уникальные посетители" value="84 612" delta="+11.4%" icon={Globe} tone="violet" />
        <StatCard label="Глубина просмотра" value="4.8" delta="+0.3" icon={BarChart3} tone="emerald" />
        <StatCard label="Отказы" value="22.1%" delta="-1.6%" icon={TrendingUp} tone="amber" />
      </div>

      <Panel title="Сеансы по дням" description="Последние 14 дней">
        <div className="flex h-48 items-end gap-2">
          {traffic.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-ocean to-ocean/40 transition-all hover:from-coral hover:to-coral/40"
                style={{ height: `${(v / max) * 100}%` }}
                title={`${v * 100} сеансов`}
              />
              <span className="text-[10px] text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Источники трафика">
        <ul className="space-y-4">
          {sources.map((s) => (
            <li key={s.name}>
              <div className="flex items-center justify-between text-sm">
                <span>{s.name}</span>
                <span className="font-semibold">{s.visits}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full ${s.color}`} style={{ width: `${s.share}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminShell>
  );
}