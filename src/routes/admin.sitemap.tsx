import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, Download, ExternalLink } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Map, FileText, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/sitemap")({ component: SitemapPage });

const URLS = [
  { loc: "https://jetsale.online/", changefreq: "daily", priority: "1.0", lastmod: "28.06.2026" },
  { loc: "https://jetsale.online/flights", changefreq: "hourly", priority: "0.9", lastmod: "28.06.2026" },
  { loc: "https://jetsale.online/hotels", changefreq: "hourly", priority: "0.9", lastmod: "28.06.2026" },
  { loc: "https://jetsale.online/destinations/santorini", changefreq: "weekly", priority: "0.7", lastmod: "27.06.2026" },
  { loc: "https://jetsale.online/destinations/bali", changefreq: "weekly", priority: "0.7", lastmod: "27.06.2026" },
];

function SitemapPage() {
  return (
    <AdminShell
      title="Sitemap"
      description="Карта сайта /sitemap.xml — генерируется автоматически и отправляется в Яндекс и Google."
      actions={
        <>
          <Button variant="outline" asChild>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Открыть XML
            </a>
          </Button>
          <Button><RefreshCw className="h-4 w-4" /> Пересоздать</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="URL в карте" value="148" icon={Map} tone="ocean" />
        <StatCard label="Размер файла" value="42 КБ" icon={FileText} tone="violet" />
        <StatCard label="Последняя генерация" value="2 ч назад" icon={Clock} tone="amber" />
      </div>

      <Panel title="URL в карте сайта" actions={<Button variant="ghost" size="sm"><Download className="h-4 w-4" /> Скачать</Button>}>
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-2 font-medium">URL</th>
                <th className="px-5 py-2 font-medium">Частота</th>
                <th className="px-5 py-2 font-medium">Приоритет</th>
                <th className="px-5 py-2 font-medium">Обновлено</th>
              </tr>
            </thead>
            <tbody>
              {URLS.map((u) => (
                <tr key={u.loc} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs">{u.loc}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.changefreq}</td>
                  <td className="px-5 py-3">{u.priority}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.lastmod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}