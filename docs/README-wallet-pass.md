# Apple Wallet Pass — Setup Guide

Generates `gileslamb-card.pkpass` — an Apple Wallet Generic pass for Giles Lamb's digital business card.

---

## Files

```
wallet/
  pass.model/
    pass.json           pass definition (fields, colours, QR code)
    icon.png            pass icon — replace placeholder with real (29x29 px)
    icon@2x.png         58x58 px
    icon@3x.png         87x87 px
    logo.png            top-left wordmark — replace placeholder (160x50 px)
    logo@2x.png         320x100 px
    logo@3x.png         480x150 px
  certs/                gitignored — place PEM certs here (see below)
scripts/
  generate-pass.js      builds and signs the .pkpass
  create-pass-placeholders.js  one-time setup: writes placeholder PNGs
docs/
  README-wallet-pass.md this file
```

---

## Step 1 — Register a Pass Type ID

1. Go to developer.apple.com > Certificates, IDs & Profiles > Identifiers.
2. Click + and choose **Pass Type IDs**.
3. Register identifier: `pass.com.gileslamb.card`.
4. Note your **Team ID** (10-character string shown at the top right of the developer portal).

---

## Step 2 — Create the Pass Type ID Certificate

1. In Identifiers, select `pass.com.gileslamb.card` > Edit > Create Certificate.
2. Follow the CSR instructions (Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority).
3. Download the resulting `.cer` file and double-click to install it in Keychain.
4. In Keychain Access, find the certificate under "My Certificates", right-click > Export > save as `Certificates.p12`. Set a passphrase.

---

## Step 3 — Download the Apple WWDR Intermediate Certificate

From the Apple PKI page (search "Apple PKI" on developer.apple.com), download the **G4** intermediate certificate (AppleWWDRCAG4.cer). Convert it to PEM:

```bash
openssl x509 -inform DER -in AppleWWDRCAG4.cer -out wallet/certs/wwdr.pem
```

---

## Step 4 — Extract Signer Cert and Key from the .p12

```bash
# Signer certificate
openssl pkcs12 -in Certificates.p12 \
  -clcerts -nokeys \
  -out wallet/certs/signerCert.pem \
  -passin pass:YOUR_P12_PASSPHRASE

# Signer key (choose a key passphrase — you'll need it at sign time)
openssl pkcs12 -in Certificates.p12 \
  -nocerts \
  -out wallet/certs/signerKey.pem \
  -passin pass:YOUR_P12_PASSPHRASE \
  -passout pass:YOUR_KEY_PASSPHRASE
```

Both files are gitignored via `*.pem`. Keep them out of source control.

---

## Step 5 — Set Team ID in pass.json

Open `wallet/pass.model/pass.json` and replace:

```json
"teamIdentifier": "REPLACE_WITH_APPLE_TEAM_ID"
```

with your actual 10-character Team ID.

---

## Step 6 — Install the npm package

```bash
npm install --save-dev passkit-generator
```

---

## Step 7 — Create placeholder images (first run only)

```bash
node scripts/create-pass-placeholders.js
```

Replace the placeholder PNGs with real branded images when ready:
- `icon.png` / `@2x` / `@3x` — white mark on dark background, square
- `logo.png` / `@2x` / `@3x` — "GILES LAMB" wordmark, white on transparent, 160x50 px base size

---

## Step 8 — Generate the pass

```bash
# Using cert files in wallet/certs/
APPLE_SIGNER_KEY_PASSPHRASE=YOUR_KEY_PASSPHRASE node scripts/generate-pass.js

# Or to a custom path
APPLE_SIGNER_KEY_PASSPHRASE=YOUR_KEY_PASSPHRASE node scripts/generate-pass.js --out /tmp/test.pkpass
```

Output: `public/gileslamb-card.pkpass`

---

## Using env vars instead of cert files (recommended for CI)

Convert each PEM file to base64 and set as environment variables:

```bash
APPLE_WWDR_CERT_B64=$(base64 -i wallet/certs/wwdr.pem)
APPLE_SIGNER_CERT_B64=$(base64 -i wallet/certs/signerCert.pem)
APPLE_SIGNER_KEY_B64=$(base64 -i wallet/certs/signerKey.pem)
APPLE_SIGNER_KEY_PASSPHRASE=YOUR_KEY_PASSPHRASE
```

Set these in Vercel's project environment variables (Settings > Environment Variables) to run generation in a build hook or serverless function.

---

## Hosting the .pkpass

The generated file lands at `public/gileslamb-card.pkpass`. Vercel serves `/public` directly, so after deploying it will be accessible at:

```
https://gileslamb.com/gileslamb-card.pkpass
```

The file must be served with the correct MIME type: `application/vnd.apple.pkpass`. Vercel sets this automatically for `.pkpass` files.

Alternatively, upload to R2 and serve from the public bucket URL.

---

## Adding an "Add to Wallet" button on /card

Once the pass is hosted, add an Apple Wallet badge link to the card page. Apple provides an official badge image. The link pattern is:

```html
<a href="/gileslamb-card.pkpass">
  <img
    src="/add-to-wallet-badge.svg"
    alt="Add to Apple Wallet"
    width="119"
    height="40"
  />
</a>
```

Download the official "Add to Apple Wallet" badge from the Apple Wallet developer resources page (search "Add to Apple Wallet badge" on developer.apple.com). Place the badge image in `public/`.

On iOS Safari, tapping a `.pkpass` link triggers the native Wallet prompt automatically — no JavaScript required.

---

## Testing

1. Run `node scripts/generate-pass.js` to produce the `.pkpass`.
2. Email it to yourself or AirDrop it to an iPhone — iOS will offer to add it to Wallet.
3. For simulator testing, drag the `.pkpass` file onto the iOS Simulator window.
4. Use the [Wallet Passes](https://developer.apple.com/documentation/walletpasses) documentation for field layout reference.

---

## Updating the pass

To update the serial number (e.g. for a new event), edit `serialNumber` in `wallet/pass.model/pass.json` and regenerate. Each unique `serialNumber` is treated as a distinct pass by Wallet.

To push live updates to passes already installed on devices, you need a push notification setup (APNs + a web service endpoint). That is a separate integration and not covered here.
