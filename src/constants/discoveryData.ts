import { OFFICIAL_CATEGORIES } from './categories';

/**
 * CATEGORIES — the 15 official categories with mock pro-counts for display.
 * Labels are sourced from OFFICIAL_CATEGORIES (single source of truth).
 */
const CATEGORY_COUNTS: Record<string, string> = {
  'Videography':              '640 pros',
  'Video Editing':            '870 pros',
  'Photography':              '760 pros',
  'Graphic Design':           '2,410 pros',
  'Web Design':               '1,240 pros',
  'Software Development':     '3,180 pros',
  'Script Writing':           '320 pros',
  'Copywriting':              '980 pros',
  'UGC Creation':             '510 pros',
  'Animation':                '540 pros',
  'Voice Over':               '290 pros',
  'Social Media Management':  '1,150 pros',
  'Digital Marketing':        '1,090 pros',
  'Virtual Assistance':       '820 pros',
  'Other Digital Skills':     '430 pros',
};

export const CATEGORIES = OFFICIAL_CATEGORIES.map((c, i) => ({
  id: String(i + 1),
  title: c.label,
  icon: c.icon,
  count: CATEGORY_COUNTS[c.label] ?? '—',
}));

export const FEATURED_TALENT = [
  {
    id: '1',
    name: 'Mira Vance',
    initial: 'M',
    isVerified: true,
    role: 'Brand Designer',
    category: 'Graphic Design',
    location: 'Lisbon, PT',
    status: 'available',
    tags: ['Brand Identity', 'Logo Design', 'Packaging'],
    rating: 4.9,
    reviews: 212,
    price: 85,
    about: 'I build identity systems for founders who care about longevity over trends. Twelve years in studios, now independent — every project starts with a written strategy, not a mood board.',
    completion: 99,
  },
  {
    id: '2',
    name: 'Devon Park',
    initial: 'D',
    isVerified: true,
    role: 'Front-end Engineer — React & Tailwind',
    category: 'Software Development',
    location: 'Seoul, KR',
    status: 'busy',
    tags: ['React', 'TypeScript', 'Performance'],
    rating: 5.0,
    reviews: 98,
    price: 110,
    about: 'Marketing sites and product surfaces that load fast and stay maintainable.',
    completion: 100,
  },
  {
    id: '3',
    name: 'Priya Nair',
    initial: 'P',
    isVerified: true,
    role: 'Product Designer — SaaS & Dashboards',
    category: 'Web Design',
    location: 'Bengaluru, IN',
    status: 'away',
    tags: ['Figma', 'Design Systems', 'Research'],
    rating: 4.9,
    reviews: 131,
    price: 95,
    about: 'Dense interfaces made calm. I specialise in data-heavy products.',
    completion: 98,
  },
];

export const LATEST_JOBS = [
  {
    id: '1',
    tag: 'Design',
    title: 'Rebrand for a coffee roaster',
    meta: 'Posted 2 hours ago · Remote',
    proposals: 14,
    budget: '$3,400',
  },
  {
    id: '2',
    tag: 'Development',
    title: 'Marketing site build — 6 pages, React',
    meta: 'Posted 1 day ago · Remote',
    proposals: 22,
    budget: '$5,200',
  },
  {
    id: '3',
    tag: 'Video',
    title: 'Quarterly product launch film',
    meta: 'Posted 2 days ago · On-site (Berlin)',
    proposals: 8,
    budget: '$2,800',
  },
];

export const PORTFOLIO_ITEMS = [
  { id: '1', type: 'image', icon: '🖼️' },
  { id: '2', type: 'video', icon: '🎬', duration: '0:42' },
  { id: '3', type: 'image', icon: '🖼️' },
  { id: '4', type: 'image', icon: '🖼️' },
  { id: '5', type: 'image', icon: '🖼️' },
  { id: '6', type: 'video', icon: '🎬', duration: '1:05' },
];

export const REVIEWS = [
  { id: '1', who: 'Hannah Lloyd', stars: '★★★★★', text: 'Mira reframed our whole positioning before touching a logo.' },
  { id: '2', who: 'Marcus Reid', stars: '★★★★★', text: 'Clear milestones, zero chasing. Delivered a day early.' },
];
