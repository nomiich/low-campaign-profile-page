import { notFound } from 'next/navigation';
import AboutCard from '@/components/campaign/AboutCard';
import DonateBar from '@/components/campaign/DonateBar';
import GlowGoalCard from '@/components/campaign/GlowGoalCard';
import JourneyTimeline from '@/components/campaign/JourneyTimeline';
import ProfileCard from '@/components/campaign/ProfileCard';
import SiteHeader from '@/components/campaign/SiteHeader';
import SupportersCard from '@/components/campaign/SupportersCard';
import TrustBar from '@/components/campaign/TrustBar';
import { getCampaign, getCampaignSlugs, SITE } from '@/lib/campaign';
import styles from './page.module.css';

export async function generateStaticParams() {
  const slugs = await getCampaignSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const campaign = await getCampaign(params.slug);
  if (!campaign) return {};
  return {
    title: `${campaign.name}, ${campaign.age} — Glow`,
    description: campaign.quote,
  };
}

export default async function CampaignPage({ params }) {
  const campaign = await getCampaign(params.slug);
  if (!campaign) notFound();

  const { content } = campaign;

  return (
    <>
      <SiteHeader site={SITE} />

      <main className={styles.main}>
        <div className={styles.hero}>
          <ProfileCard campaign={campaign} />
          <GlowGoalCard campaign={campaign} />
        </div>

        <TrustBar items={content.trust} />

        <div className={styles.columns}>
          <AboutCard
            heading={content.aboutHeading}
            paragraphs={campaign.about}
            followLabel={content.followLabel}
          />
          <JourneyTimeline heading={content.journeyHeading} steps={campaign.journey} />
          <SupportersCard
            heading={content.supportersHeading}
            supporters={campaign.recentSupporters}
            seeAllLabel={content.seeAllLabel}
          />
        </div>

        <DonateBar donate={content.donate} amounts={campaign.giftAmounts} />
      </main>
    </>
  );
}
