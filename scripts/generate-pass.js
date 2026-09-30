#!/usr/bin/env node
/**
 * generate-pass.js
 *
 * Generates gileslamb-card.pkpass using passkit-generator.
 * Outputs to public/gileslamb-card.pkpass by default (or --out <path>).
 *
 * Prerequisites:
 *   npm install passkit-generator          (or npm install --save-dev passkit-generator)
 *   node scripts/create-pass-placeholders.js
 *   Set teamIdentifier in wallet/pass.model/pass.json
 *   Supply certificates (see docs/README-wallet-pass.md)
 *
 * Certificates — two options (env vars take priority):
 *
 *   Option A — env vars (recommended for CI / Vercel build hooks):
 *     APPLE_WWDR_CERT_B64        base64-encoded wwdr.pem
 *     APPLE_SIGNER_CERT_B64      base64-encoded signerCert.pem
 *     APPLE_SIGNER_KEY_B64       base64-encoded signerKey.pem
 *     APPLE_SIGNER_KEY_PASSPHRASE  passphrase used when exporting signer key
 *
 *   Option B — cert files in wallet/certs/:
 *     wallet/certs/wwdr.pem
 *     wallet/certs/signerCert.pem
 *     wallet/certs/signerKey.pem
 *     (files are gitignored via *.pem rule)
 *
 * Usage:
 *   node scripts/generate-pass.js
 *   node scripts/generate-pass.js --out /tmp/test.pkpass
 */

const { PKPass } = require("passkit-generator");
const fs   = require("fs");
const path = require("path");

const MODEL_DIR = path.join(__dirname, "../wallet/pass.model");
const CERTS_DIR = path.join(__dirname, "../wallet/certs");

// ---- helpers ----------------------------------------------------------------

function readCert(envVar, filename) {
  if (process.env[envVar]) {
    return Buffer.from(process.env[envVar], "base64");
  }
  const p = path.join(CERTS_DIR, filename);
  if (!fs.existsSync(p)) {
    throw new Error(
      `Certificate missing.\n` +
      `  Set env var ${envVar}  OR  place ${filename} in wallet/certs/\n` +
      `  See docs/README-wallet-pass.md for setup instructions.`
    );
  }
  return fs.readFileSync(p);
}

function outPath() {
  const idx = process.argv.indexOf("--out");
  return idx !== -1
    ? process.argv[idx + 1]
    : path.join(__dirname, "../public/gileslamb-card.pkpass");
}

// ---- main -------------------------------------------------------------------

async function generate() {
  // Validate model dir
  if (!fs.existsSync(path.join(MODEL_DIR, "pass.json"))) {
    console.error(`pass.json not found in ${MODEL_DIR}`);
    process.exit(1);
  }

  const missingImages = ["icon.png", "logo.png"].filter(
    (f) => !fs.existsSync(path.join(MODEL_DIR, f))
  );
  if (missingImages.length) {
    console.error(
      `Missing required images: ${missingImages.join(", ")}\n` +
      `Run: node scripts/create-pass-placeholders.js`
    );
    process.exit(1);
  }

  // Load certificates
  let wwdr, signerCert, signerKey;
  try {
    wwdr       = readCert("APPLE_WWDR_CERT_B64",   "wwdr.pem");
    signerCert = readCert("APPLE_SIGNER_CERT_B64", "signerCert.pem");
    signerKey  = readCert("APPLE_SIGNER_KEY_B64",  "signerKey.pem");
  } catch (err) {
    console.error("\nCertificate error:", err.message);
    process.exit(1);
  }

  console.log("Building pass…");

  const pass = await PKPass.from(
    {
      model: MODEL_DIR,
      certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase: process.env.APPLE_SIGNER_KEY_PASSPHRASE || "",
      },
    },
    {}
  );

  const buffer = await pass.getAsBuffer();
  const dest   = outPath();
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`Pass written: ${dest}  (${kb} KB)`);
}

generate().catch((err) => {
  console.error("\nFailed to generate pass:", err.message || err);
  process.exit(1);
});
