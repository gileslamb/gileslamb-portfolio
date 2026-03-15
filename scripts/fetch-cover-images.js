const fs = require('fs');
const path = require('path');
const https = require('https');

const contentDir = path.join(__dirname, '../content/writing');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

async function fetchOgImage(slug) {
  return new Promise((resolve) => {
    const url = `https://gileslamb.substack.com/p/${slug}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
        resolve(match ? match[1] : null);
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has coverImage
    if (content.includes('coverImage:')) continue;

    // Extract slug from frontmatter
    const slugMatch = content.match(/slug:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    console.log(`Fetching image for: ${slug}`);
    const imageUrl = await fetchOgImage(slug);

    if (imageUrl) {
      // Insert coverImage after slug line
      const updated = content.replace(
        `slug: "${slug}"`,
        `slug: "${slug}"\ncoverImage: "${imageUrl}"`
      );
      fs.writeFileSync(filePath, updated);
      console.log(`  ✓ ${imageUrl.substring(0, 60)}...`);
    } else {
      console.log(`  ✗ No image found`);
    }

    // Be polite to Substack's server
    await new Promise(r => setTimeout(r, 500));
  }
}

run();
