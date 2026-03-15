const fs = require("fs");
const path = require("path");

const MAP_PATH = path.join(__dirname, "image-map.json");
const ROOT = path.join(__dirname, "..");
const EXTENSIONS = [".jsx", ".js", ".tsx", ".ts", ".mdx", ".css"];

function findSourceFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    if (entry.isDirectory()) {
      findSourceFiles(fullPath, results);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

function run() {
  const map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);

  if (keys.length === 0) {
    console.log("No mappings in image-map.json.");
    return;
  }

  const files = findSourceFiles(ROOT);
  const changed = [];
  const replacements = [];

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    let modified = false;
    const relPath = path.relative(ROOT, file);

    for (const localPath of keys) {
      const cloudflareUrl = map[localPath];
      if (content.includes(localPath)) {
        content = content.split(localPath).join(cloudflareUrl);
        modified = true;
        replacements.push({ file: relPath, from: localPath, to: cloudflareUrl });
      }
    }

    if (modified) {
      fs.writeFileSync(file, content);
      changed.push(relPath);
    }
  }

  console.log("Files changed:");
  changed.forEach((f) => console.log("  " + f));
  console.log("\nReplacements made:");
  replacements.forEach(({ file, from, to }) => {
    console.log(`  ${file}:`);
    console.log(`    ${from}`);
    console.log(`    → ${to}`);
  });
  console.log(`\nTotal: ${changed.length} file(s), ${replacements.length} replacement(s)`);
}

run();
