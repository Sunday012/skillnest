export interface MilestoneItem {
  id: string;
  number: number;
  title: string;
  description: string;
  amount: number;
  status: 'done' | 'pending' | 'disputed' | 'future';
  note?: string;
}

export interface OrderItem {
  id: string;
  metaCode: string;
  placedDate: string;
  dueDate: string;
  title: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerVerified: boolean;
  freelancerId: string;
  status: 'In Progress' | 'Delivered' | 'Disputed' | 'Completed';
  totalAmount: number;
  releasedAmount: number;
  milestones: MilestoneItem[];
}

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'SN-4821',
    metaCode: 'SN-4821',
    placedDate: '12 Aug 2026',
    dueDate: '02 Sep 2026',
    title: 'Complete brand identity & logo system',
    freelancerName: 'Mira Vance',
    freelancerAvatar: 'M',
    freelancerVerified: true,
    freelancerId: '1',
    status: 'In Progress',
    totalAmount: 1000,
    releasedAmount: 200,
    milestones: [
      {
        id: 'm-1',
        number: 1,
        title: 'Discovery & strategy session',
        description: 'Positioning doc and creative direction',
        amount: 200,
        status: 'done',
        note: '✓ Released to Mira.',
      },
      {
        id: 'm-2',
        number: 2,
        title: 'Primary logo concepts',
        description: '3 initial directions delivered for review',
        amount: 400,
        status: 'pending',
        note: 'Delivered - awaiting your review.',
      },
      {
        id: 'm-3',
        number: 3,
        title: 'Final files & handover',
        description: 'Full identity system, guidelines, source files',
        amount: 400,
        status: 'future',
      },
    ],
  },
  {
    id: 'SN-4822',
    metaCode: 'SN-4822',
    placedDate: '13 Sep 2026',
    dueDate: '04 Oct 2026',
    title: 'Complete brand identity & logo system',
    freelancerName: 'Mira Vance',
    freelancerAvatar: 'M',
    freelancerVerified: true,
    freelancerId: '1',
    status: 'In Progress',
    totalAmount: 1000,
    releasedAmount: 0,
    milestones: [
      {
        id: 'm-201',
        number: 1,
        title: 'Discovery & strategy session',
        description: 'Positioning doc and creative direction',
        amount: 200,
        status: 'pending',
        note: 'Funded in escrow - work in progress.',
      },
      {
        id: 'm-202',
        number: 2,
        title: 'Primary logo concepts',
        description: '3 initial directions delivered for review',
        amount: 400,
        status: 'future',
      },
      {
        id: 'm-203',
        number: 3,
        title: 'Final files & handover',
        description: 'Full identity system, guidelines, source files',
        amount: 400,
        status: 'future',
      },
    ],
  },
  {
    id: 'SN-4823',
    metaCode: 'SN-4823',
    placedDate: '13 Sep 2026',
    dueDate: '10 Oct 2026',
    title: 'Rebrand for a specialty coffee roaster',
    freelancerName: 'Mira Vance',
    freelancerAvatar: 'M',
    freelancerVerified: true,
    freelancerId: '1',
    status: 'In Progress',
    totalAmount: 2900,
    releasedAmount: 0,
    milestones: [
      {
        id: 'm-301',
        number: 1,
        title: 'Discovery & strategy session',
        description: 'Brand positioning and roast profile packaging review',
        amount: 600,
        status: 'pending',
        note: 'Funded in escrow - work in progress.',
      },
      {
        id: 'm-302',
        number: 2,
        title: 'Concept directions',
        description: '3 custom identity & label directions',
        amount: 1400,
        status: 'future',
      },
      {
        id: 'm-303',
        number: 3,
        title: 'Final files & handover',
        description: 'Vector assets, print-ready die-lines, and brand guide',
        amount: 900,
        status: 'future',
      },
    ],
  },
  {
    id: 'SN-4790',
    metaCode: 'SN-4790',
    placedDate: '04 Aug 2026',
    dueDate: '25 Aug 2026',
    title: 'Responsive landing page in React & Tailwind',
    freelancerName: 'Devon Park',
    freelancerAvatar: 'D',
    freelancerVerified: true,
    freelancerId: '2',
    status: 'Delivered',
    totalAmount: 1780,
    releasedAmount: 1780,
    milestones: [
      {
        id: 'm-101',
        number: 1,
        title: 'Component architecture & setup',
        description: 'React codebase initialization with Tailwind tokens',
        amount: 580,
        status: 'done',
        note: '✓ Released to Devon.',
      },
      {
        id: 'm-102',
        number: 2,
        title: 'Page builds & responsive views',
        description: '6 responsive marketing page templates',
        amount: 600,
        status: 'done',
        note: '✓ Released to Devon.',
      },
      {
        id: 'm-103',
        number: 3,
        title: 'Handover & deployment check',
        description: 'Final deployment check and documentation handover',
        amount: 600,
        status: 'done',
        note: '✓ Released to Devon.',
      },
    ],
  },
  {
    id: 'SN-4712',
    metaCode: 'SN-4712',
    placedDate: '21 Jul 2026',
    dueDate: '10 Aug 2026',
    title: 'Product launch motion graphics & edits',
    freelancerName: 'Aria Sol',
    freelancerAvatar: 'A',
    freelancerVerified: true,
    freelancerId: '3',
    status: 'Disputed',
    totalAmount: 620,
    releasedAmount: 220,
    milestones: [
      {
        id: 'm-401',
        number: 1,
        title: 'Storyboard & motion roughs',
        description: 'Initial motion concept approval',
        amount: 220,
        status: 'done',
        note: '✓ Released to Aria.',
      },
      {
        id: 'm-402',
        number: 2,
        title: 'Animation pass',
        description: 'Delivered 30s cut with original audio stems',
        amount: 400,
        status: 'disputed',
        note: 'Under review by NavoNext support.',
      },
    ],
  },
];

export function getOrderById(id: string): OrderItem {
  const found = MOCK_ORDERS.find(
    o => o.id.toLowerCase() === id.toLowerCase() || o.metaCode.toLowerCase() === id.toLowerCase()
  );
  return found || MOCK_ORDERS[0];
}
