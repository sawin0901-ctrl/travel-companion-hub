import { createFileRoute } from "@tanstack/react-router";
import { Save, Globe, Search, FileCode } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/seo")({ component: SeoPage });

const PAGES = [
  { path: "/", title: "JetSale — авиабилеты, отели и туры по всему миру", desc: "Поиск и сравнение авиабилетов, отелей и туров.", indexed: true },
  { path: "/flights", title: "Авиабилеты от 4 990 ₽ — JetSale", desc: "Сравнение тарифов 700+ авиакомпаний.", indexed: true },
  { path: "/hotels", title: "Отели и апартаменты — 1.2 млн вариантов — JetSale", desc: "Бронирование без переплат и комиссий.", indexed: true },
];

function SeoPage() {
  return (
    <AdminShell title="SEO" description="Метаданные страниц, верификация Яндекс.Вебмастера и Google Search Console.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Страниц в индексе Яндекс" value="148" delta="+12" icon={Search} tone="ocean" />
        <StatCard label="Страниц в индексе Google" value="156" delta="+18" icon={Globe} tone="emerald" />
        <StatCard label="Средняя позиция" value="14.2" delta="-1.4" icon={FileCode} tone="amber" />
      </div>

      <Panel title="Глобальные настройки" actions={<Button><Save className="h-4 w-4" /> Сохранить</Button>}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Базовый URL</Label>
            <Input className="mt-1.5" defaultValue="https://jetsale.online" />
          </div>
          <div>
            <Label>Яндекс.Вебмастер код</Label>
            <Input className="mt-1.5" placeholder="abc123def456" />
          </div>
          <div>
            <Label>Google Search Console</Label>
            <Input className="mt-1.5" placeholder="google-site-verification=…" />
          </div>
          <div>
            <Label>Яндекс.Метрика ID</Label>
            <Input className="mt-1.5" placeholder="00000000" />
          </div>
          <div className="md:col-span-2">
            <Label>OG-описание по умолчанию</Label>
            <Textarea className="mt-1.5" defaultValue="JetSale — туристический маркетплейс. Авиа, отели, аренда авто, страховки и экскурсии." />
          </div>
        </div>
      </Panel>

      <Panel title="Метаданные страниц">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-2 font-medium">URL</th>
                <th className="px-5 py-2 font-medium">Title</th>
                <th className="px-5 py-2 font-medium">Description</th>
                <th className="px-5 py-2 font-medium">Индексация</th>
              </tr>
            </thead>
            <tbody>
              {PAGES.map((p) => (
                <tr key={p.path} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs">{p.path}</td>
                  <td className="px-5 py-3 max-w-xs truncate">{p.title}</td>
                  <td className="px-5 py-3 max-w-md truncate text-muted-foreground">{p.desc}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {p.indexed ? "Открыта" : "Закрыта"}
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