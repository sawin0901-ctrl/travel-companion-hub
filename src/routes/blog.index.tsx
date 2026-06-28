import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Блог JetSale — гайды для путешественников" },
      { name: "description", content: "Визы, дешёвые билеты, страховки, оплата за границей. Актуальные гайды для российских туристов." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10 md:px-6 md:py-16">
        <h1 className="font-display text-3xl font-bold md:text-5xl">Блог о путешествиях</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Практические гайды: визы, оплата за границей, выбор отелей и страховки.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="aspect-[16/10] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-ocean/10 px-2 py-0.5 font-medium text-ocean">{p.category}</span>
                  <Clock className="h-3 w-3" />
                  <span>{p.readMin} мин</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug">{p.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});