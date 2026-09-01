/**
 * giles-engine captures — shared endpoint + payload contract.
 *
 * The captures row is written by the giles-engine worker (`/capture`), which owns
 * the D1 insert. This is the same endpoint /card posts to; anything new that needs
 * a captures row should go through here rather than defining its own URL or shape.
 */

export const CAPTURE_ENDPOINT =
  process.env.NEXT_PUBLIC_CAPTURE_ENDPOINT ??
  'https://giles-engine.gileslamb.workers.dev/capture';

export interface CapturePayload {
  name?: string;
  email: string;
  source: string;
  source_detail?: string;
  consent_text: string;
  consent_at?: string;
  turnstileToken?: string;
}

/**
 * POST a captures row. Throws if the worker rejects it — callers decide whether
 * that is fatal.
 */
export async function postCapture(payload: CapturePayload): Promise<void> {
  const res = await fetch(CAPTURE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '',
      source_detail: payload.source,
      consent_at: new Date().toISOString(),
      ...payload,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !json.ok) {
    throw new Error(json.error ?? `capture failed (${res.status})`);
  }
}
