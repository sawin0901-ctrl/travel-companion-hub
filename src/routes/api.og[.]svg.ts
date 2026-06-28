import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Динамическая OG-картинка 1200×630 (SVG → Telegram/VK/X кэшируют).
// Параметры: ?t=Заголовок&s=Подзаголовок&e=🇹🇷
export const Route = createFileRoute("/api/og.svg")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const title = (url.searchParams.get("t") ?? "JetSale").slice(0, 90);
        const subtitle = (url.searchParams.get("s") ?? "Авиабилеты и отели со скидкой до 70%").slice(0, 120);
        const emoji = (url.searchParams.get("e") ?? "✈️").slice(0, 8);

        const esc = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

        const wrap = (s: string, max: number): string[] => {
          const words = s.split(/\s+/);
          const lines: string[] = [];
          let cur = "";
          for (const w of words) {
            if ((cur + " " + w).trim().length > max) {
              if (cur) lines.push(cur);
              cur = w;
            } else cur = (cur ? cur + " " : "") + w;
          }
          if (cur) lines.push(cur);
          return lines.slice(0, 3);
        };

        const titleLines = wrap(title, 28);
        const subLines = wrap(subtitle, 60);

        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B3D91"/>
      <stop offset="55%" stop-color="#1E63D6"/>
      <stop offset="100%" stop-color="#FF6B6B"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g opacity="0.12" stroke="white" stroke-width="2" fill="none">
    <circle cx="1000" cy="120" r="220"/>
    <circle cx="1000" cy="120" r="320"/>
    <circle cx="1000" cy="120" r="420"/>
  </g>
  <text x="80" y="120" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="36" fill="white" opacity="0.95" font-weight="700">JetSale</text>
  <text x="220" y="120" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="22" fill="white" opacity="0.7">jetsale.online</text>
  <text x="80" y="260" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="120">${esc(emoji)}</text>
  ${titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${340 + i * 70}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="58" font-weight="800" fill="white">${esc(l)}</text>`,
    )
    .join("\n  ")}
  ${subLines
    .map(
      (l, i) =>
        `<text x="80" y="${340 + titleLines.length * 70 + 30 + i * 36}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="28" fill="white" opacity="0.9">${esc(l)}</text>`,
    )
    .join("\n  ")}
  <rect x="80" y="555" width="220" height="50" rx="25" fill="white"/>
  <text x="190" y="588" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="700" fill="#0B3D91">Найти →</text>
</svg>`;

        return new Response(svg, {
          headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
          },
        });
      },
    },
  },
});