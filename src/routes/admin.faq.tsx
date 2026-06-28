import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminShell, Panel } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/admin/faq")({ component: FaqPage });

const CATS = ["Бронирование", "Оплата", "Возврат", "Документы", "Партнёры"];
const FAQ = [
  { cat: "Бронирование", q: "Как забронировать билет?", a: "Введите направления и даты в поисковой строке, выберите подходящий рейс и перейдите на сайт партнёра для оплаты." },
  { cat: "Оплата", q: "Какие способы оплаты поддерживаются?", a: "Мир, Visa, Mastercard, СБП, ЮMoney, Tinkoff Pay и Apple/Google Pay через партнёрские шлюзы." },
  { cat: "Возврат", q: "Можно ли вернуть невозвратный билет?", a: "Только при отмене рейса перевозчиком или по медицинским показаниям с подтверждающими документами." },
  { cat: "Документы", q: "Нужна ли виза в Турцию?", a: "Гражданам РФ виза не нужна для поездок до 60 дней с туристической целью." },
];

function FaqPage() {
  return (
    <AdminShell
      title="FAQ"
      description="Часто задаваемые вопросы и ответы. Поддерживают SEO-разметку FAQPage."
      actions={<Button><Plus className="h-4 w-4" /> Новый вопрос</Button>}
    >
      <Panel>
        <div className="mb-4 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-ocean hover:text-ocean">
              {c}
            </button>
          ))}
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-left">
                <span className="flex flex-1 items-center gap-3">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">{f.cat}</span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{f.a}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Редактировать</Button>
                  <Button variant="ghost" size="sm" className="text-rose-500"><Trash2 className="h-3.5 w-3.5" /> Удалить</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Panel>
    </AdminShell>
  );
}