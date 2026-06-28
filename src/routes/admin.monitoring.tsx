import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard, StatusDot } from "@/components/admin/AdminShell";
import { Activity, Cpu, MemoryStick, Network } from "lucide-react";

export const Route = createFileRoute("/admin/monitoring")({ component: MonitoringPage });

const SERVICES = [
  { name: "Frontend (TanStack Start)", region: "ru-msk-1", uptime: "99.99%", latency: "84 мс", tone: "ok" as const },
  { name: "API Gateway", region: "ru-msk-1", uptime: "99.98%", latency: "122 мс", tone: "ok" as const },
  { name: "PostgreSQL primary", region: "ru-msk-1", uptime: "100%", latency: "8 мс", tone: "ok" as const },
  { name: "Redis cache", region: "ru-msk-1", uptime: "99.99%", latency: "1 мс", tone: "ok" as const },
  { name: "Worker email", region: "ru-msk-2", uptime: "99.41%", latency: "задержка 4с", tone: "warn" as const },
  { name: "Aviasales API", region: "external", uptime: "99.92%", latency: "184 мс", tone: "ok" as const },
  { name: "Ostrovok API", region: "external", uptime: "99.78%", latency: "212 мс", tone: "ok" as const },
  { name: "ЮKassa", region: "external", uptime: "100%", latency: "98 мс", tone: "ok" as const },
];

const cpuSeries = Array.from({ length: 30 }, () => Math.round(20 + Math.random() * 50));

function MonitoringPage() {
  const max = Math.max(...cpuSeries);
  return (
    <AdminShell title="Мониторинг" description="Здоровье инфраструктуры, нагрузка и SLA внешних API.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Uptime 30 дней" value="99.98%" icon={Activity} tone="emerald" />
        <StatCard label="CPU (avg)" value="38%" icon={Cpu} tone="ocean" />
        <StatCard label="RAM (avg)" value="62%" icon={MemoryStick} tone="violet" />
        <StatCard label="Трафик / сек" value="184 МБ" delta="+4%" icon={Network} tone="amber" />
      </div>

      <Panel title="CPU за последний час">
        <div className="flex h-32 items-end gap-1">
          {cpuSeries.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-ocean to-ocean/40"
              style={{ height: `${(v / max) * 100}%` }}
              title={`${v}%`}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Сервисы">
        <ul className="divide-y divide-border">
          {SERVICES.map((s) => (
            <li key={s.name} className="flex flex-wrap items-center gap-4 py-3 first:pt-0 last:pb-0">
              <StatusDot tone={s.tone} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.region}</div>
              </div>
              <div className="text-right text-xs">
                <div>uptime <span className="font-semibold">{s.uptime}</span></div>
                <div className="text-muted-foreground">{s.latency}</div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminShell>
  );
}