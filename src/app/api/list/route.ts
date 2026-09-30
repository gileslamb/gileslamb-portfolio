import { NextResponse } from 'next/server';
import { postCapture } from '@/lib/capture';

export const runtime = 'nodejs';

export const LIST_CONSENT_TEXT =
  'Occasional emails from Giles Lamb about live dates and new releases. Unsubscribe any time.';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* Extra Kit tags a signup form may ask for, by name. Allowlisted so the
   endpoint can't be used to create arbitrary tags. The name is resolved to an
   ID at signup time: Kit's create-tag call is idempotent on name, returning the
   existing tag if there is one. */
const EXTRA_TAGS = new Set(['urlar-hot-2026']);

/**
 * Kit form subscription. Returns false on any failure — never throws.
 *
 * Two steps, and the order matters: Kit v4 404s on POST /forms/{id}/subscribers
 * unless the subscriber already exists, so create it first. Creating an address
 * that is already on the account is not an error, so a failure at step 1 is
 * logged and we still try to add it to the form.
 */
async function subscribeToKit(
  email: string,
  extraTag?: string,
): Promise<{ subscribed: boolean; tagged: boolean; extraTagged?: boolean }> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  const tagId = process.env.KIT_TAG_ID;

  if (!apiKey || !formId) {
    console.error('[list] KIT_API_KEY or KIT_FORM_ID not set — skipping Kit');
    return { subscribed: false, tagged: false };
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': apiKey,
  };
  const body = JSON.stringify({ email_address: email });

  try {
    const created = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers,
      body,
    });
    if (!created.ok) {
      console.warn('[list] Kit create subscriber:', created.status, await created.text().catch(() => ''));
    }

    const added = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: 'POST',
      headers,
      body,
    });
    if (!added.ok) {
      console.error('[list] Kit rejected form subscribe:', added.status, await added.text().catch(() => ''));
      return { subscribed: false, tagged: false };
    }

    // Tag is what the broadcast segments on, so a failure here is worth its own
    // log line — the address is still subscribed either way.
    let tagged = false;
    if (tagId) {
      const t = await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
        method: 'POST',
        headers,
        body,
      });
      tagged = t.ok;
      if (!t.ok) {
        console.error('[list] Kit rejected tag:', t.status, await t.text().catch(() => ''));
      }
    } else {
      console.error('[list] KIT_TAG_ID not set — subscriber added but not tagged');
    }

    if (!extraTag) return { subscribed: true, tagged };

    let extraTagged = false;
    const tagRes = await fetch('https://api.kit.com/v4/tags', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: extraTag }),
    });
    const tagJson = (await tagRes.json().catch(() => null)) as { tag?: { id?: number } } | null;
    const extraTagId = tagJson?.tag?.id;
    if (!tagRes.ok || !extraTagId) {
      console.error(`[list] Kit could not resolve tag ${extraTag}:`, tagRes.status);
    } else {
      const t = await fetch(`https://api.kit.com/v4/tags/${extraTagId}/subscribers`, {
        method: 'POST',
        headers,
        body,
      });
      extraTagged = t.ok;
      if (!t.ok) {
        console.error(`[list] Kit rejected tag ${extraTag}:`, t.status, await t.text().catch(() => ''));
      }
    }

    return { subscribed: true, tagged, extraTagged };
  } catch (err) {
    console.error('[list] Kit request failed:', err);
    return { subscribed: false, tagged: false };
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; tag?: string } | null;
  const email = body?.email?.trim() ?? '';
  const extraTag = body?.tag && EXTRA_TAGS.has(body.tag) ? body.tag : undefined;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email, please.' }, { status: 400 });
  }

  // D1 first, so a Kit outage can never cost us the address.
  try {
    await postCapture({
      email,
      source: 'list',
      source_detail: extraTag ?? 'list',
      consent_text: LIST_CONSENT_TEXT,
    });
  } catch (err) {
    console.error('[list] capture insert failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Try again in a moment.' },
      { status: 502 },
    );
  }

  // Kit is best-effort: the row is already saved, so a failure here is logged,
  // not surfaced. Recoverable by hand from the captures table.
  const kit = await subscribeToKit(email, extraTag);

  return NextResponse.json({ ok: true, kit });
}
