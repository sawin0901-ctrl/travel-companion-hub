import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Wallet, RotateCcw, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({ component: OrdersPage });

const ORDERS = [
  { id: "JS-10287", date: "28.06.2026 14:22", user: "anna.k@mail.ru", type: "Авиа", partner: "Aviasales", total: "12 480 ₽", commission: "624 ₽", status: "Оплачен" },
  { id: "JS-10286", date: "28.06.2026 13:48", user: "ivan.p@yandex.ru", type: "Отель", partner: "Ostrovok", total: "38 900 ₽", commission: "2 334 ₽", status: "Оплачен" },
  { id: "JS-10285", date: "28.06.2026 12:15", user: "maria.s@gmail.com", type: "Авиа", partner: "Aviasales", total: "29 100 ₽", commission: "1 455 ₽", status: "Ожидает" },
  { id: "JS-10284", date: "28.06.2026 10:02", user: "dmitry.v@mail.ru", type: "Авто", partner: "Localrent", total: "21 400 ₽", commission: "1 712 ₽", status: "Оплачен" },
  { id: "JS-10283", date: "27.06.2026 22:31", user: "olga.n@bk.ru", type: "Тур", partner: "Level.Travel", total: "84 600 ₽", commission: "5 922 ₽", status: "Возврат" },
  { id: "JS-10282", date: "27.06.2026 19:14", user: "petr.k@yandex.ru", type: "Страховка", partner: "Cherehapa", total: "1 240 ₽", commission: "186 ₽", status: "Оплачен" },
  { id: "JS-10281", date: "27.06.2026 16:09", user: "sergey.a@mail.ru", type: "Трансфер", partner: "Kiwitaxi", total: "3 800 ₽", commission: "456 ₽", status: "Оплачен" },
];

const statusStyle: Record<string, string> = {
  Оплачен: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Ожидает: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Возврат: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function OrdersPage() {
  return (
    <AdminShell
      title="Заказы"
      description="Все бронирования и партнёрские комиссии. Интеграции: Aviasales, Ostrovok, Level.Travel, Localrent, Cherehapa, Kiwitaxi."
      actions={
        <>
          <Button variant="outline"><Download className="h-4 w-4" /> Экспорт</Button>
          <Button>Новый заказ</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Заказов сегодня" value="184" delta="+12%" icon={ShoppingBag} tone="ocean" />
        <StatCard label="Выручка сегодня" value="412 800 ₽" delta="+8%" icon={Wallet} tone="emerald" />
        <StatCard label="Ожидают оплаты" value="14" icon={Clock} tone="amber" />
        <StatCard label="Возвраты" value="2" delta="-1" icon={RotateCcw} tone="coral" />
      </div>

      <Panel
        title="Список заказов"
        actions={
          <>
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск по ID или email" className="h-9 w-64 pl-8" />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Фильтры</Button>
          </>
        }
      >
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Заказ", "Дата", "Клиент", "Тип", "Партнёр", "Сумма", "Комиссия", "Статус"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-5 py-3">{o.user}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.type}</td>
                  <td className="px-5 py-3">{o.partner}</td>
                  <td className="px-5 py-3 font-semibold">{o.total}</td>
                  <td className="px-5 py-3 text-emerald-600 dark:text-emerald-400">{o.commission}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
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