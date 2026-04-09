# Essay Publishing Workflow
### gileslamb-portfolio / The Quiet Room

---

## Overview

Essays live in `content/writing/` as MDX files.
Filename format: `YYYY-MM-DD-slug.mdx`
The writing index at `/writing` sorts by the `date` field in frontmatter — newest first.

---

## Step 1 — Get images from Substack

Before creating the MDX file, grab the image URLs from the Substack post.

1. Open the published Substack post in Chrome
2. Open DevTools → Console and run:

```javascript
Array.from(document.querySelectorAll('img'))
  .map(img => img.src)
  .filter(src => src.includes('substack-post-media') || src.includes('substackcdn'))
  .filter(src => src.includes('w_1456') || src.includes('w_1200'))
```

This returns the full-size body images in order. Copy them — you'll need them for the MDX.

The **cover image** is usually the first `w_1456` result.

---

## Step 2 — Check next.config.ts allows Substack images

Open `next.config.ts` and confirm `substackcdn.com` is in the `images.remotePatterns` array:

```ts
{
  protocol: 'https',
  hostname: 'substackcdn.com',
},
```

If it's missing, add it. Only needs doing once.

---

## Step 3 — Create the MDX file

Create `content/writing/YYYY-MM-DD-slug.mdx` with this frontmatter template:

```mdx
---
title: "Your Essay Title"
subtitle: "Your essay subtitle or tagline"
date: "YYYY-MM-DD"
description: "One sentence description for SEO and essay listing."
slug: "your-essay-slug"
coverImage: "https://substackcdn.com/image/fetch/...first-image-url..."
substack: "https://open.substack.com/pub/gileslamb/p/your-post-slug"
---
```

**Rules:**
- `date` must match the filename date and the Substack publish date
- `slug` must match the filename slug exactly
- `coverImage` = first body image from Step 1
- `substack` = the full Substack URL (use the open.substack.com share URL)

---

## Step 4 — Add body images

Images go **after** section headings, not before. Format:

```mdx
#### Section Heading

![](https://substackcdn.com/image/fetch/.../image-uuid.png)

Body text continues here...
```

Place images in the same order they appear in the Substack post. Use the `w_1456` URLs from Step 1.

---

## Step 5 — Check the essay opens cleanly

The essay body should start with the **first sentence of article text** — no Substack URLs, no image paths, no metadata. The essay openings cleanup has been applied to all existing essays; new ones should follow suit.

---

## Step 6 — Commit and push

```bash
git add content/writing/YYYY-MM-DD-your-slug.mdx
git commit -m "Add essay: Your Essay Title"
git push
```

Vercel auto-deploys on push. The essay will be live at:
`gileslamb.com/writing/your-essay-slug`

---

## Step 7 — LinkedIn post

Once deployed, post the LinkedIn update with:
- The Substack link for people who subscribe there
- The direct site link: `gileslamb.com/writing/your-essay-slug`

---

## Checklist

- [ ] Images fetched from Substack via DevTools console
- [ ] `substackcdn.com` in `next.config.ts` remotePatterns
- [ ] MDX file created with correct filename format
- [ ] All frontmatter fields populated
- [ ] Cover image set to first body image
- [ ] Body images placed after section headings in order
- [ ] Essay body starts with first sentence of article text (no Substack artefacts)
- [ ] Committed and pushed
- [ ] Live on gileslamb.com
- [ ] LinkedIn posted with both links

---

## Common mistakes to avoid

| Problem | Fix |
|---|---|
| Essay showing wrong date | Check `date` in frontmatter matches the Substack publish date, not today |
| Cover image showing Dream Screens image | You forgot to set `coverImage` in frontmatter — Cursor defaulted to a site image |
| Body images not showing | Check `substackcdn.com` is in `next.config.ts` remotePatterns |
| Essay at wrong position in list | Date in frontmatter doesn't match — fix the `date` field |
| Essay starts with Substack URL or image path | Remove everything before the first sentence of article text |

---

*Last updated: 30 March 2026*
