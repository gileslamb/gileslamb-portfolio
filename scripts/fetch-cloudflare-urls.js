#!/usr/bin/env node
/**
 * Fetches Cloudflare Images delivery URLs from the API.
 * Requires: export CLOUDFLARE_API_TOKEN=your_token_here
 */
const ACCOUNT_ID = "90522b3dad0012adb50674261bd43351";

async function fetchImages() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    console.error(
      "Error: CLOUDFLARE_API_TOKEN is not set.\n\n" +
        "Please run:\n  export CLOUDFLARE_API_TOKEN=your_token_here\n\n" +
        "Then rerun this script."
    );
    process.exit(1);
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1?per_page=100`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401) {
      console.error(
        "API error: 401 Unauthorized\n\n" +
          "Your CLOUDFLARE_API_TOKEN is invalid, expired, or lacks permission.\n\n" +
          "Fix: Create a new API token at https://dash.cloudflare.com/profile/api-tokens\n" +
          "  • Use \"Create Custom Token\"\n" +
          "  • Permissions: Account → Cloudflare Images → Edit\n" +
          "  • Account Resources: Include → your account\n"
      );
    } else {
      console.error(`API error: ${res.status} ${res.statusText}\n${body}`);
    }
    process.exit(1);
  }

  const json = await res.json();
  if (!json.success || !json.result) {
    console.error("API returned unsuccessful response:", json);
    process.exit(1);
  }

  const images = json.result.images || [];
  const map = {};
  for (const img of images) {
    const id = img.id;
    const variants = img.variants || [];
    const publicUrl = variants.find((v) => v.includes("/public")) || variants[0];
    if (publicUrl) map[id] = publicUrl;
  }

  console.log(JSON.stringify(map, null, 2));
}

fetchImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
