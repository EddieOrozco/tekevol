// Pricing tiers.
//
// NOTE: the home page and services page currently show DIFFERENT prices and
// features (e.g. Activate is $200/mo on home, $97/mo on services). Both are
// kept exactly as they were on the HTML site. Once you settle on one set,
// delete the other and point both pages at it — that's the whole point of
// keeping pricing in one file.

export interface Tier {
  id: 'activate' | 'evolve' | 'ascend'; // matches HubSpot service_interest values
  anchor?: string; // id on the card, for links like /services#evolve-make-the-phone-ring
  name: string;
  tagline: string;
  monthly: string;
  setup: string;
  features: string[];
  bestFor: string;
  featured?: boolean;
}

export const homeTiers: Tier[] = [
  {
    id: 'activate',
    name: 'Activate & Open Your Doors',
    tagline: 'A professional site, built for your business live and protected.',
    monthly: '$200',
    setup: '$500',
    features: [
      '5 mobile-friendly pages',
      'Managed hosting, SSL, backups, and security maintenance.',
      'Basic website SEO setup',
      'Click-to-call buttons',
      'Domain setup assistance',
      "Fast load times, so people don't leave before they see your number",
      'One service page highlighting your most requested service in your local area',
    ],
    bestFor: 'Best for: Getting Online Professionally',
  },
  {
    id: 'evolve',
    name: 'Evolve & Make the Phone Ring',
    tagline: 'Visibility that brings in calls from local customers.',
    monthly: '$500',
    setup: '$1,000',
    features: [
      'Everything in Tier 1',
      'Local money pages: up to four pages across two cities',
      'A simple contact form that sends leads straight to you',
      'Google Business Profile management for one location',
      'Four Google posts monthly',
      'Up to 10 Google review responses monthly',
      'Monthly activity and inquiry report',
      'Initial citation cleanup for up to five listings',
    ],
    bestFor: 'Best for: Businesses Ready to Generate Leads',
    featured: true,
  },
  {
    id: 'ascend',
    name: 'Ascend & Stand Out',
    tagline: 'A dedicated growth partner for multi-location businesses.',
    monthly: '$1,250',
    setup: '$2,000',
    features: [
      'Everything in Tier 2',
      'Two new or improved pages monthly',
      'Customer search research and service FAQs',
      'SEO for traditional, local, and AI search',
      'Internal linking and structured data',
      'Routine technical SEO improvements',
      'One 30-minute strategy call monthly',
      'Priority support',
    ],
    bestFor: 'Best for: Multi-Location Operations',
  },
];

export const servicesTiers: Tier[] = [
  {
    id: 'activate',
    anchor: 'activate-open-your-doors',
    name: 'Activate & Open Your Doors',
    tagline: 'A professional site, built for your business live and protected.',
    monthly: '$97',
    setup: '$500',
    features: [
      'up to a 6 page custom website',
      'Hosting & SSL included',
      'Daily backups',
      'Security & updates',
      'Perform website updates',
    ],
    bestFor: 'Best for: getting online professionally',
  },
  {
    id: 'evolve',
    anchor: 'evolve-make-the-phone-ring',
    name: 'Evolve & Make the Phone Ring',
    tagline: 'Everything in Tier 1, plus visibility that brings in calls.',
    monthly: '$500',
    setup: '$1,000',
    features: [
      'Google Business Profile management',
      'Weekly content posts',
      'Review monitoring & response',
      'Monthly local SEO report',
      'Citation cleanup',
    ],
    bestFor: 'Best for: businesses ready to generate leads',
    featured: true,
  },
  {
    id: 'ascend',
    anchor: 'ascend-stand-out',
    name: 'Ascend & Stand Out',
    tagline: 'A dedicated growth partner for multi-location businesses.',
    monthly: '$1,500',
    setup: '$2,000',
    features: [
      'Multi-location management',
      'Monthly SEO content',
      'Competitor tracking',
      'Regular strategy calls',
      'Priority support',
    ],
    bestFor: 'Best for: multi-location operations',
  },
];
