# Naqsh — graphic design studio website

Naqsh (نقش) means an imprint, a pattern, a map. This is the studio's sales site: services with starting prices, packages, payment options for Pakistan and abroad, and a project brief form that saves to Supabase.

**Stack:** Next.js 16 (App Router) · React 19 · Motion · Supabase · deployed on Vercel

## Run locally

```bash
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev                  # http://localhost:3000
```

## Edit the content

Everything clients read lives in **`lib/site.ts`**:

- `site.contact` — email, WhatsApp, Instagram, Behance, Fiverr, Contra links (empty values are hidden)
- `serviceGroups` — every service, its deliverables, turnaround and starting price in PKR
- `packages` — the three bundles
- `projects` — the Delivered work section. Put images in `public/work/` (WebP, ~1600px max) and add an entry; mark one `featured: true` for the large case study
- `payments`, `process`, `faqs`
- `usdRate` — PKR→USD rate used for the approximate dollar prices

Push to `main` and Vercel redeploys automatically.

## Connect the brief form to Supabase

1. Create a Supabase project (or reuse one).
2. Open **SQL Editor**, paste `supabase/schema.sql`, run it. This creates the `briefs` table with row-level security on.
3. In **Project settings → API**, copy the Project URL and the `service_role` key.
4. In Vercel → Project → **Settings → Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Redeploy. New briefs appear in **Table editor → briefs**, each with a reference like `NQ-1001`. Track them with the `status` column (`new → quoted → deposit_paid → in_progress → delivered → paid`).

The service-role key is only used on the server (`app/api/brief/route.ts`); it never reaches the browser.

## Payments

No card processor yet (Stripe does not onboard Pakistan-registered businesses). The site sends clients through:

- **Pakistan:** bank transfer, JazzCash, Easypaisa — account details go out with each quote
- **International:** Payoneer payment requests, or a Fiverr order

## Project map

```
app/
  page.tsx             page composition + JSON-LD for search engines
  layout.tsx           fonts, metadata
  globals.css          the whole design system (lapis + gold)
  api/brief/route.ts   validates and stores briefs
  icon.svg, opengraph-image.tsx
components/            Nav, Hero, Work, Services, Motion (scroll reveals, marquee, progress bar), Packages, Sections, BriefForm, Mark
lib/
  site.ts              all content
  brief.ts             form schema
  mark.ts, pakistan.ts geometry of the Naqsh logo
public/naqsh-mark.svg  logo file for print / social
public/work/           portfolio images
supabase/schema.sql
```

## The logo

A map of Pakistan. The outline comes from Natural Earth (world-atlas, 50m) and is generated into `lib/pakistan.ts`. Contour lines rise toward the Karakoram, Nanga Parbat and the Hindu Kush in the north, the Indus runs in gold from the mountains to the Arabian Sea, and a small eight-point khatam star marks Islamabad. At small sizes (nav, favicon, footer) the country is a solid silhouette with the Indus cut through it. `public/naqsh-mark.svg` is the standalone file.
