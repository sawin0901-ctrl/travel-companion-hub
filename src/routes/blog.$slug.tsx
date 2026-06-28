import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BLOG_POSTS, getPost, type BlogPost } from "@/lib/blog-posts";
import { DESTINATIONS } from "@/lib/destinations";
import { FLIGHT_ROUTES } from "@/lib/flight-routes";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Статья не найдена" }] };
    const p = loaderData;
    return {
      meta: [
        { title: `${p.title} | JetSale Блог` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: p.date },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            image: p.image,
            datePublished: p.date,
            author: { "@type": "Organization", name: "JetSale" },
            publisher: {
              "@type": "Organization",
              name: "JetSale",
              logo: { "@type": "ImageObject", url: "https://jetsale.online/logo.png" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
              { "@type": "ListItem", position: 2, name: "Блог", item: "/blog" },
              { "@type": "ListItem", position: 3, name: p.title, item: `/blog/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Статья не найдена</h1>
      <Link to="/blog" className="mt-4 inline-block text-ocean underline">
        Все статьи
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData() as BlogPost;
  const related = BLOG_POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const linkedDests = DESTINATIONS.filter((d) => p.relatedDestinations?.includes(d.slug));
  const linkedRoutes = FLIGHT_ROUTES.filter((r) => p.relatedRoutes?.includes(r.slug));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative h-[45vh] min-h-[340px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative container mx-auto flex h-full flex-col justify-end px-4 pb-10 text-white md:px-6">
          <Link to="/blog" className="mb-3 inline-flex w-fit items-center gap-2 text-sm opacity-80 hover:underline">
            <ArrowLeft className="h-4 w-4" /> К блогу
          </Link>
          <div className="flex items-center gap-3 text-xs opacity-90">
            <span className="rounded-full bg-white/15 px-2 py-0.5 backdrop-blur">{p.category}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readMin} мин</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(p.date).toLocaleDateString("ru-RU")}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">{p.title}</h1>
        </div>
      </section>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <p className="text-lg leading-relaxed text-foreground/90">{p.intro}</p>
        <div className="mt-8 space-y-8">
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl font-bold">{s.h}</h2>
              <p className="mt-3 text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>

        {(linkedDests.length > 0 || linkedRoutes.length > 0) && (
          <section className="mt-12 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-bold">Что забронировать по теме</h3>
            {linkedDests.length > 0 && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Отели в стране</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {linkedDests.map((d) => (
                    <Link
                      key={d.slug}
                      to="/oteli/$country"
                      params={{ country: d.slug }}
                      className="rounded-full border border-border bg-background px-4 py-1.5 text-sm transition-colors hover:border-ocean/40 hover:bg-ocean/5"
                    >
                      <span className="mr-1.5">{d.emoji}</span>
                      {d.country} · {d.avgHotel}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {linkedRoutes.length > 0 && (
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Авиабилеты</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {linkedRoutes.map((r) => (
                    <Link
                      key={r.slug}
                      to="/aviabilety/$route"
                      params={{ route: r.slug }}
                      className="rounded-full border border-border bg-background px-4 py-1.5 text-sm transition-colors hover:border-ocean/40 hover:bg-ocean/5"
                    >
                      {r.from} — {r.to} · от {r.minPrice.toLocaleString("ru-RU")} ₽
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="mt-16 border-t border-border pt-10">
          <h3 className="font-display text-xl font-bold">Читайте также</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-soft"
              >
                <div className="text-xs text-ocean">{r.category}</div>
                <div className="mt-1 font-semibold leading-snug">{r.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}