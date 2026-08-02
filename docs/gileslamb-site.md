# gileslamb.com — Site Reference

Canonical map of the gileslamb.com website: all routes, pages, content, infrastructure and conventions. Updated as the site changes. This is the document Claude Code reads at the start of any site session.

**Last updated:** 2 August 2026 (/live rebuilt; hero CTA changed; Ùrlar noindex; meta description)
**Repo:** gileslamb.com (Next.js, deployed on Vercel)
**Infrastructure:** Vercel (hosting), Cloudflare R2 (audio/media), Cloudflare Stream (video), Cloudflare Images (images)

---

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Video:** Cloudflare Stream
- **Audio:** Cloudflare R2 — bucket `museum-playlist`, public base URL `https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev`
- **Images:** Cloudflare Images (`https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/`)
- **Deployment:** Vercel (auto-deploy from main branch)
- **Domain:** gileslamb.com / www.gileslamb.com

---

## Navigation (global)

Current nav items, left to right:

`GILES LAMB` (home) · `ANIMATION` · `INSTALLATION & MUSEUM` · `LISTEN` · `RELEASES` · `ESSAYS` · `CONTACT`

> Note: LISTEN added 18 June 2026. Previously the reels section was not linked from nav.

---

## Routes & Pages

### `/` — Homepage

**Title:** Giles Lamb · Composer · Immersive Sound Artist

**Sections:**
1. Hero — full-bleed studio photo, name, tagline, two CTAs (Selected Work → `#work` / Live → `/live`)

   > "Commission a project" removed 2 Aug 2026. The site should read as an artist's site
   > that takes commissions, not a services site — availability-for-hire is not the
   > above-the-fold offer. Commission enquiry lives in the Contact section, unchanged.
2. Showreel 2026 — Cloudflare Stream embed. Video ID: `00b4dbad6e415e5edbca3b3c3b507dff`
3. Practice — "The medium shifts. The obsession doesn't." Three strands with filter tags:
   - 01 Film & Television (tags: Cinematic Trailer, Film Score, Animation, TV Series, Campaign)
   - 02 Immersive & Installation (tags: Spatial Sound, Exhibition, Generative Systems, Installation)
   - 03 Live Audiovisual Performance (tags: Live AV, Modular, Generative Visuals, TouchDesigner, Festival)
4. Selected Work — three featured deep-dive projects (Distance to the Moon, Holy Hell, Dead Island) + Further Selected Work grid
5. Live Practice — "Sound as the DNA from which image emerges." Dream Screens section + email capture
6. Original Projects — Dream Screens, Curious Dreamers
7. Contact — commission enquiry, two emails (giles@gileslamb.com, info@gileslamb.com)

**Key copy note:** Homepage intro references Dream Screens as current project. Signal Dreams is retired — do not reinstate.

---

### `/animation` — Animation

Dedicated page for animation and kids' TV work. Links to `/reels/kids-animation` at the bottom ("Listen to selected animation work →").

---

### `/immersive` — Installation & Museum

Dedicated page for spatial sound, museum commissions and immersive installation work. Links to `/reels/museum-reel` at the bottom ("Listen to selected installation work →").

---

### `/releases` — Releases

Three sections: Live, Singles, Albums. Structure per `releases.md` in canonical docs.

---

### `/live` — Live

**Rebuilt:** 2 August 2026 (App Router page, `src/app/live/page.jsx`)

The live practice page. Two named strands, site design system, standard Nav + Footer:

1. **The method — Unstable Systems.** Copy carried over from the homepage `LivePractice`
   section. Links to `/releases`.
2. **The event — Ùrlar.** Deep listening, spatial music and visuals. Positioning copy and
   the hero still are sourced from the Ùrlar brochure pages (`/urlar`, `/urlar/host`) —
   not rewritten. Includes the Oliveros epigraph and the pibroch gloss.

**Framing:** Ùrlar is the event; Unstable Systems is the method underneath it.

**Dates:** "Dates coming soon" only — no specific date, venue or ticketing link. This page
also does not link to `/urlar` or `/urlar/host`; see the note under the Ùrlar entry below —
that is now a layout choice, not a constraint.

**Contact:** reuses the existing site contact route (`/#contact`). No new form.

**Linked from:** homepage hero CTA ("Live"), and a "Live →" link in the homepage
`LivePractice` section. Not in global nav.

**Previous occupant:** `/live` was an invite-only RSVP card for the 8 June 2026 preview
(Curious Studios, Glasgow), served as static HTML via a `next.config.ts` rewrite. Archived
2 Aug 2026 to `public/live-preview-8-june/index.html` → `/live-preview-8-june`
(still `noindex, nofollow`).

---

### `/urlar` — Ùrlar brochure pages

Three routes, all **live and deliberately shared** with the gig's audience and with
programmers. Not in global nav — reached by direct link, QR, and email.

| Route | Purpose |
|---|---|
| `/urlar` | Poster page — full-viewport, crossfading Cloudflare Stream background, audio toggle, PDF poster download |
| `/urlar/host` | Programmer/venue pitch — what Ùrlar is, what the room needs and gives back |
| `/urlar/tickets` | Ticket/updates capture → `giles-engine` worker, `source: 'urlar'` |

**Also:** `/resonantbeing` → `/urlar` (permanent redirect, `next.config.ts`).

**Content:** these pages carry the 20 September 2026 date, KCR Academy Barn / Dalgarven
Mill / KA13 6PL, and the `jane@kcracademy.com` booking mailto. This is intentional and
correct — the pages exist to be shared with that audience. **Do not remove, redirect,
unpublish or edit that content.**

**Indexing — `noindex, nofollow` by design (2 Aug 2026).** Reachable by anyone with the
link; kept out of search results. Set per route via the Next.js metadata API:

- `src/app/urlar/page.tsx` — `robots: { index: false, follow: false }`
- `src/app/urlar/tickets/page.tsx` — same
- `src/app/urlar/host/page.tsx` — same (added 2 Aug 2026; the other two already had it)

Deliberately **not** a global rule, so the rest of the site stays indexable. OpenGraph and
Twitter card metadata on `/urlar/host` is unaffected — link previews still render when the
page is shared.

> No `sitemap.xml` and no `robots.txt` exist in this repo (no `src/app/sitemap.ts`,
> no `src/app/robots.ts`, nothing in `public/`). Nothing to exclude and nothing that
> contradicts the per-route rules. **If a sitemap is ever added, exclude these three
> routes**, and keep any `robots.txt` free of `Allow` rules that would conflict.

**Note on `/live`:** `/live` does not link to these pages. That was a decision made under
an earlier, since-retracted instruction to keep the September gig off the site; it is now
simply a layout choice, not a constraint. Linking `/live` → `/urlar/host` would be fine.

---

### `/writing` — Essays (The Quiet Room)

Essays and writing on sound and process.

---

### `/reel` — Showreel (shareable)

**Added:** 18 June 2026
**Purpose:** Dedicated shareable page for the 2026 showreel. Used for LinkedIn, QR cards, pitch emails.
Minimal — black background, no nav, no footer. Cloudflare Stream embed fullscreen. Small "← gileslamb.com" back link top left.
**Share URL:** `gileslamb.com/reel`

---

### `/card` — Digital Card

Per-event QR capture page. Audio-reactive shader, name/email capture. Source written to `giles-engine` D1 `captures` table.

**Configured events** (in `src/app/card/[event]/page.tsx`):
| Slug | Display name | Sting audio |
|---|---|---|
| `annecy-2026` | Annecy 2026 | `/audio/resonant-being-part-2.mp3` |
| `direct` | (none — generic) | none |

**QR code URLs:**
- Annecy: `https://gileslamb.com/card/annecy-2026`
- Generic: `https://gileslamb.com/card/direct`

**Post-tap links on card** (credits section): Watch showreel → `/reel`, Animation work → `/animation`

---

### Apple Wallet Pass — SHELVED (18 Jun 2026)

Pass structure built; signing not yet configured. Resume when Apple cert is ready.

**Pass Type ID:** `pass.com.gileslamb.card`  
**Files in repo:**
- `wallet/pass.model/pass.json` — complete pass definition (fields, colours, QR)
- `wallet/certs/` — gitignored; place `wwdr.pem`, `signerCert.pem`, `signerKey.pem` here
- `scripts/generate-pass.js` — builds and signs the `.pkpass`
- `scripts/create-pass-placeholders.js` — one-time placeholder image setup
- `docs/README-wallet-pass.md` — full cert setup and generation instructions

**To resume:**
1. Register `pass.com.gileslamb.card` in Apple Developer portal (Identifiers > Pass Type IDs)
2. Get Team ID from developer portal (10-char string, top right)
3. Set `teamIdentifier` in `wallet/pass.model/pass.json`
4. Create Pass Type ID certificate, export as `.p12`, convert to PEM (see README)
5. `npm install passkit-generator` (already in devDependencies)
6. `npm run wallet:placeholders` then `npm run wallet:generate`
7. Output lands at `public/gileslamb-card.pkpass` → served at `gileslamb.com/gileslamb-card.pkpass`

**Pass front:** COMPOSER header · Giles Lamb primary · Film · Animation · Immersive + Glasgow, UK secondary · gileslamb.com auxiliary · QR → gileslamb.com/card  
**Pass back:** Showreel, Animation, Listen, Email links + credits + awards

---

### `/reels` — Reels Index

**Added:** (partial — museum reel pre-existed, index and other reels built 18 June 2026)
**Purpose:** Listening room — audio reels by category for commissioners.
**Nav link:** LISTEN → `/reels`

Lists all reel categories. Each links to its player page.

Categories:
| Index label | Route | Status |
|---|---|---|
| Installation & Museum | `/reels/museum-reel` | Live |
| Kids & Animation | `/reels/kids-animation` | Live (18 Jun 2026) |
| Drama & Documentary | `/reels/drama-documentary` | Live (18 Jun 2026) |
| TV | `/reels/tv` | Live (18 Jun 2026) |
| Cinematics & Trailers | `/reels/cinematics-trailers` | Live (18 Jun 2026) |

---

### `/reels/museum-reel` — Installation & Museum Reel

Player page. 9 tracks. Audio from R2 top-level (not in `/Reels/` subfolder — original files).

Tracks:
1. Wallace Score · Wallace Monument Museum
2. Dark Arts
3. Breathing Whale
4. Sirens Servers · ISO Design
5. Deep Wave
6. OperaHouse · Oman Across the Ages Museum
7. Deep Space 2
8. Xephyr · ISOMirror · Museum of Science and Industry, Chicago
9. Xephyr · Pulse · Museum of Science and Industry, Chicago

---

### `/reels/kids-animation` — Kids & Animation Reel

17 tracks. Audio from R2: `Reels/Kids and animation/`

Tracks: About Town (Widdershins), Tom Gates ×3 (Sky Kids), Burryman ×2 (Devil May Care), Counting Kisses, DasGaden ×2 (EBU Shorts), Secret Life of Boys ×3 (CBBC), Stay Sure (Curiouss), Widdershins ×2 (Once Were Farmers), Higgledy-Dee ×2 (YouTube Kids)

---

### `/reels/drama-documentary` — Drama & Documentary Reel

25 tracks. Audio from R2: `Reels/Drama and documentary/`

Includes: Holy Hell ×3 (CNN), Fire in the Night (ITV), God Help The Girl (Stuart Murdoch), Great Migration, Vic Falls, Armada (Axis Animation), and library/pitch tracks.

---

### `/reels/tv` — TV Reel

18 tracks. Audio from R2: `Reels/TV/`

Includes: COSMOS Soundtrack, Hole, J&H, Broken Garden, Insomnia, Thirst, Mysterious Business, P&O Cruises, and others.

---

### `/reels/cinematics-trailers` — Cinematics & Trailers Reel

19 tracks. Audio from R2: `Reels/Cinematics and trailers/`

Includes: Dead Island (Deep Silver), Darksiders2 ×2 (THQ), Fable Legends (Lionhead), Suckerpunch ×5 (Warner Bros), Risen2 (Piranha Bytes), Grey Goo (Six Foot Games), Interstellar pitch (Paramount), Fragment (Axis), and others.

---

### `/work/[slug]` — Individual Work Pages

Deep-dive project pages. Current entries:
- `/work/distance-to-the-moon`
- `/work/holy-hell`
- `/work/dead-island`
- `/work/siren-servers`
- `/work/valhalla-rising`
- `/work/visit-scotland`
- `/work/story-trails`

---

## R2 Bucket Structure

Bucket: `museum-playlist`
Public base URL: `https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev`

```
museum-playlist/
├── (museum reel audio — top level, existing)
└── Reels/
    ├── Cinematics and trailers/   (19 tracks)
    ├── Drama and documentary/     (25 tracks)
    ├── Kids and animation/        (17 tracks)
    └── TV/                        (18 tracks)
```

CORS: configured for gileslamb.com and www.gileslamb.com, GET/HEAD, all headers.

---

## Cloudflare Stream

Showreel 2026 video ID: `00b4dbad6e415e5edbca3b3c3b507dff`
Embed URL: `https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/00b4dbad6e415e5edbca3b3c3b507dff/iframe?poster=...`

---

## Conventions

- **Two hats:** gileslamb.com is composer identity only. Curious Dreamers is separate. Do not conflate.
- **Signal Dreams:** retired. Do not reference on the site. Absorbed into Dream Screens / Giles Lamb Live.
- **Reels:** not linked from individual work pages — only from the nav (LISTEN) and from /animation and /immersive contextual links.
- **CLAUDE.md** at repo root, `/docs/` folder for session handoffs.
- **This file** should be kept in sync with `/docs/gileslamb-site.md` in the repo (Claude Code's local reference copy).

---

## Update log

| Date | Change |
|---|---|
| 18 Jun 2026 | `/reel` showreel page added |
| 18 Jun 2026 | `/reels` index completed; 4 new reel player pages built (kids-animation, drama-documentary, tv, cinematics-trailers) |
| 18 Jun 2026 | LISTEN added to global nav |
| 18 Jun 2026 | Contextual reel links added to /animation and /immersive |
| 18 Jun 2026 | Homepage copy updated: Signal Dreams → Dream Screens |
| 18 Jun 2026 | Experience section reordered on LinkedIn — Giles Lamb Music now primary |
| 18 Jun 2026 | /card post-tap links updated: Watch showreel + Animation work added |
| 18 Jun 2026 | Apple Wallet pass structure built (shelved — needs Apple cert to sign) |
| 2 Aug 2026 | `/live` rebuilt as an App Router page — Unstable Systems (method) + Ùrlar (event) strands; "Dates coming soon"; contact via `/#contact`. Ùrlar copy sourced from `/urlar` + `/urlar/host` |
| 2 Aug 2026 | `/live` 8 June invite card archived to `/live-preview-8-june`; rewrite repointed |
| 2 Aug 2026 | Homepage hero CTA: "Commission a project" removed, replaced with "Live" → `/live`. Contact section unchanged |
| 2 Aug 2026 | "Live →" link added to homepage `LivePractice` section |
| 2 Aug 2026 | `/urlar/host` given `robots: { index: false, follow: false }` — all three Ùrlar routes now noindex/nofollow by design, per route, no global rule. Pages stay live and shared; no visible content changed |
| 2 Aug 2026 | Global meta description updated — "Signal Dreams" removed, replaced with current positioning. `<title>` unchanged |
