import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

type CityRow = {
  code: string;
  name: string;
  country_code: string;
  coordinates?: { lat: number; lon: number };
};

let _cities: CityRow[] | null = null;
let _loadedAt = 0;

async function getCities(): Promise<CityRow[]> {
  if (_cities && Date.now() - _loadedAt < 86_400_000) return _cities;
  const res = await fetch("https://api.travelpayouts.com/data/ru/cities.json", {
    signal: AbortSignal.timeout(10_000),
  });
  _cities = await res.json();
  _loadedAt = Date.now();
  return _cities!;
}

export const Route = createFileRoute("/api/cities")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
        if (q.length < 2) {
          return new Response("[]", { headers: { "Content-Type": "application/json" } });
        }
        try {
          const cities = await getCities();
          const ql = q.toLowerCase();
          const results = cities
            .filter(
              (c) =>
                c.name?.toLowerCase().includes(ql) ||
                c.code?.toLowerCase().startsWith(ql),
            )
            .slice(0, 8)
            .map((c) => ({ code: c.code, name: c.name, country: c.country_code }));
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response("[]", { headers: { "Content-Type": "application/json" } });
        }
      },
    },
  },
});
