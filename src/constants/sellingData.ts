import { OFFICIAL_CATEGORIES } from './categories';

export const MOCK_CURRENT_USER_ID = '1'; // Mira Vance

export interface PackageTier {
  id: string;
  name: string; // e.g. 'Essential', 'Studio', 'Full System'
  price: number;
  delivery: string;
  revisions: string;
  features: string[];
  isPopular?: boolean;
}

export interface GigItem {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  impressions: string;
  orders: number;
  rating: string;
  price: number;
  status: 'Active' | 'Paused' | 'Draft';
  sellerName: string;
  sellerVerified: boolean;
  sellerRating: number;
  sellerReviewsCount: number;
  sellerOrdersCount: number;
  deliveryTime: string;
  revisionsCount: string;
  packages: PackageTier[];
}

export const MOCK_GIG_STATS = [
  { id: '1', val: '33,790', lbl: 'Impressions', delta: '+12% this week' },
  { id: '2', val: '3.4%', lbl: 'Conversion', delta: 'Category avg 2.1%' },
  { id: '3', val: '1h 12m', lbl: 'Response Time', delta: 'Top 10% of sellers' },
];

export const MOCK_GIGS: GigItem[] = [
  {
    id: '1',
    ownerId: '1',
    title: 'Complete brand identity & logo system',
    category: 'Graphic Design',
    subcategory: 'Brand Identity',
    description: 'This is a full-service engagement, not a template drop. We start with a short written brief, agree the milestones, and work in the open — you see progress at every stage rather than one big reveal at the end.\n\nEvery deliverable is scoped in the milestone plan before work begins, so there are no surprise invoices and no scope creep arguments. Escrow releases only when you approve.',
    impressions: '12,480',
    orders: 240,
    rating: '★ 4.9',
    price: 450,
    status: 'Active',
    sellerName: 'Mira Vance',
    sellerVerified: true,
    sellerRating: 4.9,
    sellerReviewsCount: 212,
    sellerOrdersCount: 240,
    deliveryTime: '3 days',
    revisionsCount: '2 included',
    packages: [
      {
        id: 'pkg-1',
        name: 'Essential',
        price: 450,
        delivery: '3-day delivery',
        revisions: '2 revisions',
        features: ['1 concept', '2 revisions', 'Source files'],
      },
      {
        id: 'pkg-2',
        name: 'Studio',
        price: 990,
        delivery: '6-day delivery',
        revisions: 'Unlimited revisions',
        features: ['3 concepts', 'Unlimited revisions', 'Brand guide'],
        isPopular: true,
      },
      {
        id: 'pkg-3',
        name: 'Full System',
        price: 1800,
        delivery: '12-day delivery',
        revisions: 'Unlimited revisions',
        features: ['Full identity', 'Guidelines', 'Social kit'],
      },
    ],
  },
  {
    id: '2',
    ownerId: '1',
    title: 'Responsive landing page in React & Tailwind',
    category: 'Web Design',
    subcategory: 'Front-end Development',
    description: 'High-performance marketing landing pages built with clean React code and modern Tailwind CSS styling.',
    impressions: '9,210',
    orders: 112,
    rating: '★ 5.0',
    price: 890,
    status: 'Active',
    sellerName: 'Mira Vance',
    sellerVerified: true,
    sellerRating: 5.0,
    sellerReviewsCount: 98,
    sellerOrdersCount: 112,
    deliveryTime: '5 days',
    revisionsCount: '3 included',
    packages: [
      {
        id: 'pkg-1',
        name: 'Essential',
        price: 890,
        delivery: '5-day delivery',
        revisions: '3 revisions',
        features: ['1 page build', 'Responsive design', 'Source code'],
      },
    ],
  },
  {
    id: '3',
    ownerId: '1',
    title: 'Product launch motion graphics & edits',
    category: 'Video Editing',
    subcategory: 'Motion Graphics',
    description: 'Sleek motion graphics and video editing for product announcements, social ads, and kickstarters.',
    impressions: '4,380',
    orders: 76,
    rating: '★ 4.8',
    price: 620,
    status: 'Paused',
    sellerName: 'Mira Vance',
    sellerVerified: true,
    sellerRating: 4.8,
    sellerReviewsCount: 76,
    sellerOrdersCount: 76,
    deliveryTime: '4 days',
    revisionsCount: '2 included',
    packages: [
      {
        id: 'pkg-1',
        name: 'Essential',
        price: 620,
        delivery: '4-day delivery',
        revisions: '2 revisions',
        features: ['60-sec edit', 'Motion graphics', '1080p export'],
      },
    ],
  },
  {
    id: '4',
    ownerId: '1',
    title: 'SaaS dashboard design, Figma to spec',
    category: 'Graphic Design',
    subcategory: 'UI/UX Design',
    description: 'Complex SaaS web dashboard design with components, dark mode tokens, and full Figma spec.',
    impressions: '—',
    orders: 0,
    rating: '—',
    price: 1240,
    status: 'Draft',
    sellerName: 'Mira Vance',
    sellerVerified: true,
    sellerRating: 0,
    sellerReviewsCount: 0,
    sellerOrdersCount: 0,
    deliveryTime: '7 days',
    revisionsCount: 'Unlimited',
    packages: [
      {
        id: 'pkg-1',
        name: 'Essential',
        price: 1240,
        delivery: '7-day delivery',
        revisions: 'Unlimited',
        features: ['Full UI kit', 'Figma file', 'User flow design'],
      },
    ],
  },
];

export function getGigById(id: string): { gig: GigItem; isOwner: boolean } {
  const found = MOCK_GIGS.find(g => g.id === id) || MOCK_GIGS[0];
  const isOwner = found.ownerId === MOCK_CURRENT_USER_ID;
  return { gig: found, isOwner };
}
