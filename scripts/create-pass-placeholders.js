#!/usr/bin/env node
/**
 * create-pass-placeholders.js
 *
 * Writes 1x1 placeholder PNGs into wallet/pass.model/ so passkit-generator
 * can run before real branded images are ready. Run once during initial setup.
 *
 * Usage:
 *   node scripts/create-pass-placeholders.js
 *
 * Replace these files with real branded images before distributing the pass:
 *   icon.png     — 29x29 px   (pass icon, used in notifications)
 *   icon@2x.png  — 58x58 px
 *   icon@3x.png  — 87x87 px
 *   logo.png     — 160x50 px  (shown top-left of pass)
 *   logo@2x.png  — 320x100 px
 *   logo@3x.png  — 480x150 px
 */

const fs   = require("fs");
const path = require("path");

const MODEL_DIR = path.join(__dirname, "../wallet/pass.model");

// Minimal valid 1x1 transparent PNG (no external deps required)
const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAABjE+ibYAAAAASUVORK5CYII=",
  "base64"
);

const IMAGES = [
  { file: "icon.png",     replace: "29×29 px square" },
  { file: "icon@2x.png",  replace: "58×58 px square" },
  { file: "icon@3x.png",  replace: "87×87 px square" },
  { file: "logo.png",     replace: "160×50 px, white wordmark on transparent" },
  { file: "logo@2x.png",  replace: "320×100 px" },
  { file: "logo@3x.png",  replace: "480×150 px" },
];

fs.mkdirSync(MODEL_DIR, { recursive: true });

let created = 0;
for (const img of IMAGES) {
  const dest = path.join(MODEL_DIR, img.file);
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, PNG_1X1);
    console.log(`  created  ${img.file}  — replace with ${img.replace}`);
    created++;
  } else {
    console.log(`  exists   ${img.file}  — skipped`);
  }
}

console.log(`\n${created} placeholder(s) written to wallet/pass.model/`);
if (created > 0) {
  console.log("Replace them with real branded images before distributing the pass.");
}
