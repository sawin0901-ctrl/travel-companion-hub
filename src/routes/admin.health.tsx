import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatusDot } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/health")({ component: HealthPage });

const CHECKS = [
  { name: "База данных", endpoint: "postgres://primary:5432", ms: 8, tone: "ok" as const },
  { name: "Redis", endpoint: "redis://cache:6379", ms: 1, tone: "ok" as const },
  { name: "S3 хранилище (Yandex Object Storage)", endpoint: "storage.yandexcloud.net", ms: 42, tone: "ok" as const },
  { name: "Aviasales API", endpoint: "api.travelpayouts.com", ms: 184, tone: "ok" as const },
  { name: "Ostrovok API", endpoint: "partner-api.emergingtravel.com", ms: 212, tone: "ok" as const },
  { name: "ЮKassa", endpoint: "api.yookassa.ru", ms: 98, tone: "ok" as const },
  { name: "SMS-шлюз", endpoint: "smsc.ru", ms: 612, tone: "warn" as const },
  { name: "SMTP (Mail.ru)", endpoint: "smtp.mail.ru:465", ms: 0, tone: "down" as const },
];
const toneLabel: Record<string, string> = { ok: "Работает", warn: "Медленно", down: "Недоступен", info: "Информация" };

function HealthPage() {
  const ok = CHECKS.filter((c) => c.tone === "ok").length;
  return (
    <AdminShell
      title="Health Check"
      description={`Проверка внешних зависимостей. ${ok} из ${CHECKS.length} здоровы.`}
      actions={<Button><RefreshCw className="h-4 w-4" /> Проверить сейчас</Button>}
    >
      <Panel>
        <ul className="divide-y divide-border">
          {CHECKS.map((c) => (
            <li key={c.name} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
              <StatusDot tone={c.tone} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{c.name}</div>
                <div className="font-mono text-xs text-muted-foreground">{c.endpoint}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${
                  c.tone === "ok" ? "text-emerald-600 dark:text-emerald-400" :
                  c.tone === "warn" ? "text-amber-600 dark:text-amber-400" :
                  "text-rose-600 dark:text-rose-400"
                }`}>{toneLabel[c.tone]}</div>
                <div className="text-xs text-muted-foreground">{c.ms > 0 ? `${c.ms} мс` : "—"}</div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminShell>
  );
}