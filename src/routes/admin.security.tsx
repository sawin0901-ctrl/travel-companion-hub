import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, ShieldAlert, Lock, KeyRound } from "lucide-react";

export const Route = createFileRoute("/admin/security")({ component: SecurityPage });

const EVENTS = [
  { ts: "28.06 14:42", event: "Подозрительная серия попыток входа (12 за 1 мин)", ip: "85.140.12.34", action: "IP заблокирован", level: "Высокий" },
  { ts: "28.06 11:18", event: "Новый администратор добавлен", ip: "—", action: "admin@jetsale.online", level: "Инфо" },
  { ts: "28.06 09:04", event: "Сканер уязвимостей (npm audit)", ip: "—", action: "0 критических", level: "Инфо" },
  { ts: "27.06 22:50", event: "Превышение rate-limit /api/search", ip: "176.59.X.X", action: "Throttling", level: "Средний" },
];
const levelStyle: Record<string, string> = {
  Высокий: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  Средний: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Инфо: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

function SecurityPage() {
  return (
    <AdminShell title="Безопасность" description="Защита аккаунтов, IP-блокировки и аудит уязвимостей.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Статус защиты" value="Хорошо" icon={ShieldCheck} tone="emerald" />
        <StatCard label="Активных угроз" value="0" icon={ShieldAlert} tone="ocean" />
        <StatCard label="2FA включена" value="12 / 14" icon={Lock} tone="violet" />
        <StatCard label="API-ключей в обращении" value="6" icon={KeyRound} tone="amber" />
      </div>

      <Panel title="Политики безопасности" actions={<Button>Сохранить</Button>}>
        <ul className="divide-y divide-border">
          {[
            { name: "Двухфакторная аутентификация для админов", desc: "Обязательно TOTP/SMS при входе в /admin", on: true },
            { name: "Защита от brute-force", desc: "Блокировка IP после 10 неудачных попыток за 5 минут", on: true },
            { name: "Проверка паролей через HIBP", desc: "Запрет паролей из утечек", on: true },
            { name: "HSTS (HTTP Strict Transport Security)", desc: "Принудительное HTTPS-соединение", on: true },
            { name: "Content Security Policy (CSP)", desc: "Строгая политика загрузки ресурсов", on: false },
          ].map((p) => (
            <li key={p.name} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
              </div>
              <Switch defaultChecked={p.on} />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="События безопасности">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Время", "Событие", "IP / источник", "Действие", "Уровень"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((e, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{e.ts}</td>
                  <td className="px-5 py-3">{e.event}</td>
                  <td className="px-5 py-3 font-mono text-xs">{e.ip}</td>
                  <td className="px-5 py-3 text-muted-foreground">{e.action}</td>
                  <td className="px-5 py-3"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${levelStyle[e.level]}`}>{e.level}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}