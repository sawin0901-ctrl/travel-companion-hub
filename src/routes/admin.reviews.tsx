import { createFileRoute } from "@tanstack/react-router";
import { Star, Check, X, Flag } from "lucide-react";
import { AdminShell, Panel, StatCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/reviews")({ component: ReviewsPage });

const REVIEWS = [
  { user: "Анна К.", date: "28.06.2026", rating: 5, target: "Отель Rixos Premium Belek", text: "Отличный сервис, бронирование заняло 3 минуты. Цена ниже, чем в других агрегаторах.", status: "Новый" },
  { user: "Иван П.", date: "27.06.2026", rating: 4, target: "Авиа Москва — Анталья", text: "Удобный поиск, но не хватает фильтра по конкретному терминалу прилёта.", status: "Опубликован" },
  { user: "Мария С.", date: "26.06.2026", rating: 2, target: "Аренда авто Дубай", text: "При оформлении на сайте партнёра цена выросла на 15%. Будьте внимательны.", status: "На модерации" },
  { user: "Дмитрий В.", date: "25.06.2026", rating: 5, target: "Тур в Сочи, 5 ночей", text: "Подобрал тур за 10 минут, оплатил через СБП. Всё прошло гладко.", status: "Опубликован" },
];

function ReviewsPage() {
  return (
    <AdminShell title="Отзывы" description="Модерация и публикация отзывов пользователей.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Средняя оценка" value="4.7" icon={Star} tone="amber" />
        <StatCard label="Всего отзывов" value="1 284" delta="+42" icon={Star} tone="ocean" />
        <StatCard label="На модерации" value="18" icon={Flag} tone="coral" />
        <StatCard label="Отклонено за месяц" value="6" icon={X} tone="violet" />
      </div>
      <Panel title="Лента отзывов">
        <div className="space-y-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {r.user}
                    <span className="text-xs font-normal text-muted-foreground">· {r.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.target}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s < r.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} />
                    ))}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    r.status === "Опубликован" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    r.status === "Новый" ? "bg-sky-500/10 text-sky-600 dark:text-sky-400" :
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}>{r.status}</span>
                </div>
              </div>
              <p className="mt-3 text-sm">{r.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm"><Check className="h-3.5 w-3.5" /> Одобрить</Button>
                <Button size="sm" variant="outline"><X className="h-3.5 w-3.5" /> Отклонить</Button>
                <Button size="sm" variant="ghost"><Flag className="h-3.5 w-3.5" /> Пометить</Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AdminShell>
  );
}