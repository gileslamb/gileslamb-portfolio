import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import ResonantBeingClient from './ResonantBeingClient';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sg',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Resonant Being · Giles Lamb',
  description: 'A live transmedia performance. Piano, synthesis, projection and quadraphonic sound.',
  robots: { index: false, follow: false },
};

export default function ResonantBeingPage() {
  return (
    <div className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <ResonantBeingClient />
    </div>
  );
}
