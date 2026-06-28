import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Публичная оферта | JetSale" },
      { name: "description", content: "Условия использования сервиса JetSale: партнёрская модель, отказ от ответственности, претензии." },
    ],
    links: [{ rel: "canonical", href: "/legal/terms" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Публичная оферта (пользовательское соглашение)</h1>
        <p className="mt-2 text-sm text-muted-foreground">Редакция от 1 июня 2026 года</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-xl font-bold">1. Предмет соглашения</h2>
            <p className="mt-2">
              Сервис JetSale (jetsale.online) предоставляет информационно-поисковые услуги в области туризма:
              сравнение цен на авиабилеты, отели и иное жильё. Сервис не является туроператором и не оказывает
              туристических услуг напрямую.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">2. Партнёрская модель</h2>
            <p className="mt-2">
              JetSale работает по партнёрской (аффилиатной) модели. Бронирование и оплата производятся на сайтах
              партнёров (Travelpayouts, Ostrovok, Yandex.Travel, Tripster и др.). JetSale получает комиссионное
              вознаграждение от партнёров за переход пользователя.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">3. Ответственность</h2>
            <p className="mt-2">
              JetSale не несёт ответственности за исполнение обязательств партнёрами: задержки рейсов, отмену броней,
              изменение цен после перехода, качество услуг отелей. Все претензии направляются непосредственно
              партнёру, через сайт которого совершено бронирование.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">4. Цены и валюта</h2>
            <p className="mt-2">
              Цены отображаются в российских рублях (RUB) по курсу ЦБ РФ на момент показа и могут отличаться от
              финальных цен партнёра. Итоговая стоимость определяется на странице бронирования партнёра.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">5. Интеллектуальная собственность</h2>
            <p className="mt-2">
              Все материалы сайта (дизайн, тексты, логотип JetSale, фотографии) защищены авторским правом и не могут
              быть скопированы без письменного разрешения.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">6. Претензионный порядок</h2>
            <p className="mt-2">
              Споры рассматриваются в досудебном порядке. Срок ответа на претензию — 30 дней. При недостижении
              соглашения — Арбитражный суд г. Москвы. Применяется законодательство РФ.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});