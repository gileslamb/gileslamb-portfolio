#!/usr/bin/env node
/**
 * Upload Holy Hell images to Cloudflare Images.
 * Run: CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... node scripts/upload-holy-hell-images.js
 *
 * Expected files in scripts/holy-hell-images/:
 *   - poster.jpg (or .png) → holyhell-cnn-poster
 *   - hero.jpg (or .png)   → hero-holy-hell-2016-2
 *   - still.jpg (or .png)  → man-reaching-surrounded-hands
 *
 * Or pass paths: node scripts/upload-holy-hell-images.js poster.jpg hero.jpg still.jpg
 */

const fs = require("fs");
const path = require("path");

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "90522b3dad0012adb50674261bd43351";
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const DEFAULT_DIR = path.join(__dirname, "holy-hell-images");
const UPLOADS = [
  { id: "holyhell-cnn-poster", filename: "poster.jpg", alt: "poster.png" },
  { id: "hero-holy-hell-2016-2", filename: "hero.jpg", alt: "hero.png" },
  { id: "man-reaching-surrounded-hands", filename: "still.jpg", alt: "still.png" },
];

async function upload(filePath, imageId) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" }[ext] || "image/jpeg";

  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: mime }), path.basename(filePath));
  formData.append("id", imageId);

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      body: formData,
    }
  );

  const json = await res.json();
  if (!json.success) {
    if (json.errors?.[0]?.code === 10007) {
      const getRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${imageId}`,
        { headers: { Authorization: `Bearer ${API_TOKEN}` } }
      );
      const getJson = await getRes.json();
      return getJson.result?.variants?.[0] || `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/${imageId}/public`;
    }
    throw new Error(JSON.stringify(json.errors || json));
  }
  return json.result?.variants?.[0] || `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/${imageId}/public`;
}

function resolvePaths() {
  const args = process.argv.slice(2);
  if (args.length >= 3) {
    return [
      { path: args[0], ...UPLOADS[0] },
      { path: args[1], ...UPLOADS[1] },
      { path: args[2], ...UPLOADS[2] },
    ];
  }
  return UPLOADS.map((u) => ({
    ...u,
    path: path.join(DEFAULT_DIR, u.filename),
  })).concat(
    UPLOADS.flatMap((u) => [
      { ...u, path: path.join(DEFAULT_DIR, u.alt) },
    ]).filter((_, i) => i % 3 === 0).map((_, i) => UPLOADS.map(u => ({ ...u, path: path.join(DEFAULT_DIR, u.alt) }))[i])
  );
}

async function main() {
  if (!API_TOKEN) {
    console.error("Set CLOUDFLARE_API_TOKEN");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const items = args.length >= 3
    ? [
        { filePath: args[0], ...UPLOADS[0] },
        { filePath: args[1], ...UPLOADS[1] },
        { filePath: args[2], ...UPLOADS[2] },
      ]
    : UPLOADS.map((u) => ({
        ...u,
        filePath: [path.join(DEFAULT_DIR, u.filename), path.join(DEFAULT_DIR, u.alt)].find((p) =>
          fs.existsSync(p)
        ) || path.join(DEFAULT_DIR, u.filename),
      }));

  for (const { filePath, id, filename } of items) {
    if (!fs.existsSync(filePath)) {
      console.warn(`Skip ${id}: ${filePath} not found`);
      continue;
    }
    try {
      const url = await upload(filePath, id);
      console.log(`${id} → ${url}`);
    } catch (e) {
      console.error(`${id}: ${e.message}`);
    }
  }
}

main();
