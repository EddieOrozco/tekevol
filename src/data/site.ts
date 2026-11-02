// Site-wide settings, nav and footer links. Edit here and every page updates.

export const site = {
  name: 'Tekevol',
  url: 'https://tekevol.com',
  email: 'support@tekevol.com',
  gtmId: 'GTM-KC5V235V',
  hubspotPortalId: '247609198',
  hubspotRegion: 'na2',
  // Free plan URL. If it changes after HubSpot Starter, update it here only.
  bookingUrl: 'https://meetings-na2.hubspot.com/eduardo-orozco',
};

export interface Link {
  label: string;
  href: string;
}

export const mainNav: Link[] = [
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

export const footerColumns: { heading: string; links: Link[] }[] = [
  {
    heading: 'Company',
    links: [{ label: 'Home', href: '/' }, ...mainNav],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Website & Hosting', href: '/services#pricing' },
      { label: 'Activate & Open Your Doors', href: '/services#pricing' },
      { label: 'Evolve & Make the Phone Ring', href: '/services#pricing' },
      { label: 'Ascend & Stand Out', href: '/services#pricing' },
      { label: 'Pricing', href: '/services#pricing' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Plumbing', href: '/industries#plumbing' },
      { label: 'Electrical', href: '/industries#electrical' },
      { label: 'Landscaping', href: '/industries#landscaping' },
      { label: 'HVAC', href: '/industries#hvac' },
      { label: 'See all', href: '/industries' },
    ],
  },
];

export const legalLinks: Link[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
