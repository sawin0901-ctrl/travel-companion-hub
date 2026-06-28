import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { DatabaseZap, Trash2, Zap, Percent } from "lucide-react";

export const Route = createFileRoute("/admin/cache")({ component: CachePage });

const ZONES = [
  { name: "Поиск авиабилетов", hit: 92, size: "1.4 ГБ", ttl: "15 мин" },
  { name: "Поиск отелей", hit: 88, size: "2.1 ГБ", ttl: "30 мин" },
  { name: "Курсы валют (ЦБ РФ)", hit: 99, size: "12 КБ", ttl: "1 час" },
  { name: "Статические страницы (SSR)", hit: 78, size: "412 МБ", ttl: "10 мин" },
  { name: "CDN (статика)", hit: 96, size: "8.6 ГБ", ttl: "30 дней" },
];

function CachePage() {
  return (
    <AdminShell
      title="Кэш"
      description="Состояние Redis и CDN. Управление зонами и инвалидация."
      actions={
        <>
          <Button variant="outline"><Trash2 className="h-4 w-4" /> Очистить выбранные</Button>
          <Button variant="destructive"><Trash2 className="h-4 w-4" /> Сбросить весь кэш</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Hit rate (общий)" value="91%" delta="+2%" icon={Percent} tone="emerald" />
        <StatCard label="Объём кэша" value="12.5 ГБ" icon={DatabaseZap} tone="ocean" />
        <StatCard label="Запросов / сек" value="3 412" delta="+5%" icon={Zap} tone="violet" />
        <StatCard label="Эвикций / мин" value="184" icon={Trash2} tone="amber" />
      </div>
      <Panel title="Зоны кэширования">
        <ul className="divide-y divide-border">
          {ZONES.map((z) => (
            <li key={z.name} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <div className="font-medium">{z.name}</div>
                <div className="text-xs text-muted-foreground">Размер: {z.size} · TTL: {z.ttl}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{z.hit}%</div>
                <div className="text-xs text-muted-foreground">hit rate</div>
              </div>
              <Button variant="outline" size="sm">Очистить</Button>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminShell>
  );
}