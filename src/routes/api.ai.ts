import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "LOVABLE_API_KEY не настроен" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: { mode?: string; prompt?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }
        const prompt = (body.prompt ?? "").toString().slice(0, 2000).trim();
        const mode = body.mode === "itinerary" ? "itinerary" : "concierge";
        if (!prompt) {
          return new Response(JSON.stringify({ error: "Пустой запрос" }), { status: 400 });
        }

        const system =
          mode === "itinerary"
            ? "Ты — опытный гид-планировщик. По описанию города и количеству дней составь маршрут с разбивкой по дням: утро, день, вечер. Указывай районы, ориентировочную стоимость в рублях, советы по транспорту. Отвечай по-русски, лаконично, структурировано."
            : "Ты — туристический консьерж JetSale. Подбираешь направления для российских путешественников. На основе бюджета, дат и пожеланий предложи 2–3 направления с городами, типом отелей, средними ценами в рублях, визой и сезоном. Отвечай по-русски, структурировано, без воды.";

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: system },
                { role: "user", content: prompt },
              ],
            }),
          });

          if (!upstream.ok) {
            const txt = await upstream.text();
            return new Response(
              JSON.stringify({ error: `AI gateway: ${upstream.status} ${txt.slice(0, 200)}` }),
              { status: 502, headers: { "Content-Type": "application/json" } },
            );
          }

          const data = (await upstream.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const text = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ text }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "AI error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});