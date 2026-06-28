import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

export const Route = createFileRoute("/admin/logs")({ component: LogsPage });

const LOGS = [
  { ts: "28.06 14:48:12", actor: "admin@jetsale.online", action: "Обновил промокод", target: "SUMMER15", ip: "10.0.0.4" },
  { ts: "28.06 14:32:55", actor: "yulia@jetsale.online", action: "Закрыл тикет", target: "T-4818", ip: "10.0.0.8" },
  { ts: "28.06 13:21:08", actor: "admin@jetsale.online", action: "Включил категорию", target: "Экскурсии", ip: "10.0.0.4" },
  { ts: "28.06 12:14:40", actor: "alexey@jetsale.online", action: "Опубликовал отзыв", target: "review#9214", ip: "10.0.0.12" },
  { ts: "28.06 10:02:31", actor: "system", action: "Запустил бэкап БД", target: "pg_dump_full", ip: "—" },
  { ts: "28.06 09:00:00", actor: "system", action: "Пересоздал sitemap", target: "/sitemap.xml", ip: "—" },
];

function LogsPage() {
  return (
    <AdminShell
      title="Журнал действий"
      description="Аудит всех изменений в админ-панели. Срок хранения: 365 дней."
      actions={<Button variant="outline"><Download className="h-4 w-4" /> Экспорт</Button>}
    >
      <Panel
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск по действию или пользователю" className="h-9 w-72 pl-8" />
          </div>
        }
      >
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Время", "Пользователь", "Действие", "Объект", "IP"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOGS.map((l, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{l.ts}</td>
                  <td className="px-5 py-3">{l.actor}</td>
                  <td className="px-5 py-3">{l.action}</td>
                  <td className="px-5 py-3 font-mono text-xs">{l.target}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}