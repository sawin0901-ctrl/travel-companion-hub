import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, MapPin, Route as RouteIcon } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI-консьерж путешествий | JetSale" },
      { name: "description", content: "Расскажите, какой отдых ищете, и наш AI подберёт направление, отели и маршрут. Бесплатно." },
    ],
    links: [{ rel: "canonical", href: "/ai" }],
  }),
  component: AiPage,
});

type Mode = "concierge" | "itinerary";

const EXAMPLES: Record<Mode, string[]> = {
  concierge: [
    "Хочу тёплое море в октябре до 80 000 ₽ на двоих, без визы, 7 ночей",
    "Романтика на Новый год до 120 000 ₽ на пару, прямой рейс из Москвы",
    "Семья 2+2, all inclusive у моря в июне, бюджет 200 000 ₽",
  ],
  itinerary: [
    "Маршрут по Стамбулу на 4 дня с детьми",
    "Дубай на 3 дня без шопинг-моллов, активный отдых",
    "Тбилиси и Кахетия на 5 дней с винными турами",
  ],
};

function AiPage() {
  const [mode, setMode] = useState<Mode>("concierge");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const send = async (text?: string) => {
    const q = (text ?? prompt).trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setAnswer("");
    setPrompt(q);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt: q }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { text: string };
      setAnswer(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось получить ответ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ocean">
          <Sparkles className="h-4 w-4" />
          AI-сервис JetSale
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">
          {mode === "concierge" ? "AI-консьерж путешествий" : "AI-генератор маршрутов"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {mode === "concierge"
            ? "Опишите идеальный отдых — подберём направление, отель и сезон."
            : "Назовите город и дни — соберём маршрут на каждый день."}
        </p>

        <div className="mt-6 inline-flex rounded-xl border border-border bg-card p-1">
          <button
            onClick={() => { setMode("concierge"); setAnswer(""); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "concierge" ? "bg-ocean text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" /> Консьерж
          </button>
          <button
            onClick={() => { setMode("itinerary"); setAnswer(""); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "itinerary" ? "bg-ocean text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <RouteIcon className="h-4 w-4" /> Маршрут
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={EXAMPLES[mode][0]}
            rows={4}
            className="resize-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES[mode].map((ex) => (
                <button
                  key={ex}
                  onClick={() => send(ex)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-ocean hover:text-ocean"
                >
                  {ex.length > 60 ? ex.slice(0, 60) + "…" : ex}
                </button>
              ))}
            </div>
            <Button onClick={() => send()} disabled={loading || !prompt.trim()} className="bg-coral hover:bg-coral/90">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Подбираем…" : "Подобрать"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {answer && (
          <article className="mt-6 whitespace-pre-wrap rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed shadow-soft">
            {answer}
          </article>
        )}

        <p className="mt-8 text-xs text-muted-foreground">
          AI-ответы носят рекомендательный характер. Проверяйте визовые правила и цены перед бронированием.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}