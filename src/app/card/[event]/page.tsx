import type { Metadata } from 'next';
import CardClient from './CardClient';

export const CARD_EVENTS: Record<string, { name: string; accent: string; stingUrl: string | null }> = {
  'annecy-2026': { name: 'Annecy 2026', accent: '#c9a96e', stingUrl: '/audio/resonant-being-part-2.mp3' },
  'direct':      { name: '',            accent: '#c9a96e', stingUrl: null },
};

const KNOWN_SLUGS = new Set(Object.keys(CARD_EVENTS));

type Props = { params: Promise<{ event: string }> };

export const metadata: Metadata = {
  title: 'Giles Lamb — Composer',
  robots: { index: false, follow: false },
};

export default async function CardPage({ params }: Props) {
  const { event } = await params;
  const known = KNOWN_SLUGS.has(event);
  const cfg = known ? CARD_EVENTS[event] : { name: '', accent: '#c9a96e', stingUrl: null };
  const resolvedSlug = known ? event : 'unknown';

  return (
    <CardClient
      event={resolvedSlug}
      eventName={cfg.name}
      accent={cfg.accent}
      stingUrl={cfg.stingUrl}
      captureEndpoint={process.env.NEXT_PUBLIC_CAPTURE_ENDPOINT ?? ''}
      turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ''}
    />
  );
}
