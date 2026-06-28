import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowRight,
  Plane,
  Hotel,
  Car,
  Ticket,
  Activity,
} from "lucide-react";
import { AdminShell, StatCard, Panel, StatusDot } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

const recentOrders = [
  { id: "JS-10287", user: "Анна К.", type: "Авиа", route: "MOW → LED", total: "12 480 ₽", status: "Оплачен" },
  { id: "JS-10286", user: "Иван П.", type: "Отель", route: "Сочи, 4 ночи", total: "38 900 ₽", status: "Оплачен" },
  { id: "JS-10285", user: "Мария С.", type: "Авиа", route: "MOW → IST", total: "29 100 ₽", status: "Ожидает" },
  { id: "JS-10284", user: "Дмитрий В.", type: "Авто", route: "Дубай, 5 дней", total: "21 400 ₽", status: "Оплачен" },
  { id: "JS-10283", user: "Ольга Н.", type: "Тур", route: "Анталия, 7 ночей", total: "84 600 ₽", status: "Возврат" },
];

const categoryStats = [
  { label: "Авиабилеты", value: "1 284", share: 64, icon: Plane },
  { label: "Отели", value: "612", share: 41, icon: Hotel },
  { label: "Аренда авто", value: "184", share: 22, icon: Car },
  { label: "Экскурсии", value: "97", share: 14, icon: Ticket },
];

function DashboardPage() {
  return (
    <AdminShell
      title="Дашборд"
      description="Сводка по выручке, заказам и состоянию сервиса за последние 30 дней."
      actions={
        <>
          <Button variant="outline">Экспорт CSV</Button>
          <Button>Новый отчёт</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Выручка за 30 дней" value="4.82 млн ₽" delta="+12.4%" icon={Wallet} tone="ocean" />
        <StatCard label="Заказы" value="2 184" delta="+8.1%" icon={ShoppingBag} tone="coral" />
        <StatCard label="Новые пользователи" value="1 412" delta="+18.6%" icon={Users} tone="emerald" />
        <StatCard label="Конверсия поиска" value="3.7%" delta="-0.4%" icon={TrendingUp} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Последние заказы"
          description="Свежие бронирования через партнёрские программы"
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/orders">
                Все заказы <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          }
        >
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-2 font-medium">Заказ</th>
                  <th className="px-5 py-2 font-medium">Клиент</th>
                  <th className="px-5 py-2 font-medium">Тип</th>
                  <th className="px-5 py-2 font-medium">Маршрут</th>
                  <th className="px-5 py-2 font-medium">Сумма</th>
                  <th className="px-5 py-2 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-5 py-3">{o.user}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.type}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.route}</td>
                    <td className="px-5 py-3 font-semibold">{o.total}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          o.status === "Оплачен"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : o.status === "Ожидает"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Категории" description="Бронирования по направлениям">
            <ul className="space-y-4">
              {categoryStats.map((c) => (
                <li key={c.label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <c.icon className="h-4 w-4 text-ocean" /> {c.label}
                    </span>
                    <span className="font-semibold">{c.value}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-ocean to-coral"
                      style={{ width: `${c.share}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Состояние сервиса" actions={<Activity className="h-4 w-4 text-muted-foreground" />}>
            <ul className="space-y-3 text-sm">
              {[
                { name: "API авиаперевозчиков", tone: "ok" as const, value: "184 мс" },
                { name: "API отелей (Ostrovok)", tone: "ok" as const, value: "212 мс" },
                { name: "Платёжный шлюз ЮKassa", tone: "ok" as const, value: "98 мс" },
                { name: "Очередь email-рассылок", tone: "warn" as const, value: "задержка 4с" },
              ].map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <StatusDot tone={s.tone} /> {s.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AdminShell>
  );
}