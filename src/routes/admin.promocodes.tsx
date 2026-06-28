import { createFileRoute } from "@tanstack/react-router";
import { Plus, Copy, Pencil, Trash2 } from "lucide-react";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/promocodes")({ component: PromocodesPage });

const PROMO = [
  { code: "SUMMER15", discount: "-15%", scope: "Все направления", uses: "284 / 1000", expires: "31.08.2026", active: true },
  { code: "TURKEY10", discount: "-10%", scope: "Отели Турции", uses: "92 / 500", expires: "30.09.2026", active: true },
  { code: "WELCOME500", discount: "-500 ₽", scope: "Первое бронирование", uses: "1 482 / ∞", expires: "—", active: true },
  { code: "FLY2026", discount: "-7%", scope: "Авиабилеты", uses: "612 / 2000", expires: "31.12.2026", active: true },
  { code: "NEWYEAR", discount: "-20%", scope: "Туры на январь", uses: "0 / 300", expires: "10.01.2027", active: false },
];

function PromocodesPage() {
  return (
    <AdminShell
      title="Промокоды"
      description="Управление скидочными кодами и кампаниями."
      actions={<Button><Plus className="h-4 w-4" /> Новый промокод</Button>}
    >
      <Panel>
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Код", "Скидка", "Условия", "Использовано", "Действует до", "Активен", ""].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROMO.map((p) => (
                <tr key={p.code} className="border-t border-border">
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-2 py-1 font-mono text-xs font-semibold">
                      {p.code}
                      <button className="text-muted-foreground hover:text-foreground" title="Скопировать">
                        <Copy className="h-3 w-3" />
                      </button>
                    </span>
                  </td>
                  <td className="px-5 py-3 font-bold text-coral">{p.discount}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.scope}</td>
                  <td className="px-5 py-3">{p.uses}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.expires}</td>
                  <td className="px-5 py-3"><Switch defaultChecked={p.active} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500"><Trash2 className="h-3.5 w-3.5" /></Button>
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