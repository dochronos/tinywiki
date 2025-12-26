# TinyWiki Roadmap

## Sprint 1 — Alpha Website + Wiki Structure
- Deploy Next.js site (Vercel)
- Minimal UI layout (header, footer, section cards)
- Wiki index page
- 2–5 initial MDX articles with sources
- Root README + screenshots folder

## Sprint 2 — Providers Dataset (Searchable)
- Google Sheet as source of truth
- CSV export versioned in repo (`data/sheets/`)
- Providers page with search + filters (province, category)
- Basic data quality rules (required fields + last_verified_date)

## Sprint 3 — Power BI Dashboard
- Star-schema model (Providers + Location + Category)
- 2–3 report pages (overview + category/location + pricing refs)
- Export dashboard screenshots into `/bi/powerbi/exports/`
- Add BI README

## Sprint 4 — Calculators + SEO Hardening
- 1 calculator tool (solar savings or tiny-house cost estimate)
- SEO: metadata, OpenGraph, sitemap, robots.txt
- Pages: About + Disclaimer + Sources policy
- “AdSense-ready” checklist (content volume, policies, UX)