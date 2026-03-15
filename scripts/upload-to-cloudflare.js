const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public/images");
const MAP_PATH = path.join(__dirname, "image-map.json");

function findImages(dir, base = "") {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const imageExt = /\.(jpg|jpeg|png|gif|webp|heic)$/i;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      results.push(...findImages(fullPath, relPath));
    } else if (imageExt.test(entry.name)) {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

function toImageId(relPath) {
  return relPath
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9/._-]/g, "-")
    .replace(/\/+/g, "/")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/\//g, "-");
}

async function uploadImage(filePath, imageId, accountId, apiToken) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime =
    {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".heic": "image/heic",
    }[ext] || "image/jpeg";

  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: mime }), path.basename(filePath));
  formData.append("id", imageId);

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}` },
    body: formData,
  });

  const json = await res.json();

  if (json.success && json.result?.variants?.[0]) {
    return json.result.variants[0];
  }
  if (json.errors?.[0]?.code === 10007) {
    const getRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );
    const getJson = await getRes.json();
    if (getJson.success && getJson.result?.variants?.[0]) {
      return getJson.result.variants[0];
    }
  }
  throw new Error(json.errors?.[0]?.message || JSON.stringify(json));
}

async function run() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN");
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log("No public/images directory found.");
    fs.writeFileSync(MAP_PATH, "{}");
    process.exit(0);
  }

  const images = findImages(PUBLIC_DIR);
  const map = {};

  console.log(`Found ${images.length} images to upload.\n`);

  for (let i = 0; i < images.length; i++) {
    const { fullPath, relPath } = images[i];
    let localPath = "/images/" + relPath.replace(/\\/g, "/");
    // Map disk paths to code paths: DTTM /High Res Stills/ → DTTM/
    localPath = localPath.replace(/\/DTTM\s*\/High Res Stills\//i, "/DTTM/");
    const imageId = toImageId(relPath);

    process.stdout.write(`[${i + 1}/${images.length}] ${localPath} ... `);

    try {
      const url = await uploadImage(fullPath, imageId, accountId, apiToken);
      map[localPath] = url;
      console.log(`✓ ${url.substring(0, 50)}...`);
    } catch (err) {
      if (err.message?.includes("already exists") || err.message?.includes("10007")) {
        map[localPath] = `https://imagedelivery.net/${accountId}/${imageId}/public`;
        console.log("✓ (already exists)");
      } else {
        console.log(`✗ ${err.message}`);
      }
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  fs.writeFileSync(MAP_PATH, JSON.stringify(map, null, 2));
  console.log(`\nWrote ${Object.keys(map).length} mappings to scripts/image-map.json`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
