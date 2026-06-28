import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности | JetSale" },
      { name: "description", content: "Политика обработки персональных данных JetSale в соответствии с 152-ФЗ." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/legal/privacy" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-muted-foreground">Редакция от 1 июня 2026 года</p>

        <div className="prose prose-sm mt-8 max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="font-display text-xl font-bold">1. Общие положения</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Настоящая Политика определяет порядок обработки персональных данных Оператором — сервисом JetSale
              (домен jetsale.online, далее — «Сервис») в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
              «О персональных данных».
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">2. Какие данные мы собираем</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed">
              <li>email и имя при регистрации и подписке на ценовые алерты;</li>
              <li>параметры поиска (направления, даты, число пассажиров);</li>
              <li>cookie-идентификаторы, UTM-метки, sub_id партнёрских ссылок;</li>
              <li>IP-адрес, тип устройства, версия браузера — для аналитики Яндекс.Метрики;</li>
              <li>история кликов по партнёрским предложениям — для учёта комиссии.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">3. Цели обработки</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Поиск туристических услуг, направление пользователя на сайт партнёра, отправка уведомлений о
              снижении цены, аналитика и улучшение Сервиса, выполнение требований законодательства РФ.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">4. Где хранятся данные</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Все персональные данные граждан РФ хранятся и обрабатываются на серверах, расположенных на территории
              Российской Федерации (Yandex.Cloud, дата-центры Москва и Владимир), как того требует ст. 18 п. 5 152-ФЗ.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">5. Передача третьим лицам</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Мы передаём обезличенные данные партнёрам (Travelpayouts, Ostrovok, Yandex.Travel) исключительно для
              выполнения брони. Продажа данных третьим лицам не осуществляется.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">6. Ваши права</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Вы имеете право запросить копию своих данных, потребовать их удаления или ограничить обработку.
              Запросы направляйте на <a href="mailto:privacy@jetsale.online" className="text-ocean underline">privacy@jetsale.online</a>.
              Срок ответа — не более 30 дней.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">7. Контакты Оператора</h2>
            <p className="mt-2 text-sm leading-relaxed">
              ООО «ДжетСейл», ИНН 7700000000, юр. адрес: 115035, г. Москва, ул. Пятницкая, д. 1.<br />
              Email: <a href="mailto:privacy@jetsale.online" className="text-ocean underline">privacy@jetsale.online</a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});