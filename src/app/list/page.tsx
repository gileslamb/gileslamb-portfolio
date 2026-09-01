import type { Metadata } from 'next';
import ListClient from './ListClient';

export const metadata: Metadata = {
  title: 'Mailing list · Giles Lamb',
  description:
    'Occasional emails about live dates and new releases from composer Giles Lamb.',
};

export default function ListPage() {
  return <ListClient />;
}
