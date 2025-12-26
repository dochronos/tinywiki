# TinyWiki (Alpha)

TinyWiki is a minimal, SEO-friendly wiki focused on sustainability and tiny-house resources in Argentina (and LATAM).  
It combines curated articles (with sources) and structured datasets (providers, pricing references) that can be reused for BI (Power BI / Excel / Google Sheets).

## Goals
- Publish a fast, clean, searchable sustainability wiki.
- Build a structured dataset (providers, products, locations, pricing references).
- Showcase real Data/BI work: the same dataset powers the website + Power BI dashboards.
- Keep maintenance low so the project can live long-term.

## Current Status
- ✅ Sprint 1: Alpha website + wiki structure + initial articles
- 🔜 Sprint 2: Providers dataset + filters (search, province, category)
- 🔜 Sprint 3: Power BI dashboard connected to the dataset
- 🔜 Sprint 4: Calculator tools + SEO hardening + AdSense-ready checklist

## Tech Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- MDX content (wiki articles)
- Google Sheets / CSV datasets (future sprints)
- Power BI (dashboards)

## Repo Structure
- `apps/web/` — Next.js web app
- `apps/web/src/content/wiki/` — MDX wiki articles
- `data/sheets/` — CSV exports from Google Sheets (providers, pricing, etc.)
- `bi/powerbi/` — Power BI model + dashboard exports (from Sprint 3)

## Local Development
cd apps/web
npm install
npm run dev

Open: http://localhost:3000

Content Rules

Every curated article must include sources (links).

Prefer practical, step-by-step info.

Keep the UX minimal and scannable (headings, bullets, short paragraphs).

License

MIT.
