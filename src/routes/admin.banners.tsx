import { createFileRoute } from "@tanstack/react-router";
import { Plus, Image as ImageIcon, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/banners")({ component: BannersPage });

const BANNERS = [
  { title: "Hero — Лето 2026", placement: "Главная / Hero", size: "1920×900", clicks: 12480, active: true },
  { title: "Промо Турция -25%", placement: "Главная / средний блок", size: "1440×400", clicks: 3210, active: true },
  { title: "Подписка на рассылку", placement: "Футер", size: "1200×280", clicks: 612, active: true },
  { title: "Зимний сезон (черновик)", placement: "—", size: "1920×800", clicks: 0, active: false },
];

function BannersPage() {
  return (
    <AdminShell
      title="Баннеры"
      description="Управляйте hero-блоками, промо-баннерами и попапами на сайте."
      actions={<Button><Plus className="h-4 w-4" /> Загрузить баннер</Button>}
    >
      <div className="grid gap-4">
        {BANNERS.map((b, i) => (
          <Panel key={b.title}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="grid h-20 w-32 place-items-center rounded-xl bg-gradient-to-br from-ocean/20 to-coral/20 text-muted-foreground">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-semibold">{b.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{b.placement} · {b.size}</p>
                <p className="mt-2 text-xs">
                  <span className="font-semibold">{b.clicks.toLocaleString("ru-RU")}</span>{" "}
                  <span className="text-muted-foreground">кликов за 30 дней</span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={i === 0}><ArrowUp className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={i === BANNERS.length - 1}><ArrowDown className="h-3.5 w-3.5" /></Button>
              </div>
              <Switch defaultChecked={b.active} />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </Panel>
        ))}
      </div>
    </AdminShell>
  );
}