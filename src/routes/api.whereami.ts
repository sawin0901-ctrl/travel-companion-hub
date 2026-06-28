import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/whereami")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "";
        try {
          const res = await fetch(
            `https://www.travelpayouts.com/whereami?locale=ru&ip=${ip}`,
            { signal: AbortSignal.timeout(4000) },
          );
          if (!res.ok) return new Response("{}", { headers: { "Content-Type": "application/json" } });
          const d = await res.json();
          return new Response(
            JSON.stringify({ iata: d.iata, name: d.name, country: d.country_name }),
            { headers: { "Content-Type": "application/json" } },
          );
        } catch {
          return new Response("{}", { headers: { "Content-Type": "application/json" } });
        }
      },
    },
  },
});
