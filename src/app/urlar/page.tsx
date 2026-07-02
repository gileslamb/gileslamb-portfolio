import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import UrlarClient from './UrlarClient';

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
  title: 'Ùrlar — Giles Lamb',
  description:
    'Ùrlar — ground; floor. The bed beneath the deep, the theme beneath the variations. A meditative live performance by Giles Lamb.',
  robots: { index: false, follow: false },
};

export default function UrlarPage() {
  return (
    <div className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <UrlarClient />
    </div>
  );
}
