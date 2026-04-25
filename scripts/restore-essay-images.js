#!/usr/bin/env node
/**
 * Upload all essay images to Cloudflare and restore them into the MDX files.
 *
 * What it does:
 *   1. Reads each MDX file's ORIGINAL version from git (to find removed images)
 *   2. Uploads each unique image to Cloudflare Images
 *   3. Re-inserts the images into the current MDX files with the new CF URLs
 *
 * Usage (run from project root):
 *   CLOUDFLARE_API_TOKEN=xxx node scripts/restore-essay-images.js
 *
 * Safe to re-run — Cloudflare returns existing URL if image already uploaded.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ACCOUNT_ID = "90522b3dad0012adb50674261bd43351";
const WRITING_DIR = "content/writing";

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Substackcdn URLs wrap the real S3 URL — decode for a cleaner fetch target
function resolveUrl(url) {
  const match = url.match(/\/https?%3A%2F%2F(.+)$/);
  if (match) return "https://" + decodeURIComponent(match[0].slice(1));
  return url;
}

// Derive a short, stable Cloudflare image ID from the UUID in the S3 filename
function imageIdFromUrl(url) {
  const real = resolveUrl(url);
  const filename = real.split("/").pop().split("?")[0]; // e.g. ab12cd_1024x1024.png
  return filename.replace(/\.[^.]+$/, "").slice(0, 64).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

async function uploadFromUrl(sourceUrl, imageId, token) {
  const fetchUrl = resolveUrl(sourceUrl);
  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error(`Fetch failed (${res.status}): ${fetchUrl}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const ext = contentType.split("/")[1]?.split(";")[0] || "jpg";

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: contentType }), `img.${ext}`);
  form.append("id", imageId);

  const up = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form }
  );
  const json = await up.json();

  if (!json.success) {
    if (json.errors?.[0]?.code === 10007) {
      // Already exists
      return `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/${imageId}/public`;
    }
    throw new Error(JSON.stringify(json.errors));
  }
  const variants = json.result?.variants || [];
  return variants.find((v) => v.includes("/public")) || variants[0];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Accept token from env var OR --token=xxx argument
  const tokenArg = process.argv.find((a) => a.startsWith("--token="));
  const token = tokenArg ? tokenArg.slice(8) : process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    console.error("Pass your token: node scripts/restore-essay-images.js --token=YOUR_TOKEN");
    process.exit(1);
  }

  // Find all MDX files that differ from HEAD (i.e. had images removed)
  const changedFiles = execSync(`git diff --name-only HEAD -- "${WRITING_DIR}"`)
    .toString().trim().split("\n").filter((f) => f.endsWith(".mdx") && f !== "");

  if (changedFiles.length === 0) {
    console.log("No changed MDX files found in git diff.");
    return;
  }

  // For each changed file, compare original vs current to find removed image lines
  const plan = []; // { file, originalLineIndex, imageLine, imageUrl }

  for (const relPath of changedFiles) {
    let originalContent;
    try {
      originalContent = execSync(`git show HEAD:"${relPath}"`).toString();
    } catch {
      console.warn(`Could not read original for ${relPath}, skipping.`);
      continue;
    }

    const originalLines = originalContent.split("\n");
    originalLines.forEach((line, idx) => {
      if (/^!\[.*\]\(https?:\/\/(substack|substackcdn)/.test(line)) {
        const urlMatch = line.match(/\(([^)]+)\)/);
        if (urlMatch) {
          plan.push({
            file: relPath,
            originalLineIndex: idx,
            imageLine: line,
            imageUrl: urlMatch[1],
          });
        }
      }
    });
  }

  console.log(`Found ${plan.length} images across ${changedFiles.length} files.\n`);

  // Upload all unique URLs to Cloudflare
  const urlMap = {}; // substack URL → cloudflare URL
  const uniqueUrls = [...new Set(plan.map((p) => p.imageUrl))];

  for (const url of uniqueUrls) {
    const id = imageIdFromUrl(url);
    process.stdout.write(`Uploading ${id}... `);
    try {
      const cfUrl = await uploadFromUrl(url, id, token);
      urlMap[url] = cfUrl;
      console.log(`✓`);
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
      urlMap[url] = null;
    }
  }

  // Re-insert images into current MDX files
  console.log("\nRestoring images into MDX files...");

  // Group plan entries by file, preserving original order
  const byFile = {};
  for (const entry of plan) {
    if (!byFile[entry.file]) byFile[entry.file] = [];
    byFile[entry.file].push(entry);
  }

  for (const [relPath, entries] of Object.entries(byFile)) {
    const currentContent = fs.readFileSync(relPath, "utf8");
    const currentLines = currentContent.split("\n");

    // Insert from bottom up so earlier insertions don't shift line numbers
    const sorted = [...entries].sort((a, b) => b.originalLineIndex - a.originalLineIndex);

    for (const entry of sorted) {
      const cfUrl = urlMap[entry.imageUrl];
      if (!cfUrl) {
        console.warn(`  Skipping failed image in ${relPath}`);
        continue;
      }

      // Build new image line with CF URL (preserve original alt text)
      const altMatch = entry.imageLine.match(/^!\[([^\]]*)\]/);
      const alt = altMatch ? altMatch[1] : "";
      const newLine = `![${alt}](${cfUrl})`;

      // The insertion point in the current file:
      // original line N with K images removed before it → now at line N - K
      const imagesRemovedBefore = entries.filter(
        (e) => e.originalLineIndex < entry.originalLineIndex
      ).length;
      const insertAt = entry.originalLineIndex - imagesRemovedBefore;

      currentLines.splice(insertAt, 0, newLine);
    }

    fs.writeFileSync(relPath, currentLines.join("\n"), "utf8");
    console.log(`  ✓ ${relPath} (${entries.length} image${entries.length > 1 ? "s" : ""})`);
  }

  console.log("\nDone. All images restored with Cloudflare URLs.");
}

main().catch((err) => { console.error(err); process.exit(1); });
