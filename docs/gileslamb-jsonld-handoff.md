# Giles Lamb — JSON-LD Schema Implementation

A handoff document for adding Schema.org structured data to gileslamb.com. Contains the full Claude Code prompt and the follow-up actions only you can complete.

---

## How to use this

1. Open your `gileslamb.com` repo in VS Code
2. Open Claude Code
3. Paste the prompt below (Section 1) as your first message
4. Let it run through the audit step, then approve to continue
5. After it's done, work through Section 2 (the things only you can finish)

---

# Section 1 — The Claude Code Prompt

````
I want to add comprehensive Schema.org JSON-LD structured data to my Next.js portfolio site (gileslamb.com). I'm a composer, sound designer, and immersive sound artist based in Glasgow. The goal is to make the site machine-readable for search engines and AI tools — establishing me as an entity, linking my works to me, surfacing awards/credits cleanly, and connecting my Person entity to the organisations I've co-founded and the people I've worked with.

## Step 1 — Audit first

Before writing anything, please:
1. Identify the Next.js version and whether this is App Router or Pages Router
2. Check if any JSON-LD already exists (search for `application/ld+json`, `next-seo`, or `schema-dts`)
3. List all project pages under `/work/[slug]` and any other relevant routes (`/immersive`, `/writing`, individual essay pages)
4. Identify where global `<head>` content lives (e.g. `app/layout.tsx`, `_document.tsx`, or a shared SEO component)
5. Check existing meta tags, Open Graph, and any sitemap configuration
6. Report findings before making any changes

## Step 2 — Architecture

Single source of truth approach. Create `lib/schema/` with typed TypeScript modules:
- `person.ts` — Giles Lamb `Person` entity (single canonical export)
- `works.ts` — array of selected works with metadata
- `organizations.ts` — Curious Dreamers, Savalas, Screen Facilities Scotland, Film City Glasgow
- `people.ts` — collaborators (Sacha Kyle, Will Allen, Nicolas Winding Refn, David Olusoga) as referenceable Person entities
- `helpers.ts` — functions to build JSON-LD blocks per page type

Install: `npm install --save-dev schema-dts`

Create a reusable `<JsonLd>` component that takes a schema object and renders `<script type="application/ld+json">` with `JSON.stringify(schema)`. Use stable `@id` URIs throughout (e.g. `https://www.gileslamb.com/#giles-lamb`, `https://www.gileslamb.com/#curious-dreamers`, `https://www.gileslamb.com/work/dead-island#composition`) so entities cross-reference rather than duplicate.

## Step 3 — Generate the schemas

### Person: Giles Lamb (global, injected on every page)

```
@type: Person
@id: https://www.gileslamb.com/#giles-lamb
name: Giles Lamb
givenName: Giles
familyName: Lamb
jobTitle: Composer and Immersive Sound Artist
description: Award-winning composer and sound designer with three decades of experience scoring film, television, advertising, games and immersive installations. Co-founder of Curious Dreamers and former co-founder of Savalas. Background in neuroscience and music psychology.
nationality: British
birthDate: 1971-06-25
url: https://www.gileslamb.com
email: giles@gileslamb.com
telephone: +44 7971 951272
image: https://www.gileslamb.com/[path to portrait image — find in repo]
address:
  @type: PostalAddress
  addressLocality: Glasgow
  addressRegion: Scotland
  addressCountry: GB
worksFor: { @id: https://www.gileslamb.com/#curious-dreamers }
alumniOf:
  - @type: CollegeOrUniversity
    name: University of Glasgow
    url: https://www.gla.ac.uk
knowsAbout:
  - Film Scoring
  - Sound Design
  - Spatial Audio
  - Generative Music
  - Modular Synthesis
  - Live Audiovisual Performance
  - Immersive Installation
  - Music Psychology
  - Neuroscience
hasOccupation:
  - @type: Occupation
    name: Composer
  - @type: Occupation
    name: Sound Designer
  - @type: Occupation
    name: Audiovisual Artist
award:
  - Cannes Lions Gold — Best Internet Film (Dead Island, 2011)
  - Music+Sound Award (Dead Island, 2012)
  - RTS Scotland Award (Hushabye Lullaby, 2021)
  - BAFTA Kids (2016)
  - Athens Animfest Distinction Award — Short Competition (Distance to the Moon, 2025)
  - Athens Animfest Music Award (Distance to the Moon, 2025)
  - Animaze Best Soundtrack (Distance to the Moon, 2025)
sameAs:
  - https://www.imdb.com/name/nm1506362/
  - // TODO: Vimeo URL
  - // TODO: Spotify for Artists URL
  - // TODO: Apple Music artist URL
  - // TODO: Instagram URL
  - // TODO: LinkedIn URL
  - // TODO: Bandcamp / SoundCloud URL if applicable
  - // TODO: Wikipedia URL if exists
```

Leave the sameAs TODOs as clearly commented placeholders for me to fill in.

### Organizations

**Curious Dreamers** (`@id: https://www.gileslamb.com/#curious-dreamers`)
- Type: Organization
- Founded: 2023
- Location: Glasgow, UK
- Description: Glasgow-based music and screen studio making animated series, immersive films and sound installations. Music comes first in everything they make.
- url: https://www.curiousdreamers.com
- founder: [Giles Lamb @id, Sacha Kyle @id]
- member: Giles Lamb (as Composer and Sound Designer)

**Savalas Ltd** (`@id: https://www.gileslamb.com/#savalas`)
- Type: Organization
- Founded: 1998
- Dissolved (Giles's involvement): 2016
- Location: Film City Glasgow
- Description: UK audio post-production company specialising in international film, TV and games projects including Halo 4 and Brave.
- founder: Giles Lamb @id
- foundingLocation: Glasgow

**Screen Facilities Scotland** (`@id: https://www.gileslamb.com/#sfs`)
- Type: Organization
- Founded: 2009
- founder: Giles Lamb @id

**Film City Glasgow** (`@id: https://www.gileslamb.com/#film-city-glasgow`)
- Type: Organization
- Note: Giles served on the board 2007–2016

### Collaborators (Person entities, lightweight)

**Sacha Kyle** — co-founder of Curious Dreamers. Producer/director.
**Will Allen** — director, Holy Hell.
**Nicolas Winding Refn** — director, Valhalla Rising.
**David Olusoga** — executive producer, Story Trails.

These are bare-bones Person entities used for cross-reference (`director`, `colleague`, `founder`). Don't fabricate URLs or biographical data — just `@type`, `name`, `@id`.

### Featured CreativeWork / MusicComposition entries (per `/work/[slug]` page)

Each must include `creator` or `composer` referencing `@id: https://www.gileslamb.com/#giles-lamb`. Use the most specific Schema.org type available (`Movie`, `MusicComposition`, `VideoGame`, `VisualArtwork`, `TheaterEvent`, etc).

**1. Distance to the Moon** (`/work/distance-to-the-moon`)
- Compose two linked entities: a `Movie` for the film + a `MusicComposition` for the score
- Year: 2025
- Format: Short film, stop-motion animation
- Production: Curious Dreamers / Eyebols
- Inspirations referenced in the description: Italo Calvino's Cosmicomics, Metropolis, Hitchcock
- Giles credit: Composer, Producer
- Awards: Athens Animfest Distinction Award (Short Competition), Athens Animfest Music Award, Animaze Best Soundtrack

**2. Holy Hell** (`/work/holy-hell`)
- Type: Movie + MusicComposition
- Year: 2016
- Director: Will Allen (link to @id)
- Production: CNN Films / Netflix
- Format: Feature documentary
- Giles credit: Composer
- Recognition: Sundance Film Festival US Documentary Competition (2016), Documentary Critics Choice Award

**3. Dead Island** (`/work/dead-island`)
- Type: VideoGame trailer + MusicComposition
- Year: 2011
- Client: Deep Silver
- Giles credit: Composer, Producer
- Genre: Orchestral, Electronic
- Awards: Cannes Lions Gold (Best Internet Film), Music+Sound Award

**4. Siren Servers** (`/work/siren-servers`)
- Type: VisualArtwork (VR installation)
- Year: 2015 (note: PDF mentions Sonica 2018, site says 2015 — preserve site's stated year)
- Venue: Sonica Glasgow
- Collaborators: ISO Design, Numbercult
- Giles credit: Composer, Sound Design

**5. Valhalla Rising** (`/work/valhalla-rising`)
- Type: Movie + MusicComposition
- Director: Nicolas Winding Refn (link to @id)
- Production: IFC Films / Milan Records
- Giles credit: Sound Design, Additional Composer
- Note: Recorded with improvising ensemble over two days in Scotland

**6. Visit Scotland** (`/work/visit-scotland`)
- Type: AdvertisingCampaign (or Movie if treated as commercial film) + MusicComposition
- Year: 2016
- Title: "Spirit of Scotland"
- Performed by: Royal Scottish National Orchestra
- Notable: First global VisitScotland campaign, featured on Good Morning America
- Giles credit: Composer

**7. Story Trails** (`/work/story-trails`)
- Type: CreativeWork (immersive cinema)
- Year: 2022
- Production: StoryFutures / ISO Design
- Context: Part of UNBOXED, executive produced by David Olusoga (link to @id)
- Touring: 15 UK cities
- Giles credit: Original Score, Sound Design, Spatial Audio

**8. Hushabye Lullaby** (CBeebies)
- If there's a project page, generate; otherwise add as a credit reference on the Person entity
- Year: ~2020–2021
- Broadcaster: BBC CBeebies
- Awards: RTS Scotland (2021), BAFTA Kids reference

**9. Dream Screens** (development project, links to https://dream-screens.vercel.app)
- Type: MusicAlbum / CreativeWork (in development)
- Description: Narrative conceptual album using AI and immersive technologies
- workStatus: InDevelopment

**10. Signal Dreams** (live work, debuting 2026)
- Type: Event series / CreativeWork
- Description: Live audiovisual performance — modular synthesis, generative visuals
- startDate: 2026

### Additional notable credits — index only

For the long roster from the CV (Halo 4, Brave, Frankie Boyle's Tour of Scotland, Slow Trains Through Africa, Final Ascent, Empires of Silver, Woolly and Tig, Keep Crafting and Carry On, Resident Evil ORC, Fable Legends, Grey Goo, Darksiders 2, etc.), don't generate full schemas. Instead, add them as a `knowsAbout` / `creditedTo` reference list on the Person — or as lightweight `subjectOf` references — so the breadth is machine-readable without bloating the markup. Suggest the cleanest approach in your audit response.

### WebSite + Breadcrumbs

- `WebSite` schema on homepage — name, url, publisher: Giles Lamb @id. Skip `SearchAction` unless site has search.
- `BreadcrumbList` on each `/work/[slug]` page: Home → Work → [Project]
- `BreadcrumbList` on `/immersive`, `/writing`, and `/writing/[slug]` if essays exist

### Essays / writing (`/writing` and any sub-pages)

- Treat as `Blog` with individual `BlogPosting` or `Article` entries
- Each authored by Giles Lamb @id
- Audit existing essay pages first and report structure before generating

## Step 4 — Wiring it up

- Person + WebSite + Curious Dreamers Organization → injected globally via root layout (so they appear on every page, establishing the entity graph)
- Each `/work/[slug]` page → its specific schema, with `creator` / `composer` linking to `@id: https://www.gileslamb.com/#giles-lamb`
- Use `@id` URIs consistently — entities should be linked by reference, not redefined
- Homepage should also include an `ItemList` of selected works pointing to each project's `@id`

## Step 5 — Validate

After implementation:
1. Run `npm run build` — confirm no errors or type issues
2. Provide me with a list of URLs to validate, in priority order:
   - Homepage (Person + WebSite + ItemList)
   - One `/work/[slug]` page (CreativeWork + Breadcrumb)
   - `/immersive`
   - `/writing`
3. Validators to use:
   - https://search.google.com/test/rich-results
   - https://validator.schema.org/
4. Output a final summary: every file changed, every schema added, and the list of `// TODO:` items I still need to fill in (sameAs URLs, image paths, missing credits).

## Constraints

- Don't change visible UI, copy, or design
- Don't modify existing meta tags unless they conflict with new schema
- Keep schema in dedicated files — don't inline JSON-LD inside page components
- Use TypeScript with `schema-dts` types throughout
- Where data is missing, leave clearly marked `// TODO:` comments rather than inventing details
- Don't fabricate dates, awards, or collaborator details — if uncertain, leave a TODO
- Preserve the year/credit phrasing from the live site where it differs from the CV (the site is the canonical source)

Begin with Step 1 — the audit — and report findings before generating any code.
````

---

# Section 2 — After it runs (the things only you can finish)

## 1. Fill in the `sameAs` block in `person.ts`

This is the single highest-leverage thing you'll do for AI entity recognition. At minimum:

- IMDb: `https://www.imdb.com/name/nm1506362/` (already in prompt)
- Vimeo profile
- Spotify for Artists URL
- Apple Music artist URL
- Instagram
- LinkedIn
- Bandcamp / SoundCloud (if you release music there)

## 2. Fix the CV

The PDF says "Cannes Golden Lion" — change to **"Cannes Lions Gold" (Best Internet Film, Dead Island, 2011)**. Two different awards, two different industries (the Palme d'Or is from the Cannes Film Festival; the Lions are from the advertising festival). People in your world will spot it.

## 3. Consider a Wikipedia stub

Three decades, Cannes Lions Gold, Sundance, BAFTA Kids, RTS — you almost certainly meet notability criteria. A Wikipedia entry is an unusually strong entity signal because AI tools weight it heavily for disambiguation. Don't write it yourself (conflict of interest); if a journalist or collaborator ever offered to draft something, this is the moment.

## 4. Add IMDb to your site footer as a visible link

The schema tells robots; the footer link tells humans *and* gives crawlers a third confirmation path.

## 5. Optional follow-up: OpenGraph / Twitter Card metadata per project page

Once the JSON-LD is done, the natural next step is per-page Open Graph and Twitter Card metadata so each project page gets a proper preview when shared on Slack, X, LinkedIn, iMessage etc. Ask Claude to generate that as a follow-up — it can reuse the same `works.ts` data source.

---

# Reference data (for when you come back to this)

**Stack:** Next.js (App Router likely, based on `_next/image` paths and Cloudflare Images)

**Site structure observed:**
- Homepage with anchors: `#work`, `#practice`, `#live`, `#contact`
- `/immersive` — Installation & Museum section
- `/writing` — Essays ("The Quiet Room")
- `/work/[slug]` — Individual project pages (distance-to-the-moon, holy-hell, dead-island, siren-servers, valhalla-rising, visit-scotland, story-trails)

**Key facts:**
- Born 25/06/1971, British, Glasgow
- giles@gileslamb.com (creative) / info@gileslamb.com (sync/licensing)
- Curious Dreamers co-founded 2023 with Sacha Kyle
- Savalas Ltd co-founded 1998, exited 2016
- University of Glasgow: BSc Neuroscience & Psychology, MPhil
- IMDb: nm1506362
