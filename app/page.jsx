import { redirect } from 'next/navigation';
import { getCampaignSlugs } from '@/lib/campaign';

export default async function Home() {
  const [first] = await getCampaignSlugs();
  redirect(`/campaign/${first}`);
}
