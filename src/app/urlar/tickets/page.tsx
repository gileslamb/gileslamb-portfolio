import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import TicketsClient from './TicketsClient';

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
  title: 'Ùrlar — Tickets & updates — Giles Lamb',
  description:
    'Be first to know when tickets open for Ùrlar — a live performance by Giles Lamb.',
  robots: { index: false, follow: false },
};

export default function UrlarTicketsPage() {
  return (
    <div className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <TicketsClient />
    </div>
  );
}
