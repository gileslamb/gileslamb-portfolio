# gileslamb.com — Site Reference

Canonical map of the gileslamb.com website: all routes, pages, content, infrastructure and conventions. Updated as the site changes. This is the document Claude Code reads at the start of any site session.

**Last updated:** 18 June 2026
**Repo:** gileslamb.com (Next.js, deployed on Vercel)
**Infrastructure:** Vercel (hosting), Cloudflare R2 (audio/media), Cloudflare Stream (video), Cloudflare Images (images)

**Source of truth:** Google Drive — gilesdocs/Workflows and Systems/gileslamb-site.md (file ID: `1VXl7KEKdLKo-Jy8Wfs-vrykItnW8CNS8`). Update the Drive doc first; keep this copy in sync.

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
1. Hero — full-bleed studio photo, name, tagline, two CTAs (Selected Work / Commission a project)
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
    ├── Cinematics and trailers/  (19 tracks)
    ├── Drama and documentary/    (25 tracks)
    ├── Kids and animation/       (17 tracks)
    └── TV/                       (18 tracks)
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
- **This file** should be kept in sync with the Drive source of truth.

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
