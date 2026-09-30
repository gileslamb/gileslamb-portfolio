# gileslamb.com: Site Reference

Canonical map of gileslamb.com: routes, content, media and conventions, written to match the code. Claude Code reads this at the start of any site session. Update it in the same branch as any site change.

**Last updated:** 30 September 2026 (site refresh, branch `site-refresh-oct26`)
**Repo:** `gileslamb/gileslamb-portfolio` (local working copy: `~/Websites/gileslamb-portfolio`)
**Hosting:** Vercel. **main auto-deploys to production.** Work on a branch, check the Vercel preview, merge only when Giles says so.
**Domain:** gileslamb.com / www.gileslamb.com

> `render.yaml` is a leftover from an earlier Render setup. The site is not deployed on Render.

---

## Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** `src/app/globals.css` (design tokens as CSS variables, Cormorant Garamond + Karla), Tailwind for layout on some pages (`/urlar/host`)
- **Images:** Cloudflare Images, `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/<id>/public`, or `public/images/`. Both work with `next/image`.
- **Video:** Cloudflare Stream, `https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/<id>`. Stream thumbnails are **not** an allowed `next/image` host, so Stream stills use a plain `<img>` (see `LivePractice.jsx`, `/live`, `/urlar/host`).
- **Audio / release media:** Cloudflare R2 (two public buckets, see below)
- **Mailing list:** Kit (v4 API) via `src/app/api/list/route.ts`
- **Dev:** `npm run dev` on port 4321

---

## Conventions

- **Two hats:** gileslamb.com is the composer identity. Curious Dreamers is separate. Do not conflate.
- **Signal Dreams:** retired. Do not reference it on the site.
- **No em dashes in new copy.** (Older copy still has some.)
- **Reels** are linked from the nav (LISTEN) and from `/immersive` and `/animation`, not from individual work pages.
- **Ùrlar pages** (`/urlar`, `/urlar/host`, `/urlar/tickets`) are `noindex, nofollow` per route by design. There is no `sitemap.xml` or `robots.txt`; if a sitemap is ever added, exclude these three routes.

---

## Navigation

Defined once in `src/components/Nav.jsx` as `NAV_ITEMS`, rendered into both the desktop list and the mobile overlay.

`GILES LAMB` (home) · `WORK` · `LIVE` · `LISTEN` · `RELEASES` · `CATALOGUE` · `ESSAYS` · `CONTACT`

| Label | Target |
|---|---|
| Work | `/work` |
| Live | `/live` |
| Listen | `/reels` |
| Releases | `/releases` |
| Catalogue | `https://catalogue.gileslamb.com` (new tab). **Hidden** until `SHOW_CATALOGUE` in `Nav.jsx` is set to `true` (planned for the 16 Oct 2026 catalogue launch) |
| Essays | `/writing` |
| Contact | `/#contact` |

Animation and Installation & Museum left the nav on 30 Sep 2026; they are now sections of `/work`, and their URLs are unchanged.

---

## Homepage `/`

**Title:** Giles Lamb · Composer · Immersive Sound Artist (`src/app/layout.tsx`)

Section order (`src/app/page.jsx`):

1. **Hero** (`Hero.jsx`): full-bleed studio photo (`wide_studio_2026.png` on Cloudflare Images), eyebrow "Composer · Immersive Sound Artist", name, two paragraphs:
   > Composer and sound artist. Thirty years scoring film, television, animation and games, and a growing body of museum and installation work, most recently the Bayeux Tapestry at the British Museum.
   >
   > Live, I play Ùrlar, for piano, synthesis, projection and spatial sound. I'm also developing spatial sound research with the University of Glasgow. Cannes, BAFTA, RTS and Music+Sound awards.

   CTAs: Selected Work → `#work`, Live → `/live`.
2. **Showreel 2026**: Stream `00b4dbad6e415e5edbca3b3c3b507dff`
3. **Practice** (`Practice.jsx`): "The medium shifts. The obsession doesn't." Three strands (Film & Television; Immersive & Installation; Live Audiovisual Performance).
4. **Selected Work** (`Work.jsx`)
   - Featured three (inline `CASE_STUDIES`): **Bayeux Tapestry, British Museum** → `/immersive/bayeux-tapestry`, **Distance to the Moon** → `/work/distance-to-the-moon`, **Dead Island** → `/work/dead-island`. A card's awards line only renders when it has awards (Bayeux has none).
   - Further Selected Work grid (`src/data/projects.js`), two columns. Keep both lists an even length.
     - Shown: Holy Hell, Valhalla Rising, Visit Scotland, Siren Servers
     - Behind "Show more credits": Story Trails, Mail Rail, Fable Legends, Book of Kells, Cineworld, The 21
5. **Live** (`LivePractice.jsx`): Ùrlar.
   > Ùrlar is the ground in pibroch, the theme everything returns to. A live piece for piano, synthesis, projection and spatial sound.
   >
   > Premiere Friday 4 December, House of Toad, Glasgow.

   Image: Stream `ca96b876b35b1a3278d9f15770b6972f` at 65s (three-screen audience view). Links: Live → `/live`, About Ùrlar → `/urlar/host`. Unstable Systems is no longer on the homepage; it lives on `/live`.
6. **Original Projects** (`OriginalProjects.jsx`)
   - **Dream Screens** (`DreamScreensPromo.jsx`): "Dream Screens is a concept album, with music, image and story built together from the start. Out 30 October." / "Where the live work is made in the moment, Dream Screens is composed and fixed, a world you move through." Link "Dream Screens" → `https://dream-screens.vercel.app`. Image `public/images/dream-screens.png`.
   - **Curious Dreamers** (`CuriousDreamersPromo.jsx`): unchanged.
7. **Contact** (`Contact.jsx`): commission enquiry, giles@gileslamb.com and info@gileslamb.com.

---

## `/work`: Work index

`src/app/work/page.jsx`. Jump links, then four sections. Each project appears once.

| Section | Source | "More" link |
|---|---|---|
| Installation & Museum | `IMMERSIVE_GRID` (`src/data/immersive.js`) | `/immersive` |
| Film, TV & Games | `FILM_TV_GAMES` (`src/data/projects.js`): Holy Hell, Dead Island, Valhalla Rising, Visit Scotland, Fable Legends, Cineworld | none (no subsection page) |
| Animation | `ANIMATION_GRID` (`src/data/animation.js`) | `/animation` |
| Live | single card (Ùrlar and Unstable Systems) | `/live` |

Projects in both the immersive and further-work data (Siren Servers, Story Trails, Book of Kells, Mail Rail) and animation projects (Distance to the Moon, The 21) are listed only in their Installation or Animation section here. An odd last card in a section spans the full row.

### `/work/[slug]`: case study pages

Static folders under `src/app/work/`: book-of-kells, cineworld, dead-island, distance-to-the-moon, fable-legends, holy-hell, siren-servers, story-trails, the-21, valhalla-rising, visit-scotland. Their back links still read "← Back to Selected Work" → `/#work`.

---

## `/immersive`: Installation & Museum

`src/app/immersive/page.jsx`. Live URL used in outreach; do not move. "← Work" link above the intro, then intro copy, museum reel link, and the `IMMERSIVE_GRID`:

1. Bayeux Tapestry, British Museum (2026)
2. Mail Rail · The Postal Museum (2017)
3. Zephyr · MSI Chicago (2019)
4. Oman Across the Ages (2021)
5. Waldorf Astoria New York (2019)
6. Wallace Monument (2018)
7. Monarch Theatre · Wonderland (2023)
8. Carlsberg Experience (2019)
9. Story Trails (2022)
10. Isle of the Senses · EPIC Ireland (2026)
11. Siren Servers (2015)
12. Book of Kells Experience

Each card links to `/immersive/<slug>`. Most pages render `ImmersiveCaseStudy` from `IMMERSIVE_PROJECTS`; Story Trails, Siren Servers and Book of Kells use their own case-study components. `ImmersiveCaseStudy` supports an optional `externalLink`.

- **`/immersive/bayeux-tapestry`**: 2026 · Museum Exhibition · Immersive Sound. Composer · Sound Design · British Museum · ISO Design. Tagline "Music and immersive sound design" (featured card). Two paragraphs: the much-anticipated exhibition, open until July 2027; "an atmosphere that felt contemporary but carried the feeling of the time". Image `public/images/bayeux-tapestry.jpg`. JSON-LD `buildBayeuxTapestrySchema`.
- **`/immersive/mail-rail`**: 2017 · Immersive Museum Ride. Composer · Sound Design · The Postal Museum · ISO Design (visuals). Image `public/images/mail-rail.png`. External link to postalmuseum.org Mail Rail page. JSON-LD `buildMailRailSchema`.

---

## `/animation`: Animation

`src/app/animation/page.jsx`. Live URL used in outreach; do not move. Standalone header (name → `/`, "← Work" → `/work`), intro, `ANIMATION_GRID`: Distance to the Moon, Hushabye Lullaby, Tom Gates, Woolly and Tig, Widdershins, The Burry Man, The 21. Subpages under `/animation/<slug>` via `AnimationCaseStudy`. Links to `/reels/kids-animation`.

---

## `/live`: Live

`src/app/live/page.jsx`. Top to bottom:

1. **Forthcoming performances**: a gig poster (`.gig-poster`), in the manner of artist tour pages: one key image, big type.
   - Key image: TouchDesigner scan visuals, Stream `ca96b876b35b1a3278d9f15770b6972f` at `URLAR_FRAME` (65s), cropped to the screens and faded to black at the bottom (21:9 desktop, 4:3 mobile). All type sits on the black, never over the image.
   - Type: **ÙRLAR** / **Friday 4 December 2026** / **House of Toad, Glasgow** / "Limited spaces".
   - Tickets button: **`TICKETS_URL`** constant at the top of the page. Empty = greyed, disabled "Tickets coming soon". Set it to the Eventbrite link and it becomes a live "Tickets" button (new tab).
   - Ticket alert signup (`src/app/live/TicketAlertForm.jsx`): "Be first to hear when tickets go on sale". Posts `{ email, tag: "urlar-hot-2026" }` to `/api/list` (see below).
   - "About Ùrlar →" `/urlar/host`.
   - Beneath the poster: "More dates from January 2027."
2. **Ùrlar**: one paragraph, no image (the poster carries it).
3. **The method: Unstable Systems**: one paragraph, "Releases →". Image: black-and-white photo of Giles playing, Cloudflare Images `8cd73992-0209-4125-16d2-5a81f67fb200`.

### `/api/list` tags

Every signup is saved to the `giles-engine` captures table first (`source: 'list'`, `source_detail` = the extra tag or `'list'`), then subscribed to the Kit form (`KIT_FORM_ID`) and tagged with `KIT_TAG_ID` (live dates). A form can also send `tag`: names in the route's `EXTRA_TAGS` allowlist (currently `urlar-hot-2026`) are resolved to a Kit tag ID by name at signup (Kit's create-tag call is idempotent on name, so the tag is created on first use) and applied as well.

---

## `/urlar`: Ùrlar pages

Not in the nav. Reached by direct link, QR and email. All `noindex, nofollow`.

| Route | What it shows |
|---|---|
| `/urlar` | Poster page (`UrlarClient.tsx`): crossfading Stream background, audio toggle, Oliveros epigraph. Top strip "Ùrlar · 04.12.26 · Glasgow"; date block **Fri 4 Dec 2026, House of Toad · Park Circus · Glasgow**; CTA "Tickets and updates" → `/urlar/tickets`. `?print=1` is the print mode used by `npm run generate:pdf` |
| `/urlar/host` | Programmer/venue page: three-screen hero video with sound control, fact bar, room paragraph, played-live image band, pibroch pull-quote, "Hosting it" rider, footer "Confirmed: Friday 4 December 2026, House of Toad, Park Circus, Glasgow. Further dates from January 2027." with giles@gileslamb.com |
| `/urlar/tickets` | Ticket/updates sign-up → `giles-engine` worker, `source: 'urlar'` |

`/resonantbeing` → `/urlar` (permanent redirect).

The KCR Academy 20 Sept 2026 details, the Jane at KCR booking mailto and the poster PDF link were removed from `/urlar` on 30 Sep 2026. `public/urlar-poster.pdf` (still the 20 Sept poster) and `public/kcr-academy-logo.png` remain in the repo, no longer linked.

---

## Other routes

| Route | Notes |
|---|---|
| `/releases` | Releases index from `src/data/releases.json` |
| `/releases/invisible-threads` | Listening room (App Router). `/invisible-threads` → here (permanent redirect) |
| `/releases/orbital-fifths`, `/releases/hemispheric-joy` (+ `/listen`) | Static HTML in `public/releases/`, served via rewrites in `next.config.ts` |
| `/writing`, `/writing/[slug]` | Essays (The Quiet Room) |
| `/reels` + five players | Listening rooms: museum-reel, kids-animation, drama-documentary, tv, cinematics-trailers. `/immersive/museum-reel` → `/reels/museum-reel` |
| `/reel` | Shareable showreel page, no nav |
| `/card/[event]` | QR capture card (`annecy-2026`, `direct`) → `giles-engine` D1 `captures` |
| `/list`, `/api/list` | Mailing list sign-up (Kit) |
| `/privacy` | Privacy notice |
| `/organic-ai` | Organic AI page |
| `/live-preview-8-june` | Archived 8 June 2026 invite card (static HTML, noindex) |

---

## Structured data

`src/lib/schema/`. Homepage emits `buildWorkItemList()`: Bayeux Tapestry, Distance to the Moon, Dead Island, Holy Hell, Valhalla Rising, Visit Scotland, Siren Servers, Story Trails, Mail Rail, Fable Legends, Cineworld, The 21. Work breadcrumbs point at `/work`.

---

## Media registry

### Cloudflare Stream

| ID | What | Used on |
|---|---|---|
| `00b4dbad6e415e5edbca3b3c3b507dff` | Showreel 2026 | Homepage, `/reel` |
| `ca96b876b35b1a3278d9f15770b6972f` | Ùrlar, three-screen audience view with TouchDesigner scan visuals (90s). Clearest point-cloud frames: 78s, 82s, 86s | `/urlar/host` hero (poster/OG at 65s); homepage Live still and `/live` poster at 65s |
| `3913fbedb27eed32fd88c6d87eab3448` | Ùrlar studio pilot (playing) | `/urlar/host` image band (51s) |
| `9510de9cffc769d1720604298dc57895` / `09c888db1acd3ba26fb0f2b8bd28a292` / `68eeb46ea059449e3660d0f785f8367f` | Ùrlar poster loops (clean, 35% ghost, 50% ghost) | `/urlar` |

### Local images (`public/images/`)

| File | Used on |
|---|---|
| `bayeux-tapestry.jpg` (474×207, low resolution) | Homepage featured card, `/immersive`, `/immersive/bayeux-tapestry`, `/work` |
| `mail-rail.png` | `/immersive`, `/immersive/mail-rail`, homepage grid, `/work` |
| `dream-screens.png` | Homepage Dream Screens block |

### Cloudflare Images (selected)

| ID | What | Used on |
|---|---|---|
| `8cd73992-0209-4125-16d2-5a81f67fb200` | Black-and-white photo of Giles playing | `/live` Unstable Systems; `/work` Live card |
| `1fceb1b8-7959-4ce2-b885-a107fd74d300` | 8 June 2026 rig | Practice section |
| `139e9942-632c-478a-5ba5-977a6b6b5100` | Former Dream Screens image | Not used |

### R2

- `museum-playlist`: `https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev` (reel audio; `Reels/<category>/`; `resonant-beings/` for `/urlar` audio)
- releases bucket: `https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev` (release covers, audio, peaks, `invisible-threads/`)

---

## Apple Wallet pass: shelved

Structure in `wallet/pass.model/`, scripts `scripts/generate-pass.js` and `scripts/create-pass-placeholders.js`, instructions in `docs/README-wallet-pass.md`. `teamIdentifier` is still a placeholder. Certs go in `wallet/certs/`, which is gitignored (only `.gitkeep` is tracked).

---

## Update log

| Date | Change |
|---|---|
| 18 Jun 2026 | `/reel`; `/reels` index and four reel players; LISTEN in nav; reel links on `/animation` and `/immersive`; Wallet pass structure (shelved) |
| 2 Aug 2026 | `/live` rebuilt (Unstable Systems + Ùrlar); 8 June card archived; hero CTA "Live"; Ùrlar routes noindex |
| 3 Aug 2026 | LIVE added to nav |
| 3 Sep 2026 | Invisible Threads listening room moved under `/releases` |
| 30 Sep 2026 | Site refresh: nav (Work · Live · Listen · Releases · Catalogue (hidden) · Essays · Contact); new `/work` index; hero copy; Bayeux Tapestry featured and new `/immersive/bayeux-tapestry`; Mail Rail added with `/immersive/mail-rail`; Holy Hell moved to the grid; homepage Live becomes Ùrlar; `/live` and `/urlar` updated to 4 Dec House of Toad; KCR / 20 Sept details and poster link removed from `/urlar`; Dream Screens reframed as the album out 30 October; schema updated; CLAUDE.md added |
| 30 Sep 2026 | Bayeux copy revised (tagline "Music and immersive sound design"); `/live` redesigned: dates panel first, then Ùrlar (scan visuals still), then Unstable Systems (B&W photo); Oliveros quote dropped from `/live` |
| 30 Sep 2026 | Bayeux title "Bayeux Tapestry, British Museum" everywhere; `/live` top rebuilt as a gig poster (Forthcoming performances, `TICKETS_URL`, ticket alert signup tagged `urlar-hot-2026`); `/api/list` accepts an allowlisted extra tag |
