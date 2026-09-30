import type { Metadata } from 'next';
import ListClient from './ListClient';

export const metadata: Metadata = {
  title: 'Mailing list · Giles Lamb',
  description:
    'Occasional emails about live dates and new releases from composer Giles Lamb.',
};

/* ?src= tags where a signup came from (Joanna's link is /list?src=houseoftoad).
   Lowercase letters, digits and hyphens only; anything else falls back to
   "site". The giles-engine worker applies the same rule. */
const SOURCE_RE = /^[a-z0-9-]{1,40}$/;

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string | string[] }>;
}) {
  const { src } = await searchParams;
  const raw = (Array.isArray(src) ? src[0] : src ?? '').trim().toLowerCase();
  return <ListClient source={SOURCE_RE.test(raw) ? raw : 'site'} />;
}
