import type { Metadata } from 'next';
import CardClient from './[event]/CardClient';
import { CARD_EVENTS } from './[event]/page';

export const metadata: Metadata = {
  title: 'Giles Lamb — Composer',
  robots: { index: false, follow: false },
};

export default function CardDirectPage() {
  const cfg = CARD_EVENTS['direct'];
  return (
    <CardClient
      event="direct"
      eventName={cfg.name}
      accent={cfg.accent}
      stingUrl={cfg.stingUrl}
      captureEndpoint={process.env.NEXT_PUBLIC_CAPTURE_ENDPOINT ?? 'https://giles-engine.gileslamb.workers.dev/capture'}
      turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ''}
    />
  );
}
