#!/usr/bin/env node
/**
 * Upload Holy Hell images to Cloudflare from source URLs.
 * Uses CLOUDFLARE_API_TOKEN env var.
 */
const ACCOUNT_ID = "90522b3dad0012adb50674261bd43351";

const UPLOADS = [
  {
    url: "https://gileslamb.com/assets/images/HolyHellCNNPoster.jpg",
    id: "holyhell-cnn-poster",
  },
  {
    url: "https://gileslamb.com/assets/images/hero-Holy-Hell-2016-2.jpg",
    id: "hero-holy-hell-2016-2",
  },
];

async function uploadFromUrl(imageUrl, imageId, apiToken) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${imageUrl}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const blob = new Blob([buffer], { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("file", blob, "image.jpg");
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
    if (json.errors?.[0]?.code === 10007) {
      return { id: imageId, url: `https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/${imageId}/public`, existing: true };
    }
    throw new Error(JSON.stringify(json.errors || json));
  }
  const variants = json.result?.variants || [];
  const publicUrl = variants.find((v) => v.includes("/public")) || variants[0];
  return { id: imageId, url: publicUrl };
}

async function main() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    console.error("Error: CLOUDFLARE_API_TOKEN is not set.");
    process.exit(1);
  }

  const results = [];
  for (const { url, id } of UPLOADS) {
    try {
      const r = await uploadFromUrl(url, id, token);
      results.push(r);
      console.log(`${id}: ${r.url}${r.existing ? " (already existed)" : ""}`);
    } catch (err) {
      console.error(`Failed ${id}:`, err.message);
      process.exit(1);
    }
  }
  console.log("\nDone. URLs:", JSON.stringify(results, null, 2));
}

main();
