import { NextResponse } from 'next/server';
import { postCapture } from '@/lib/capture';

export const runtime = 'nodejs';

export const LIST_CONSENT_TEXT =
  'Occasional emails from Giles Lamb about live dates and new releases. Unsubscribe any time.';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Kit form subscription. Returns false on any failure — never throws. */
async function subscribeToKit(email: string): Promise<boolean> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error('[list] KIT_API_KEY or KIT_FORM_ID not set — skipping Kit');
    return false;
  }

  try {
    const res = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey,
      },
      body: JSON.stringify({ email_address: email }),
    });
    if (!res.ok) {
      console.error('[list] Kit rejected subscribe:', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[list] Kit request failed:', err);
    return false;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim() ?? '';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email, please.' }, { status: 400 });
  }

  // D1 first, so a Kit outage can never cost us the address.
  try {
    await postCapture({
      email,
      source: 'list',
      source_detail: 'list',
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
  const kit = await subscribeToKit(email);

  return NextResponse.json({ ok: true, kit });
}
