/**
 * Campaign data layer.
 *
 * `getCampaign(slug)` is the ONLY thing the page calls. Today it resolves a
 * mock row; swap the marked block for a Supabase query and nothing else in the
 * app has to change — the shape below mirrors a `campaigns` row one-to-one
 * (snake_case columns are mapped in `fromRow`).
 */

/* ------------------------------------------------------------------ *
 * Site chrome (header nav + brand). Not campaign data, so it lives on
 * its own — but it is still data, never copy baked into JSX.
 * ------------------------------------------------------------------ */
export const SITE = {
  brand: { word: 'Glow', tagline: 'Gift a little glow', href: '/' },
  nav: [
    { label: 'Explore Procedures', href: '#', hasMenu: true },
    { label: 'How It Works', href: '#' },
    { label: 'About Glow', href: '#' },
    { label: 'Glow Stories', href: '#' },
    { label: 'For Clinics', href: '#', badge: 'New' },
  ],
  actions: {
    searchLabel: 'Search',
    login: { label: 'Log in', href: '#' },
    signup: { label: 'Get Started', href: '#' },
  },
};

/* ------------------------------------------------------------------ *
 * Mock rows — shaped exactly like the Supabase table.
 * ------------------------------------------------------------------ */
const MOCK_ROWS = [
  {
    slug: 'sarah',
    name: 'Sarah',
    age: 32,
    verified: true,
    location: 'Sydney, Australia',
    pronoun_subject: 'she',
    pronoun_possessive: 'her',
    photo_url: '/sarah.jpg',
    photo_alt: 'Sarah, smiling in warm golden evening light',
    quote:
      "I've wanted to feel confident in my skin for so long. This is my step towards a new chapter.",
    procedure: 'Upper Blepharoplasty',
    clinic: 'Bangkok Clinic',
    procedure_date: 'To be confirmed',
    currency: 'A$',
    locale: 'en-AU',
    raised: 8150,
    goal: 12000,
    supporters: 156,
    days_left: 24,
    about: [
      "I'm a mum of two beautiful girls and a full-time teacher. After years of putting everyone else first, I'm ready to do something for me.",
      "This procedure isn't just about how I look – it's about how I feel when I look in the mirror.",
      'Thank you to everyone who supports me on this journey.',
    ],
    journey: [
      {
        icon: 'check',
        title: 'Quote Verified',
        body: 'Quote for Upper Blepharoplasty verified by Glow.',
        meta: 'A$12,000',
        state: 'done',
      },
      {
        icon: 'heart',
        title: 'Fundraising',
        body: "Sarah's Glow Goal is being funded by kind supporters like you.",
        meta: 'A$8,150',
        state: 'active',
      },
      {
        icon: 'calendar',
        title: 'Procedure',
        body: "The date will be set once Sarah's Glow Goal is reached.",
        bodyLink: 'Glow Goal is reached.',
        meta: 'To be confirmed',
        state: 'upcoming',
      },
      {
        icon: 'sparkle',
        title: 'Glow Story',
        body: 'Sarah will share her story and results to inspire others.',
        meta: 'Coming soon',
        state: 'upcoming',
      },
    ],
    recent_supporters: [
      { name: 'Amy', amount: 'A$50', when: '2 hours ago' },
      { name: 'Jess', amount: 'A$25', when: '5 hours ago' },
      { name: 'Megan', amount: 'A$100', when: '1 day ago' },
      { name: 'Sophia', amount: 'A$30', when: '1 day ago' },
    ],
    gift_amounts: [
      { label: 'A$25', value: 25 },
      { label: 'A$50', value: 50, selected: true },
      { label: 'A$100', value: 100 },
      { label: 'Other', value: null },
    ],
  },
];

/* Copy that is templated off the row rather than stored per campaign. */
function buildContent(row) {
  const her = row.pronoun_possessive;
  const she = row.pronoun_subject;
  return {
    goalEyebrow: 'Glow Goal',
    goalInfoLabel: 'How Glow Goals work',
    supportersLine: `Raised by ${row.supporters} kind hearts`,
    daysLine: `${row.days_left} days to go`,
    trust: [
      {
        icon: 'sparkles',
        heading: 'Verified Fundraiser',
        body: `${row.name}'s procedure, quote and clinic have been verified by Glow.`,
        link: { label: 'Learn more', href: '#', arrow: true },
      },
      {
        icon: 'lock',
        heading: `Privacy on ${her} terms`,
        body: `${row.name} has chosen to share ${her} story and progress publicly.`,
        link: { label: `Learn about privacy on Glow.`, href: '#' },
      },
    ],
    aboutHeading: `About ${row.name}`,
    followLabel: `Follow ${row.name}`,
    journeyHeading: `${row.name}'s Journey`,
    supportersHeading: 'Recent Supporters',
    seeAllLabel: 'See all supporters',
    donate: {
      script: 'Gift a little glow',
      sub: 'Every gift brings her closer',
      copy: `Your support can help ${row.name} take ${her} next step towards confidence and a future ${she} deserves.`,
      cta: 'Gift a Little Glow',
      secure: '100% secure. You can choose to remain anonymous.',
    },
  };
}

function fromRow(row) {
  const raised = Number(row.raised) || 0;
  const goal = Number(row.goal) || 0;
  return {
    slug: row.slug,
    name: row.name,
    age: row.age,
    verified: row.verified,
    location: row.location,
    photo: { src: row.photo_url, alt: row.photo_alt },
    quote: row.quote,
    meta: [
      { icon: 'procedure', label: 'Procedure', value: row.procedure },
      { icon: 'clinic', label: 'Clinic', value: row.clinic },
      { icon: 'calendar', label: 'Date', value: row.procedure_date },
    ],
    currency: row.currency,
    locale: row.locale,
    raised,
    goal,
    /* Derived, never stored. */
    percent: goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0,
    raisedLabel: formatMoney(raised, row),
    goalLabel: formatMoney(goal, row),
    supporters: row.supporters,
    daysLeft: row.days_left,
    about: row.about,
    journey: row.journey,
    recentSupporters: row.recent_supporters,
    giftAmounts: row.gift_amounts,
    content: buildContent(row),
  };
}

export function formatMoney(amount, row) {
  return `${row.currency}${amount.toLocaleString(row.locale)}`;
}

/**
 * Fetch one campaign by slug.
 *
 * ─── SUPABASE ────────────────────────────────────────────────────────
 * Replace the mock lookup below with:
 *
 *   import { createClient } from '@/lib/supabase/server';
 *   const supabase = createClient();
 *   const { data, error } = await supabase
 *     .from('campaigns')
 *     .select('*')
 *     .eq('slug', slug)
 *     .single();
 *   if (error || !data) return null;
 *   return fromRow(data);
 *
 * `fromRow` already maps every snake_case column, so no other file changes.
 * ─────────────────────────────────────────────────────────────────────
 */
export async function getCampaign(slug) {
  const row = MOCK_ROWS.find((r) => r.slug === slug);
  return row ? fromRow(row) : null;
}

export async function getCampaignSlugs() {
  return MOCK_ROWS.map((r) => r.slug);
}
