import type { Metadata } from 'next';
import { ResonantBeingsClient } from './ResonantBeingsClient';

export const metadata: Metadata = {
  title: 'Giles Lamb | Resonant Beings',
  description:
    'A meditative immersive performance — instruments, resonance and projected light.',
  robots: { index: false, follow: false },
};

export default function ResonantBeingsPage() {
  return <ResonantBeingsClient />;
}
