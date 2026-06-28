import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Clock, CheckCircle2, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/tickets")({ component: TicketsPage });

const TICKETS = [
  { id: "T-4821", subject: "Не пришёл билет на почту", user: "anna.k@mail.ru", priority: "Высокий", agent: "—", updated: "5 мин назад", status: "Новый" },
  { id: "T-4820", subject: "Возврат за отель Rixos", user: "ivan.p@yandex.ru", priority: "Средний", agent: "Юлия", updated: "1 ч назад", status: "В работе" },
  { id: "T-4819", subject: "Промокод SUMMER15 не сработал", user: "maria.s@gmail.com", priority: "Низкий", agent: "Алексей", updated: "2 ч назад", status: "В работе" },
  { id: "T-4818", subject: "Изменить дату вылета", user: "dmitry.v@mail.ru", priority: "Средний", agent: "Юлия", updated: "вчера", status: "Закрыт" },
];

const prio: Record<string, string> = {
  Высокий: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  Средний: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Низкий: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};
const st: Record<string, string> = {
  Новый: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "В работе": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Закрыт: "bg-muted text-muted-foreground",
};

function TicketsPage() {
  return (
    <AdminShell title="Тикеты" description="Обращения в поддержку и история переписки." actions={<Button>Новый тикет</Button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Открытых тикетов" value="48" delta="+6" icon={LifeBuoy} tone="coral" />
        <StatCard label="Среднее время ответа" value="22 мин" delta="-4 мин" icon={Clock} tone="emerald" />
        <StatCard label="Закрыто за неделю" value="184" delta="+12%" icon={CheckCircle2} tone="ocean" />
        <StatCard label="Оценка поддержки" value="4.8 ★" icon={MessageSquare} tone="amber" />
      </div>
      <Panel title="Очередь тикетов">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["ID", "Тема", "Клиент", "Приоритет", "Агент", "Обновлён", "Статус"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TICKETS.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-5 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-5 py-3 font-medium">{t.subject}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.user}</td>
                  <td className="px-5 py-3"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${prio[t.priority]}`}>{t.priority}</span></td>
                  <td className="px-5 py-3">{t.agent}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.updated}</td>
                  <td className="px-5 py-3"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${st[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}