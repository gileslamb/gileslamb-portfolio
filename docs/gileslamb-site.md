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
- **Mailing list:** D1 `subscribers` table, written by the `giles-engine` worker `POST /subscribe` (Kit removed 30 Sep 2026)
- **Dev:** `npm run dev` on port 4321

---

## Conventions

- **Two hats:** gileslamb.com is the composer identity. Curious Dreamers is separate. Do not conflate.
- **Signal Dreams:** retired. Do not reference it on the site.
- **No em dashes in new copy.** (Older copy still has some.)
- **Reels** are linked from the nav (LISTEN) and from `/immersive` and `/animation`, not from individual work pages.
- **Ùrlar pages:** `/urlar` is indexable (public page); `/urlar/host` is `noindex, nofollow` per route by design. There is no `sitemap.xml` or `robots.txt`; if a sitemap is ever added, exclude `/urlar/host`.

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

   Image: Stream `ca96b876b35b1a3278d9f15770b6972f` at 65s (three-screen audience view). Links: Live → `/live`, About Ùrlar → `/urlar`. Unstable Systems is no longer on the homepage; it lives on `/live`.
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

1. **Forthcoming performances**: a single flier section (`.gig-poster`), typography as `/urlar/host`: Cormorant Garamond (italic title, the Ù in `var(--accent)`) with Karla small caps, site colour tokens only.
   - Key image: TouchDesigner scan visuals, Stream `ca96b876b35b1a3278d9f15770b6972f` at `URLAR_FRAME` (65s), cropped to the screens and faded into the card (21:9 desktop, 4:3 mobile). All type sits below it.
   - Order: GILES LAMB (small caps) / *Ùrlar* (large) / blurb ("The ground in pibroch, the theme everything returns to. An hour of live piano and synthesis, with spatial sound and projection across three screens.") / Friday 4 December 2026 · House of Toad, Glasgow (venue on its own line on mobile) / price line (£20, £15 concessions and House of Toad members, drink on arrival. Booking fee applies.) / "Limited spaces" / Book tickets button / mailing list signup / "About Ùrlar →" `/urlar`.
   - Book tickets button: links to `EVENTBRITE_URL` from `src/app/urlar/_components/hero.ts` (new tab), the same link as `/urlar`.
   - Mailing list signup (`src/app/live/TicketAlertForm.jsx`): "Join the mailing list". Posts `{ email, source: "live" }` to the `giles-engine` worker `POST /subscribe` (D1 `subscribers`), with a honeypot field.
   - Beneath the flier: "More dates from January 2027."
2. **The method: Unstable Systems**: one paragraph, "Releases →". Image: black-and-white photo of Giles playing, Cloudflare Images `8cd73992-0209-4125-16d2-5a81f67fb200`.

> **Font note:** the Google Fonts `@import` at the top of `globals.css` (Cormorant Garamond upright + italic, Karla 300/400) does not survive the build, so the only Cormorant face on the site is the italic 300 from `next/font` (`--font-hero-name`). All Cormorant text therefore renders italic site-wide, including `/urlar/host` prose and the flier blurb.

## `/urlar`: Ùrlar pages

Not in the nav. Reached by direct link, QR, email, the footer of `/press` and the homepage Live card.

Two routes sharing one opening: the cloud hero (`UrlarHero`) and the three-screen film (`HeroVideo`, with scroll crossfades and Play with sound), both in `src/app/urlar/_components/` with the shared constants (`hero.ts`: clip ids, cloud, `EVENT`, `EVENTBRITE_URL`) and blocks (`ui.tsx`).

| Route | What it shows |
|---|---|
| `/urlar` | Public page: premiere (House of Toad, Fri 4 Dec 2026, £20 / £15) in the hero with one Book tickets button (`EVENTBRITE_URL`, the Eventbrite event), film, room, played-live band, credits line, mailing list (`/subscribe`, source `urlar`). **Indexable**, canonical `https://www.gileslamb.com/urlar` |
| `/urlar/host` | Venue page for programmers: same hero (premiere as plain text, no ticket links) and film, then fact bar, room, band, etymology, About (bio and credits from `src/data/press.ts`), Hosting it rider, bookings email. `noindex, nofollow` |

**Redirects (`next.config.ts`, permanent):** `/resonantbeing` → `/urlar`, `/urlar/tickets` → `/urlar`, `/urlar-poster.pdf` → `/urlar`.

The old KCR Academy Barn poster page (20 September 2026, `UrlarClient.tsx`), its tickets capture page, the `generate-urlar-pdf` script and `urlar-poster.pdf` were retired on 1 Oct 2026. `public/kcr-academy-logo.png` remains in the repo, no longer linked.

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
| `/press` | Press kit (indexable, linked from the site footer): bio, credits, awards, releases from `releases.json`, images (IMAGE_TBC slots), Ùrlar card, contact. Data in `src/data/press.ts` |
| `/list` | Mailing list sign-up → `giles-engine` `POST /subscribe` (D1 `subscribers`), source from `?src=` |
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
| `ca96b876b35b1a3278d9f15770b6972f` | Ùrlar, three-screen audience view with TouchDesigner scan visuals (90s). Clearest point-cloud frames: 78s, 82s, 86s | `/urlar` and `/urlar/host` hero film (poster/OG at 65s); homepage Live still and `/live` poster at 65s |
| `3913fbedb27eed32fd88c6d87eab3448` | Ùrlar studio pilot (playing) | `/urlar` and `/urlar/host` played-live band (51s) |
| `9510de9cffc769d1720604298dc57895` / `09c888db1acd3ba26fb0f2b8bd28a292` / `68eeb46ea059449e3660d0f785f8367f` | Ùrlar poster loops (clean, 35% ghost, 50% ghost) | Unused since the old `/urlar` poster page was retired (1 Oct 2026) |

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

- `museum-playlist`: `https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev` (reel audio; `Reels/<category>/`; `resonant-beings/`, the old `/urlar` poster audio, now unused)
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
| 30 Sep 2026 | `/live` flier: `/urlar/host` typography (accent Ù), GILES LAMB above the title, Ùrlar blurb merged in, separate Ùrlar block removed |
| 30 Sep 2026 | `/live` ticket alert now posts to the `giles-engine` worker `POST /subscribe` with `source: "live"` (D1 `subscribers`); Kit tag and `/api/list` route removed on this branch to match `main` |
| 30 Sep 2026 | `/list` rebuilt: name, email and hidden source from `?src=` (default `site`), posting direct to the `giles-engine` worker `POST /subscribe`, which writes the D1 `subscribers` table. Honeypot plus worker rate limit, no third-party scripts. Kit removed entirely (`/api/list` route deleted; `KIT_*` env vars no longer read) |
| 30 Sep 2026 | `/urlar/host`: premiere poster above the hero film, new one-line copy, event details block with tickets button, piano no longer named as the lead instrument |
| 1 Oct 2026 | Ùrlar split: `/urlar` is the public page (indexable, tickets, mailing list), `/urlar/host` the venue page (no tickets); shared cloud hero and full-bleed film in `src/app/urlar/_components/`. Old KCR Barn poster page, `UrlarClient`, `/urlar/tickets` (now redirects to `/urlar`), `generate-urlar-pdf` script and `urlar-poster.pdf` removed |
| 1 Oct 2026 | `/press` added (indexable, linked from the site footer): bio, credits, awards, releases from `releases.json`, images with IMAGE_TBC slots, Ùrlar card, contact. Data in `src/data/press.ts`, also used by the new About section on `/urlar/host`. `/urlar` event details moved into the hero (one Book tickets) |
| 8 Oct 2026 | Merged `urlar-host-hero` into main. `EVENTBRITE_URL` set to the House of Toad Eventbrite event; `/urlar` ticket line adds "drink on arrival" |
