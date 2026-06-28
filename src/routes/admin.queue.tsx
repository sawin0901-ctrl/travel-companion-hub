import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { ListOrdered, CheckCircle2, AlertTriangle, Play, Pause, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/queue")({ component: QueuePage });

const QUEUES = [
  { name: "email:transactional", waiting: 12, active: 4, completed: 48210, failed: 2, status: "running" },
  { name: "email:marketing", waiting: 4820, active: 8, completed: 184211, failed: 18, status: "running" },
  { name: "search:reindex", waiting: 0, active: 0, completed: 1284, failed: 0, status: "idle" },
  { name: "partner:webhook", waiting: 84, active: 2, completed: 21044, failed: 12, status: "running" },
  { name: "sms:notifications", waiting: 22, active: 0, completed: 8412, failed: 4, status: "paused" },
];

function QueuePage() {
  return (
    <AdminShell title="Очередь задач" description="Фоновые задачи (BullMQ / Redis). Управление и повтор неудачных.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="В очереди" value="4 938" icon={ListOrdered} tone="ocean" />
        <StatCard label="Выполнено за день" value="124 812" delta="+8%" icon={CheckCircle2} tone="emerald" />
        <StatCard label="С ошибками" value="36" icon={AlertTriangle} tone="coral" />
        <StatCard label="Воркеров онлайн" value="14 / 14" icon={Play} tone="violet" />
      </div>
      <Panel title="Очереди">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Название", "Ожидает", "В работе", "Выполнено", "Ошибки", "Статус", ""].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUEUES.map((q) => (
                <tr key={q.name} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs font-semibold">{q.name}</td>
                  <td className="px-5 py-3">{q.waiting.toLocaleString("ru-RU")}</td>
                  <td className="px-5 py-3">{q.active}</td>
                  <td className="px-5 py-3 text-muted-foreground">{q.completed.toLocaleString("ru-RU")}</td>
                  <td className={`px-5 py-3 ${q.failed > 0 ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-muted-foreground"}`}>{q.failed}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      q.status === "running" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                      q.status === "paused" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                      "bg-muted text-muted-foreground"
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">{q.status === "paused" ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><RotateCcw className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}