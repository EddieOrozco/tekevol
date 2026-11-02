// FAQ content. The why-us page builds its FAQPage structured data from the
// same list it shows on screen, so the two can't drift apart.

export interface Faq {
  q: string;
  a: string;
}

export const whyUsFaq: Faq[] = [
  {
    q: 'Do I own my website?',
    a: 'Yes. Your domain, your content, and your site files belong to you. If you ever leave, we hand everything over.',
  },
  {
    q: 'Is there a long-term contract?',
    a: "No. Plans are month-to-month. Cancel any time with 30 days' notice.",
  },
  {
    q: 'How long does it take to launch?',
    a: 'A typical 5–8 page small business website can be ready in about 2–4 weeks, depending on the project and how quickly we receive your content. Larger websites may take longer. We’ll talk through the timeline on our discovery call so you know what to expect.',
  },
  {
    q: 'Do I have to write the content myself?',
    a: 'No. We interview you for 30 minutes and write the pages for you. You just review and approve.',
  },
  {
    q: 'I already have a website. Can you help?',
    a: 'Yes. We start with a free audit of your current site and Google Business Profile, then recommend whether to fix it or rebuild it.',
  },
];

export const servicesFaq: Faq[] = [
  {
    q: 'Will my new website be mobile-friendly?',
    a: 'Absolutely. Over 60% of local searches happen on mobile devices. Every site we build uses a mobile-first design approach, ensuring it looks and performs flawlessly on smartphones, tablets, and desktops.',
  },
  {
    q: 'How long does the web design process take?',
    a: "A standard 5-to-8 page small business website usually takes 2 to 4 weeks to launch from kickoff. Larger, more complex sites may take 4 to 8 weeks. We'll outline a strict timeline during our discovery call.",
  },
  {
    q: 'Do you provide website hosting and maintenance?',
    a: 'Yes. Our care plan, Activate & Open Your Doors, is $149/month. That covers fast managed hosting, SSL, daily off-site backups, security monitoring and updates, a spam-filtered lead form wired to your CRM, instant lead alerts with tap-to-call, automated review requests, and a monthly one-page snapshot.',
  },
  {
    q: 'Why is my contractor website not generating leads?',
    a: "The most common culprits: your phone number isn't visible and tappable on mobile (most contractor searches happen on phones), your site doesn't rank for any local keywords so almost no one finds it organically, your pages don't specifically name the cities you serve so Google doesn't understand your service area, or there's no clear call-to-action guiding visitors toward contacting you. Every one of these is fixable. We diagnose these issues during our free strategy call and build a plan around them.",
  },
  {
    q: 'Should my contractor website include call tracking?',
    a: "Yes — absolutely. Call tracking assigns a unique phone number to your website so you know exactly how many calls your site generates. Without it, you're flying blind on your marketing ROI. We set up call tracking as a standard part of every new website build and connect it to Google Analytics so your monthly data shows real call volume — not just page views.",
  },
];
