#!/usr/bin/env node
/**
 * Batch-upload all Substack/S3 images found in content/writing MDX files
 * directly to Cloudflare Images (no manual downloading needed).
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=xxx node scripts/upload-essay-images.js
 *
 * Output:
 *   Prints a URL map (old → new) and optionally rewrites the MDX files.
 *   Pass --rewrite to update the MDX files in place.
 */

const fs = require("fs");
const path = require("path");

const ACCOUNT_ID = "90522b3dad0012adb50674261bd43351";
const WRITING_DIR = path.join(__dirname, "../content/writing");

// Extract all image URLs from MDX frontmatter (coverImage) and body
function extractImages(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const results = [];

  // Frontmatter coverImage
  const coverMatch = content.match(/^coverImage:\s*"(https?:\/\/[^"]+)"/m);
  if (coverMatch) {
    results.push({ url: coverMatch[1], context: "coverImage", file: filePath });
  }

  // Body markdown images: ![alt](url)
  const bodyRe = /!\[[^\]]*\]\((https?:\/\/[^\)]+)\)/g;
  let m;
  while ((m = bodyRe.exec(content)) !== null) {
    results.push({ url: m[1], context: "body", file: filePath });
  }

  return results;
}

function slugFromUrl(url) {
  // Build a readable Cloudflare image ID from the filename part of the URL
  const base = url.split("/").pop().split("?")[0];
  // Strip the UUID prefix that Substack uses and keep extension
  const withoutExt = base.replace(/\.[^.]+$/, "");
  return withoutExt.slice(0, 60).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

async function uploadFromUrl(imageUrl, imageId, apiToken) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${imageUrl}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  // Detect content type
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const ext = contentType.split("/")[1]?.split(";")[0] || "jpg";
  const blob = new Blob([buffer], { type: contentType });

  const formData = new FormData();
  formData.append("file", blob, `image.${ext}`);
  formData.append("id", imageId);

  const uploadRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiToken}` },
      body: formData,
    }
  );

  const json = await uploadRes.json();
  if (!json.success) {
    // Already exists — return the known URL
    if (json.errors?.[0]?.code === 10007) {
      return `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/${imageId}/public`;
    }
    throw new Error(JSON.stringify(json.errors || json));
  }
  const variants = json.result?.variants || [];
  return variants.find((v) => v.includes("/public")) || variants[0];
}

async function main() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    console.error("Error: CLOUDFLARE_API_TOKEN env var not set.");
    process.exit(1);
  }

  const rewrite = process.argv.includes("--rewrite");
  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx"));

  // Collect all unique image URLs across all files
  const allImages = [];
  const seen = new Set();
  for (const file of files) {
    const imgs = extractImages(path.join(WRITING_DIR, file));
    for (const img of imgs) {
      if (!seen.has(img.url)) {
        seen.add(img.url);
        allImages.push(img);
      }
    }
  }

  // Filter to only Substack/S3 URLs (skip already-Cloudflare URLs)
  const toUpload = allImages.filter(
    (img) =>
      img.url.includes("substack-post-media.s3") ||
      img.url.includes("substackcdn.com") ||
      img.url.includes("substack.com")
  );

  if (toUpload.length === 0) {
    console.log("No Substack images found to upload.");
    return;
  }

  console.log(`Found ${toUpload.length} unique Substack images to upload.\n`);

  const urlMap = {}; // old URL → new Cloudflare URL

  for (const img of toUpload) {
    const id = slugFromUrl(img.url);
    process.stdout.write(`Uploading ${id}... `);
    try {
      const cfUrl = await uploadFromUrl(img.url, id, token);
      urlMap[img.url] = cfUrl;
      console.log(`✓ ${cfUrl}`);
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
      urlMap[img.url] = null;
    }
  }

  console.log("\n--- URL MAP ---");
  for (const [old, next] of Object.entries(urlMap)) {
    console.log(`${old}\n  → ${next ?? "FAILED"}\n`);
  }

  if (rewrite) {
    console.log("\nRewriting MDX files...");
    for (const file of files) {
      const filePath = path.join(WRITING_DIR, file);
      let content = fs.readFileSync(filePath, "utf8");
      let changed = false;
      for (const [old, next] of Object.entries(urlMap)) {
        if (next && content.includes(old)) {
          content = content.split(old).join(next);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`  Updated: ${file}`);
      }
    }
    console.log("Done.");
  } else {
    console.log("\nRun with --rewrite to update the MDX files automatically.");
  }
}

main();
