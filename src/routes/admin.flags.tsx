import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/flags")({ component: FlagsPage });

const FLAGS = [
  { key: "new_search_ui", desc: "Новый UI поиска с AI-подсказками", rollout: 30, on: true, env: "prod" },
  { key: "ai_recommendations", desc: "Персональные рекомендации направлений", rollout: 100, on: true, env: "prod" },
  { key: "pay_sbp", desc: "Оплата через СБП", rollout: 100, on: true, env: "prod" },
  { key: "loyalty_program", desc: "Программа лояльности JetSale Club", rollout: 10, on: true, env: "prod" },
  { key: "dark_mode_default", desc: "Тёмная тема по умолчанию", rollout: 0, on: false, env: "stage" },
  { key: "chatgpt_concierge", desc: "AI-консьерж в чате поддержки", rollout: 5, on: true, env: "prod" },
];

function FlagsPage() {
  return (
    <AdminShell
      title="Feature Flags"
      description="Поэтапный выпуск новых функций. Контроль процента пользователей и окружения."
      actions={<Button><Plus className="h-4 w-4" /> Новый флаг</Button>}
    >
      <Panel>
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Ключ", "Описание", "Окружение", "Roll-out", "Активен"].map((h) => (
                  <th key={h} className="px-5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FLAGS.map((f) => (
                <tr key={f.key} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs font-semibold">{f.key}</td>
                  <td className="px-5 py-3 text-muted-foreground">{f.desc}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      f.env === "prod" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}>{f.env}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-gradient-to-r from-ocean to-coral" style={{ width: `${f.rollout}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{f.rollout}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Switch defaultChecked={f.on} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AdminShell>
  );
}