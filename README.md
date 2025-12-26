# TinyWiki (Alpha)

TinyWiki is a minimal, SEO-friendly wiki focused on sustainability and tiny-house resources in Argentina (and LATAM).
It combines curated articles (with sources) and structured datasets (providers, pricing references) that can be reused for BI (Power BI / Excel / Google Sheets).

## Why this project
- Build a real, long-lived side project with monetization potential.
- Showcase Data/BI skills with a real dataset + Power BI dashboards.
- Keep the UX minimal and the maintenance low.

## Roadmap (First Month)
- **Sprint 1:** Website alpha + wiki structure + initial articles
- **Sprint 2:** Providers dataset + searchable filters (province, category)
- **Sprint 3:** Power BI dashboard connected to the dataset
- **Sprint 4:** Calculator tools + SEO hardening + AdSense-ready checklist

## Tech Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- MDX content (wiki articles)
- Google Sheets / CSV datasets (planned)
- Power BI (planned)

## Repo Structure
- `apps/web/` — Next.js web app
- `apps/web/src/content/wiki/` — MDX wiki articles
- `data/sheets/` — CSV exports from Google Sheets (future)
- `bi/powerbi/` — Power BI model + dashboard exports (future)
- `docs/` — roadmap + screenshots

## Local Development
cd apps/web
npm install
npm run dev
Open: http://localhost:3000

Content Rules

Curated articles must include sources.

Prefer practical, step-by-step information.

Keep content scannable (headings, bullets, short paragraphs).

License

MIT.