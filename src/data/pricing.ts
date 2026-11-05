// Pricing tiers — the single source for the home page, the services page,
// and the services page's structured data. Change a price here and every
// place that shows it updates.

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

export const tiers: Tier[] = [
  {
    id: 'activate',
    anchor: 'activate-open-your-doors',
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
    anchor: 'evolve-make-the-phone-ring',
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
    anchor: 'ascend-stand-out',
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

