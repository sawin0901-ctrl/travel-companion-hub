import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { HardDriveDownload, Cloud, Clock, CheckCircle2, Download, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/backups")({ component: BackupsPage });

const BACKUPS = [
  { ts: "28.06.2026 03:00", type: "Полный", size: "4.2 ГБ", storage: "Yandex Object Storage (ru-msk-1)", status: "Успех" },
  { ts: "27.06.2026 03:00", type: "Полный", size: "4.1 ГБ", storage: "Yandex Object Storage (ru-msk-1)", status: "Успех" },
  { ts: "26.06.2026 03:00", type: "Полный", size: "4.1 ГБ", storage: "Yandex Object Storage (ru-msk-1)", status: "Успех" },
  { ts: "28.06.2026 12:00", type: "Инкрементальный", size: "184 МБ", storage: "Yandex Object Storage (ru-msk-1)", status: "Успех" },
  { ts: "28.06.2026 06:00", type: "Инкрементальный", size: "212 МБ", storage: "Yandex Object Storage (ru-msk-1)", status: "Успех" },
  { ts: "25.06.2026 03:00", type: "Полный", size: "—", storage: "Yandex Object Storage (ru-msk-1)", status: "Ошибка" },
];

function BackupsPage() {
  return (
    <AdminShell
      title="Бэкапы"
      description="Резервные копии PostgreSQL и файлового хранилища. Соответствие 152-ФЗ — хранение в РФ."
      actions={<Button><HardDriveDownload className="h-4 w-4" /> Создать сейчас</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Последний бэкап" value="2 ч назад" icon={Clock} tone="ocean" />
        <StatCard label="Успешных за 30 дней" value="118 / 120" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Общий объём" value="142 ГБ" icon={Cloud} tone="violet" />
        <StatCard label="RPO" value="1 час" icon={HardDriveDownload} tone="amber" />
      </div>

      <Panel title="История бэкапов">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Дата", "Тип", "Размер", "Хранилище", "Статус", ""].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BACKUPS.map((b, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs">{b.ts}</td>
                  <td className="px-5 py-3">{b.type}</td>
                  <td className="px-5 py-3">{b.size}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.storage}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      b.status === "Успех" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                      "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={b.status !== "Успех"}><Download className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={b.status !== "Успех"}><RotateCcw className="h-3.5 w-3.5" /></Button>
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