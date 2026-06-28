import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, Shield, Ban } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

const USERS = [
  { name: "Анна Климова", email: "anna.k@mail.ru", role: "Клиент", orders: 12, since: "2024", status: "Активен" },
  { name: "Иван Петров", email: "ivan.p@yandex.ru", role: "Клиент", orders: 8, since: "2025", status: "Активен" },
  { name: "Мария Соколова", email: "maria.s@gmail.com", role: "VIP", orders: 41, since: "2023", status: "Активен" },
  { name: "Сергей Админов", email: "admin@jetsale.online", role: "Администратор", orders: 0, since: "2024", status: "Активен" },
  { name: "Дмитрий Володин", email: "dmitry.v@mail.ru", role: "Клиент", orders: 4, since: "2026", status: "Заблокирован" },
];

const roleStyle: Record<string, string> = {
  Администратор: "bg-coral/10 text-coral",
  VIP: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Клиент: "bg-secondary text-secondary-foreground",
};

function UsersPage() {
  return (
    <AdminShell
      title="Пользователи"
      description="Учётные записи клиентов и сотрудников. Роли, активность и блокировки."
      actions={<Button><UserPlus className="h-4 w-4" /> Добавить пользователя</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Всего пользователей" value="42 184" delta="+612" icon={Users} tone="ocean" />
        <StatCard label="Активны за 30 дней" value="18 902" delta="+9%" icon={Users} tone="emerald" />
        <StatCard label="Администраторов" value="6" icon={Shield} tone="coral" />
        <StatCard label="Заблокировано" value="14" icon={Ban} tone="amber" />
      </div>
      <Panel
        title="Список пользователей"
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск по email" className="h-9 w-64 pl-8" />
          </div>
        }
      >
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Имя", "Email", "Роль", "Заказов", "С нами с", "Статус"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{u.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${roleStyle[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3">{u.orders}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.since}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      u.status === "Активен" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                      "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}>{u.status}</span>
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