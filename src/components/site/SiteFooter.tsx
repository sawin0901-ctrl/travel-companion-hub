import { Plane, Instagram, Send, Youtube, Facebook } from "lucide-react";

const columns = [
  {
    title: "Услуги",
    links: ["Авиабилеты", "Отели", "Квартиры посуточно", "Аренда авто", "Трансферы", "Страховки", "Экскурсии", "Туры"],
  },
  {
    title: "Компания",
    links: ["О нас", "Партнёрская программа", "Реферальная программа", "Пресс-центр", "Карьера", "Контакты"],
  },
  {
    title: "Помощь",
    links: ["Центр поддержки", "Как бронировать", "Возврат и обмен", "Правила и условия", "Политика конфиденциальности", "Cookies"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-ocean text-ocean-foreground">
              <Plane className="h-4 w-4 -rotate-45" />
            </span>
            <span className="font-display text-lg font-semibold">JetSale</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Современный партнёрский сервис путешествий. Сравниваем предложения 850+ партнёров и находим лучшую цену на авиабилеты, жильё, авто и страховки.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Send, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-ocean hover:text-ocean"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto grid gap-2 px-4 py-6 text-xs text-muted-foreground md:px-6">
          <p>
            ООО «Джетсейл», ОГРН 0000000000000, ИНН 0000000000. Сервер расположен на территории Российской Федерации. Цены указаны в российских рублях (₽).
          </p>
          <p>
            Обработка персональных данных осуществляется в соответствии с Федеральным законом № 152-ФЗ «О персональных данных». Используя сайт, вы соглашаетесь с{" "}
            <a href="#" className="underline hover:text-foreground">Политикой конфиденциальности</a> и{" "}
            <a href="#" className="underline hover:text-foreground">Согласием на обработку ПДн</a>.
          </p>
          <div className="flex flex-col items-start justify-between gap-2 pt-2 md:flex-row md:items-center">
            <p>© 2026 JetSale. Сервис работает по партнёрской (affiliate) модели.</p>
            <p>Время по МСК (UTC+3) · Сделано с любовью к путешествиям ✈️</p>
          </div>
        </div>
      </div>
    </footer>
  );
}