#!/usr/bin/env node
// Send a markdown file to the mailing list via Resend.
//
//   npm run send-email -- --file <markdown> --subject "<subject>" [--dry-run | --test]
//
// The list is the giles-engine D1 `subscribers` table (status='active'). Every
// send is logged to D1 `email_sends`, keyed by (campaign, subscriber_id), so
// re-running the same command never emails anyone twice for that campaign. The
// campaign defaults to the file name; pass --campaign to override.
//
// Resend's free plan allows 100 emails a day. The script counts today's sends
// (UTC) from the log, stops before the cap, and the same command tomorrow sends
// the rest.
//
// Flags:
//   --dry-run          print counts and a preview, send nothing
//   --test             send one copy to giles@gileslamb.com only (unsubscribe
//                      link is a preview that changes nothing)
//   --campaign <id>    log key; default: file name without extension
//   --daily-limit <n>  default 100
//   --yes              skip the "type send" confirmation
//
// Secrets (never in the repo): RESEND_API_KEY and UNSUBSCRIBE_SECRET from the
// environment, else ~/.config/resend/api_key and ~/.config/resend/unsubscribe_secret.
// UNSUBSCRIBE_SECRET must match the giles-engine worker secret of the same name.
// D1 is reached through wrangler, using your logged-in Cloudflare session.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { homedir, tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { createHmac, createHash } from "node:crypto";
import { createInterface } from "node:readline/promises";
import matter from "gray-matter";
import { marked } from "marked";

const FROM = "Giles Lamb <giles@gileslamb.com>";
const REPLY_TO = "giles@gileslamb.com";
const TEST_TO = "giles@gileslamb.com";
const SITE = "https://www.gileslamb.com";
const WORKER = "https://giles-engine.gileslamb.workers.dev";
const D1_NAME = "giles-engine";
const WRANGLER = "wrangler@4.86.0";
const BATCH_MAX = 100;

// ---------- args ----------

function parseArgs(argv) {
  const out = { dailyLimit: 100 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined) die(`${a} needs a value`);
      return v;
    };
    if (a === "--file") out.file = next();
    else if (a === "--subject") out.subject = next();
    else if (a === "--campaign") out.campaign = next();
    else if (a === "--daily-limit") out.dailyLimit = parseInt(next(), 10);
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--test") out.test = true;
    else if (a === "--yes") out.yes = true;
    else die(`Unknown argument: ${a}`);
  }
  if (!out.file) die('Missing --file. Usage: npm run send-email -- --file <markdown> --subject "<subject>" [--dry-run|--test]');
  if (!out.subject) die("Missing --subject");
  if (out.dryRun && out.test) die("Use --dry-run or --test, not both");
  if (!Number.isInteger(out.dailyLimit) || out.dailyLimit < 1) die("--daily-limit must be a positive integer");
  out.campaign ??= basename(out.file, extname(out.file));
  if (!/^[A-Za-z0-9._:-]{1,120}$/.test(out.campaign)) die("--campaign may only use letters, digits, . _ : -");
  return out;
}

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

function secret(envName, file) {
  if (process.env[envName]) return process.env[envName].trim();
  const p = join(homedir(), ".config", "resend", file);
  if (existsSync(p)) return readFileSync(p, "utf8").trim();
  die(`${envName} not set and ${p} not found`);
}

// ---------- D1 via wrangler ----------

const sq = (v) => (v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);

function d1(sql) {
  const r = spawnSync(
    "npx",
    ["--yes", WRANGLER, "d1", "execute", D1_NAME, "--remote", "--json", "--command", sql],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  if (r.status !== 0) throw new Error(`wrangler d1 failed:\n${r.stderr || r.stdout}`);
  const start = r.stdout.indexOf("[");
  const parsed = JSON.parse(r.stdout.slice(start));
  return parsed.flatMap((x) => x.results ?? []);
}

// ---------- rendering ----------

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function absolutise(url) {
  if (/^(https?:|mailto:|#)/i.test(url)) return url;
  return SITE + (url.startsWith("/") ? url : `/${url}`);
}

function loadMarkdown(file) {
  const { data, content } = matter(readFileSync(file, "utf8"));
  // MDX essays: drop import/export lines; flag JSX components, which email can't render.
  // The essay components become plain markdown: <WideImage> → image, <ClosingLine> → its text.
  const body = content
    .split("\n").filter((l) => !/^(import|export)\s/.test(l)).join("\n")
    .replace(/<WideImage\b([^>]*?)\/>/g, (_, attrs) => {
      const src = attrs.match(/src="([^"]*)"/)?.[1] ?? "";
      const alt = attrs.match(/alt="([^"]*)"/)?.[1] ?? "";
      return `\n![${alt}](${src})\n`;
    })
    .replace(/<\/?ClosingLine>/g, "")
    .trim();
  const jsx = body.match(/<[A-Z][A-Za-z]*/g);
  if (jsx) console.warn(`⚠ JSX components in the file won't render in email: ${[...new Set(jsx)].join(", ")}`);
  return { title: data.title ?? null, body };
}

function renderHtml(md, title, unsubUrl) {
  const renderer = new marked.Renderer();
  const link = renderer.link.bind(renderer);
  renderer.link = (tok) => link({ ...tok, href: absolutise(tok.href) });
  renderer.image = ({ href, text }) =>
    `<img src="${esc(absolutise(href))}" alt="${esc(text ?? "")}" width="560" style="display:block;width:100%;max-width:560px;height:auto;border:0;margin:24px 0;">`;
  const content = marked.parse(md, { renderer, gfm: true });

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(title ?? "")}</title>
<style>
  body { margin:0; padding:0; }
  .wrap { max-width:560px; margin:0 auto; padding:32px 20px 48px; font-family:Georgia,'Times New Roman',serif; font-size:17px; line-height:1.6; }
  .from { font-family:-apple-system,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:.04em; opacity:.7; margin:0 0 28px; }
  h1 { font-size:24px; font-weight:normal; line-height:1.3; margin:0 0 24px; }
  h2, h3, h4 { font-size:18px; font-weight:bold; margin:32px 0 8px; }
  p { margin:0 0 18px; }
  a { color:#8a6f42; }
  blockquote { margin:0 0 18px; padding-left:16px; border-left:2px solid #c9a96e; font-style:italic; }
  hr { border:0; border-top:1px solid #ccc; margin:32px 0; }
  .foot { font-family:-apple-system,Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; opacity:.7; margin-top:40px; padding-top:16px; border-top:1px solid #ccc; }
  .foot a { color:inherit; }
  @media (prefers-color-scheme: dark) {
    a { color:#c9a96e; }
    hr, .foot { border-color:#444; }
  }
</style>
</head>
<body>
<div class="wrap">
<p class="from">Giles Lamb</p>
${title ? `<h1>${esc(title)}</h1>\n` : ""}${content}
<div class="foot">
You're getting this because you signed up at <a href="${SITE}">gileslamb.com</a>. Just hit reply to write back.<br>
<a href="${esc(unsubUrl)}">Unsubscribe</a>
</div>
</div>
</body></html>`;
}

function renderText(md, title, unsubUrl) {
  const text = md
    .replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, (_, alt) => (alt ? `[${alt}]` : ""))
    .replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_, t, u) => `${t} (${absolutise(u)})`)
    .replace(/^#{1,6}\s+(.*)$/gm, (_, h) => h.toUpperCase())
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^*\w])[*_]([^*_\n]+)[*_](?=[^*\w]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `Giles Lamb\n\n${title ? `${title}\n\n` : ""}${text}\n\n--\nYou're getting this because you signed up at gileslamb.com. Just hit reply to write back.\nUnsubscribe: ${unsubUrl}\n`;
}

// ---------- per-recipient ----------

function unsubUrl(unsubSecret, sub) {
  if (!sub) return `${WORKER}/unsubscribe?preview=1`;
  const t = createHmac("sha256", unsubSecret).update(sub.email.trim().toLowerCase()).digest("base64url");
  return `${WORKER}/unsubscribe?id=${sub.id}&t=${t}`;
}

function buildEmail(ctx, sub, to) {
  const url = unsubUrl(ctx.unsubSecret, sub);
  return {
    from: FROM,
    to: [to],
    reply_to: REPLY_TO,
    subject: ctx.subject,
    html: renderHtml(ctx.md.body, ctx.md.title, url),
    text: renderText(ctx.md.body, ctx.md.title, url),
    headers: {
      "List-Unsubscribe": `<${url}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

async function resend(apiKey, path, payload, idempotencyKey) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

function logSends(rows) {
  const values = rows
    .map((r) => `(${sq(r.campaign)}, ${r.subscriber_id ?? "NULL"}, ${sq(r.email)}, ${sq(r.resend_id)})`)
    .join(",\n");
  d1(`INSERT OR IGNORE INTO email_sends (campaign, subscriber_id, email, resend_id) VALUES ${values}`);
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const md = loadMarkdown(args.file);
  const ctx = {
    md,
    subject: args.test ? `[TEST] ${args.subject}` : args.subject,
    unsubSecret: secret("UNSUBSCRIBE_SECRET", "unsubscribe_secret"),
  };

  const [{ n: sentToday }] = d1(
    "SELECT count(*) AS n FROM email_sends WHERE sent_at >= datetime('now', 'start of day')"
  );
  const quota = Math.max(0, args.dailyLimit - sentToday);

  if (args.test) {
    if (quota < 1) die(`Daily limit reached (${sentToday}/${args.dailyLimit} sent today, UTC). Try tomorrow.`);
    const apiKey = secret("RESEND_API_KEY", "api_key");
    const r = await resend(apiKey, "/emails", buildEmail(ctx, null, TEST_TO));
    if (!r.ok) die(`Resend ${r.status}: ${JSON.stringify(r.body)}`);
    logSends([{ campaign: `test:${args.campaign}`, subscriber_id: null, email: TEST_TO, resend_id: r.body.id }]);
    console.log(`✓ Test sent to ${TEST_TO} (Resend id ${r.body.id}). ${sentToday + 1}/${args.dailyLimit} today.`);
    return;
  }

  const [{ n: active }] = d1("SELECT count(*) AS n FROM subscribers WHERE status = 'active'");
  const pending = d1(
    `SELECT id, email FROM subscribers
     WHERE status = 'active'
       AND id NOT IN (SELECT subscriber_id FROM email_sends WHERE campaign = ${sq(args.campaign)} AND subscriber_id IS NOT NULL)
     ORDER BY id`
  );
  const now = pending.slice(0, quota);

  console.log(`
Campaign:      ${args.campaign}
Subject:       ${ctx.subject}
From:          ${FROM}   Reply-To: ${REPLY_TO}
Active:        ${active}
Already sent:  ${active - pending.length} (this campaign)
Still to send: ${pending.length}
Sent today:    ${sentToday}/${args.dailyLimit} (UTC day)
This run:      ${now.length}${pending.length > now.length ? `  (${pending.length - now.length} left for tomorrow: run the same command again)` : ""}`);

  if (args.dryRun) {
    const sample = buildEmail(ctx, pending[0] ?? null, pending[0]?.email ?? TEST_TO);
    const previewPath = join(tmpdir(), `send-email-preview-${args.campaign}.html`);
    writeFileSync(previewPath, sample.html);
    console.log(`\n--- plain-text preview (first 40 lines) ---\n${sample.text.split("\n").slice(0, 40).join("\n")}\n---`);
    console.log(`HTML preview: ${previewPath}\nDry run: nothing sent.`);
    return;
  }

  if (now.length === 0) {
    console.log(pending.length ? "\nDaily limit reached. Run the same command tomorrow." : "\nEveryone on the list has this campaign. Nothing to do.");
    return;
  }

  if (!args.yes) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question(`\nType "send" to email ${now.length} people now: `);
    rl.close();
    if (answer.trim() !== "send") die("Not sent.");
  }

  const apiKey = secret("RESEND_API_KEY", "api_key");
  let sent = 0;
  for (let i = 0; i < now.length; i += BATCH_MAX) {
    const chunk = now.slice(i, i + BATCH_MAX);
    // Same chunk → same key, so a retry within 24h after a crash is a no-op at Resend.
    const key = `${args.campaign}/${createHash("sha256").update(chunk.map((s) => s.id).join(",")).digest("hex").slice(0, 32)}`;
    const r = await resend(apiKey, "/emails/batch", chunk.map((s) => buildEmail(ctx, s, s.email)), key);
    if (!r.ok) {
      console.error(`\n✗ Resend ${r.status}: ${JSON.stringify(r.body)}`);
      console.error(`Sent ${sent} this run before stopping. Re-run the same command to continue${r.status === 429 ? " (tomorrow, if it's the daily quota)" : ""}.`);
      process.exit(1);
    }
    const ids = r.body.data ?? [];
    try {
      logSends(chunk.map((s, j) => ({ campaign: args.campaign, subscriber_id: s.id, email: s.email, resend_id: ids[j]?.id ?? null })));
    } catch (e) {
      console.error(`\n✗ Sent ${chunk.length} but FAILED to log them. Do not re-run until logged.\nSubscriber ids: ${chunk.map((s) => s.id).join(",")}\n${e.message}`);
      process.exit(1);
    }
    sent += chunk.length;
    console.log(`✓ ${sent}/${now.length} sent`);
  }
  const left = pending.length - sent;
  console.log(`\nDone. ${sent} sent this run.${left ? ` ${left} still to send: run the same command tomorrow.` : " Everyone has it."}`);
}

main().catch((e) => die(e.stack || e.message));
