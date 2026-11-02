// Trades shown on the home page grid. `slug` is the anchor on /industries.
// `icon` is the inner SVG markup for a 24x24 viewBox.
//
// Only some of these have a matching card on the industries page
// (plumbing, electrical, hvac, landscaping, roofing, painting, pest-control,
// handyman). The others link to /industries#<slug> but land at the top of
// the page until a card with that id exists.

export interface HomeIndustry {
  slug: string;
  name: string;
  icon: string;
}

export const homeIndustries: HomeIndustry[] = [
  { slug: 'plumbing', name: 'Plumbing', icon: '<path d="M3 5h6M6 5v3"/><path d="M3 8h10a4 4 0 0 1 4 4v2h-4v-2H3z"/><path d="M15 17.5c0 .9.5 1.5 1 1.5s1-.6 1-1.5c0-.8-1-2-1-2s-1 1.2-1 2z"/>' },
  { slug: 'electrical', name: 'Electrical', icon: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>' },
  { slug: 'hvac', name: 'HVAC', icon: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 10.5c-.5-2 0-4.5 2-5 1.5-.3 2 1.5 1 2.5s-2 1.5-3 2.5z"/><path d="M13.3 12.8c1.5 1.4 2.4 3.8 1 5.3-1 1-2.6 0-2.3-1.4.3-1.4 1-2.4 1.3-3.9z"/><path d="M10.7 12.8c-2 .6-4.5.2-5.1-1.8-.4-1.4 1.4-2.1 2.4-1.1s1.3 2.3 2.7 2.9z"/>' },
  { slug: 'landscaping', name: 'Landscaping', icon: '<path d="M12 3 6 11h3l-4 6h14l-4-6h3z"/><path d="M12 17v4M8 21h8"/>' },
  { slug: 'roofing', name: 'Roofing', icon: '<path d="M2 12 12 3l10 9"/><path d="M5 10v10h14V10"/><path d="M16 6V3h3v6"/><path d="M10 20v-5h4v5"/>' },
  { slug: 'painting', name: 'Painting', icon: '<rect x="3" y="3" width="15" height="6" rx="1.5"/><path d="M18 6h2.5v5H12v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>' },
  { slug: 'general-contracting', name: 'General Contracting', icon: '<path d="M2 18h20"/><path d="M4 18v-2a8 8 0 0 1 16 0v2"/><path d="M10 9V5.5h4V9"/>' },
  { slug: 'handyman', name: 'Handyman', icon: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V5h6v3"/><path d="M3 13h18"/><path d="M10 12v3h4v-3"/>' },
  { slug: 'cleaning', name: 'Cleaning', icon: '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/><path d="M18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>' },
  { slug: 'pest-control', name: 'Pest Control', icon: '<rect x="8" y="8" width="8" height="12" rx="4"/><path d="M10 8a2 2 0 0 1 4 0"/><path d="M10 5 8.5 3M14 5l1.5-2"/><path d="M8 12H4M8 16l-3.5 2M16 12h4M16 16l3.5 2M12 11v9"/>' },
  { slug: 'concrete-masonry', name: 'Concrete & Masonry', icon: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20"/>' },
  { slug: 'pool-service', name: 'Pool Service', icon: '<path d="M8 14V6a2 2 0 0 1 4 0"/><path d="M14 14V6a2 2 0 0 1 4 0"/><path d="M8 9h6M8 12h6"/><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>' },
];

// Cards on the industries page.
export interface IndustryDetail {
  slug: string;
  name: string;
  icon: string;
  intro: string;
  points: string[];
  searches: string;
}

export const industryDetails: IndustryDetail[] = [
  {
    slug: 'plumbing',
    name: 'Plumbing',
    icon: '<path d="M12 2.7C9 7 6 10.2 6 14a6 6 0 0012 0c0-3.8-3-7-6-11.3z"/>',
    intro: 'When a pipe bursts, people search, pick the first shop that looks trustworthy, and call. Your site has to win that decision in seconds.',
    points: ['Tap-to-call button on every screen', 'Emergency & 24/7 service pages', 'Service-area pages for every town you cover'],
    searches: '“emergency plumber near me,” “water heater repair,” “drain cleaning”',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    icon: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    intro: "Homeowners want proof you're licensed and safe before they let you touch their panel. We put that proof front and center.",
    points: ['License, insurance & certifications displayed clearly', 'Separate pages for residential and commercial work', 'Quote request forms that pre-qualify the job'],
    searches: '“electrician near me,” “panel upgrade,” “EV charger installation”',
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    icon: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1L19.1 4.9"/>',
    intro: 'Demand swings with the weather. Your site should be ready for the first heat wave and the first cold snap — without a scramble.',
    points: ['Seasonal promos you can switch on fast', 'Maintenance plan & financing pages', 'Repair vs. replace content that builds trust'],
    searches: '“AC repair near me,” “furnace not working,” “HVAC tune-up”',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    icon: '<path d="M11 20A7 7 0 014 13c0-5 4-9 16-10-1 12-5 16-10 16"/><path d="M4 21c3-6 7-9 11-11"/>',
    intro: 'Your work sells itself — if people can see it. We build sites around your photos so the results do the talking.',
    points: ['Before-and-after project galleries', 'Recurring maintenance & seasonal service pages', 'Estimate forms with photo upload'],
    searches: '“lawn care near me,” “landscape design,” “sod installation”',
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    icon: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    intro: 'Roofing is a big-ticket decision. Homeowners compare several companies, so your site needs to look like the obvious safe bet.',
    points: ['Storm damage & insurance claim pages', 'Warranty and materials information', 'Review highlights pulled into key pages'],
    searches: '“roof repair near me,” “roof replacement cost,” “hail damage roof”',
  },
  {
    slug: 'painting',
    name: 'Painting',
    icon: '<rect x="3" y="3" width="16" height="6" rx="1"/><path d="M19 6h2v5h-9v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
    intro: 'Customers are picky about finish quality. A clean, well-photographed portfolio is what separates you from the low bidder.',
    points: ['Interior, exterior & cabinet service pages', 'Project galleries organized by job type', 'Clear process page — prep, paint, cleanup'],
    searches: '“house painters near me,” “cabinet painting,” “exterior painting”',
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    icon: '<path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/>',
    intro: "People want the problem gone today, and they want to know it's safe for their kids and pets. We answer both questions up front.",
    points: ['Pages for each pest you treat', 'Family- and pet-safety information', 'Recurring service plan sign-ups'],
    searches: '“exterminator near me,” “termite inspection,” “get rid of ants”',
  },
  {
    slug: 'handyman',
    name: 'Handyman & Remodeling',
    icon: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z"/>',
    intro: 'You do a lot of different jobs. Your site should make it easy for customers to see you handle theirs — without a wall of text.',
    points: ["Organized service menu that's easy to scan", 'Project showcases for bigger remodels', 'Simple “describe your job” request form'],
    searches: '“handyman near me,” “bathroom remodel,” “deck repair”',
  },
];

// HubSpot trade_industry dropdown. Values are case-sensitive and must match
// the option values in HubSpot exactly. Add Roofing etc. in HubSpot first.
export const tradeOptions = ['Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Restaurant', 'Dentist', 'Other'];
