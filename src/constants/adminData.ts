import type { AppIconName } from '../components/AppIcon';
import { FEATURED_TALENT } from './discoveryData';
import { MOCK_ORDERS } from './ordersData';

export interface AdminUserItem {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'Freelancer' | 'Client' | 'Staff';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
}

export interface AdminApprovalItem {
  id: string;
  talentId?: string;
  name: string;
  avatar: string;
  category: string;
  submittedDate: string;
  submittedDaysAgo: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  description: string;
  documents: {
    idType: string;
    idFileName: string;
    portfolioCount: number;
    samples: string[];
  };
}

export interface AdminDisputeItem {
  id: string;
  orderId: string;
  title: string;
  clientName: string;
  freelancerName: string;
  milestoneTitle: string;
  disputeReason: string;
  frozenAmount: number;
  openedAgo: string;
  status: 'Disputed' | 'Resolved_Freelancer' | 'Resolved_Client' | 'Resolved_Split';
  chatHistory: { sender: string; time: string; text: string }[];
}

export interface AdminTransactionItem {
  id: string;
  orderId: string;
  amount: number;
  type: 'Release' | 'Escrow Hold' | 'Payout' | 'Refund' | 'Frozen';
  status: 'Cleared' | 'Flagged' | 'Pending';
  date: string;
}

export interface AdminModerationItem {
  id: string;
  title: string;
  targetType: 'gig' | 'profile' | 'job';
  reportedByCount: number;
  reason: string;
  description: string;
  flaggedAgo: string;
  status: 'Pending' | 'Removed' | 'Dismissed';
}

// Find Kaito Tanaka from discoveryData
const kaitoRecord = FEATURED_TALENT.find(t => t.name === 'Kaito Tanaka') || {
  id: '4',
  name: 'Kaito Tanaka',
  initial: 'K',
  category: 'Animation',
};

// Find SN-4712 from ordersData
const sn4712Record = MOCK_ORDERS.find(o => o.id === 'SN-4712') || {
  id: 'SN-4712',
  title: 'Product launch motion graphics & edits',
  freelancerName: 'Aria Sol',
  totalAmount: 620,
};

export const INITIAL_ADMIN_STATS = {
  totalUsers: '12,480',
  totalUsersDelta: '+340 this week',
  activeGigs: '3,940',
  activeGigsDelta: '+5.2%',
  gmvMonth: '$284K',
  gmvDelta: '+18%',
  disputesOpen: 2,
  disputesDelta: 'Needs review',
  pendingApprovals: 3,
  pendingApprovalsDelta: 'Oldest: 2 days',
};

export const RECENT_ACTIVITIES: { id: string; icon: AppIconName; text: string; time: string }[] = [
  { id: '1', icon: 'person-add-outline', text: 'New freelancer signup — Kaito Tanaka', time: '12m' },
  { id: '2', icon: 'warning-outline', text: 'Dispute opened on SN-4712', time: '1h' },
  { id: '3', icon: 'flag-outline', text: 'Gig flagged for review — "Quick logo $5"', time: '3h' },
  { id: '4', icon: 'cash-outline', text: 'Payout batch processed — $18,200', time: 'Yesterday' },
];

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: 'u-1',
    name: 'Mira Vance',
    avatar: 'M',
    email: 'mira.vance@studio.com',
    role: 'Freelancer',
    status: 'Active',
    joinedDate: '12 Jan 2026',
  },
  {
    id: 'u-2',
    name: 'Devon Park',
    avatar: 'D',
    email: 'devon.park@mail.com',
    role: 'Freelancer',
    status: 'Active',
    joinedDate: '03 Feb 2026',
  },
  {
    id: 'u-3',
    name: 'Gideon Divine',
    avatar: 'G',
    email: 'menegideon84@gmail.com',
    role: 'Client',
    status: 'Active',
    joinedDate: '28 Aug 2026',
  },
  {
    id: 'u-4',
    name: 'Ravi Mehta',
    avatar: 'R',
    email: 'ravi.m@mail.com',
    role: 'Client',
    status: 'Suspended',
    joinedDate: '14 May 2026',
  },
  {
    id: 'u-5',
    name: 'Aria Sol',
    avatar: 'A',
    email: 'aria.sol@motion.io',
    role: 'Freelancer',
    status: 'Active',
    joinedDate: '19 Apr 2026',
  },
];

export const INITIAL_APPROVALS: AdminApprovalItem[] = [
  {
    id: 'app-1',
    talentId: kaitoRecord.id,
    name: kaitoRecord.name,
    avatar: kaitoRecord.initial || 'K',
    category: 'Video Editing · Animation',
    submittedDate: '18 Sep 2026',
    submittedDaysAgo: '2 days ago',
    status: 'Pending Review',
    description: 'ID document and portfolio (3 video samples) uploaded. No prior NavoNext history.',
    documents: {
      idType: 'Passport (Japan)',
      idFileName: 'passport_kaito_tanaka.pdf',
      portfolioCount: 3,
      samples: ['3D_showreel_2026.mp4', 'character_rigging_sample.mp4', 'motion_graphics_ad.mp4'],
    },
  },
  {
    id: 'app-2',
    name: 'Sofia Almeida',
    avatar: 'S',
    category: 'Copywriting',
    submittedDate: '19 Sep 2026',
    submittedDaysAgo: '1 day ago',
    status: 'Pending Review',
    description: 'ID document uploaded. Portfolio links only (no direct uploads) — 2 external links provided.',
    documents: {
      idType: 'National ID (Portugal)',
      idFileName: 'id_sofia_almeida.pdf',
      portfolioCount: 2,
      samples: ['https://sofiacopy.design/case-study-1', 'https://medium.com/@sofia/brand-messaging'],
    },
  },
  {
    id: 'app-3',
    name: 'Liam Chen',
    avatar: 'L',
    category: 'Graphic Design',
    submittedDate: '20 Sep 2026',
    submittedDaysAgo: '5 hours ago',
    status: 'Pending Review',
    description: 'National ID and 4 vector branding case studies submitted for verification.',
    documents: {
      idType: 'Identity Card (Singapore)',
      idFileName: 'nric_liam_chen.pdf',
      portfolioCount: 4,
      samples: ['brand_identity_fintech.pdf', 'packaging_system.pdf', 'typography_specimen.pdf', 'logo_grid.pdf'],
    },
  },
];

export const INITIAL_DISPUTES: AdminDisputeItem[] = [
  {
    id: 'disp-1',
    orderId: sn4712Record.id,
    title: sn4712Record.title,
    clientName: 'Ravi Mehta',
    freelancerName: sn4712Record.freelancerName || 'Aria Sol',
    milestoneTitle: 'Animation pass',
    disputeReason: 'Client disputes the delivered 30s cut as not matching the approved storyboard. Freelancer maintains scope was followed. Funds frozen: $400.',
    frozenAmount: 400,
    openedAgo: '3 days ago',
    status: 'Disputed',
    chatHistory: [
      { sender: 'Ravi Mehta (Client)', time: '3 days ago', text: 'The motion graphics in cut 2 don’t follow the storyboard agreed upon in Milestone 1.' },
      { sender: 'Aria Sol (Freelancer)', time: '2 days ago', text: 'The storyboard changes were discussed in chat and approved before rendering.' },
      { sender: 'NavoNext Mediator', time: '1 day ago', text: 'Reviewing milestone agreement and export history.' },
    ],
  },
  {
    id: 'disp-2',
    orderId: 'SN-4690',
    title: 'E-commerce API Integration in Node.js',
    clientName: 'Sarah Jenkins',
    freelancerName: 'Marcus Vance',
    milestoneTitle: 'Payment gateway webhooks',
    disputeReason: 'Client claims webhook handler is missing idempotency checks. Freelancer asserts that was outside initial scope.',
    frozenAmount: 350,
    openedAgo: '1 day ago',
    status: 'Disputed',
    chatHistory: [
      { sender: 'Sarah Jenkins (Client)', time: '1 day ago', text: 'Stripe webhook retries cause duplicate order entries.' },
      { sender: 'Marcus Vance (Freelancer)', time: '18h ago', text: 'Webhook idempotency was listed as optional phase 2 requirement in contract.' },
    ],
  },
];

export const INITIAL_TRANSACTIONS: AdminTransactionItem[] = [
  { id: 'TX-8821', orderId: 'SN-4821', amount: 200, type: 'Release', status: 'Cleared', date: '12 Aug' },
  { id: 'TX-8790', orderId: 'SN-4790', amount: 1780, type: 'Escrow Hold', status: 'Cleared', date: '04 Aug' },
  { id: 'TX-8712', orderId: 'SN-4712', amount: 400, type: 'Frozen', status: 'Flagged', date: '21 Jul' },
  { id: 'TX-8655', orderId: 'SN-4655', amount: 340, type: 'Payout', status: 'Cleared', date: '10 Jul' },
  { id: 'TX-8600', orderId: 'SN-4600', amount: 950, type: 'Release', status: 'Cleared', date: '28 Jun' },
];

export const REVENUE_METRICS = {
  commission: 18400,
  commissionPercent: '10–20%',
  subscriptions: 4120,
  admobAds: 860,
  totalMonth: 23380,
  monthlyTrend: [
    { month: 'Apr', commission: 12000, subscriptions: 2800, ads: 500, total: 15300 },
    { month: 'May', commission: 14500, subscriptions: 3100, ads: 620, total: 18220 },
    { month: 'Jun', commission: 13800, subscriptions: 3400, ads: 700, total: 17900 },
    { month: 'Jul', commission: 16900, subscriptions: 3800, ads: 810, total: 21510 },
    { month: 'Aug', commission: 15800, subscriptions: 3950, ads: 840, total: 20590 },
    { month: 'Sep', commission: 18400, subscriptions: 4120, ads: 860, total: 23380 },
  ],
};

export const INITIAL_MODERATION_ITEMS: AdminModerationItem[] = [
  {
    id: 'mod-1',
    title: 'Gig flagged — "Quick logo design for $5"',
    targetType: 'gig',
    reportedByCount: 3,
    reason: 'Suspiciously low price / possible spam',
    description: 'Gig promises unlimited revisions and full brand system at $5, well below platform norms for the category.',
    flaggedAgo: '5 hours ago',
    status: 'Pending',
  },
  {
    id: 'mod-2',
    title: 'Profile flagged — Portfolio contains external branding',
    targetType: 'profile',
    reportedByCount: 1,
    reason: 'Possible copied portfolio work',
    description: 'Reporter claims one portfolio image matches a Behance post by a different, unrelated designer.',
    flaggedAgo: '1 day ago',
    status: 'Pending',
  },
  {
    id: 'mod-3',
    title: 'Gig flagged — "Guaranteed 100k Spotify plays in 24 hours"',
    targetType: 'gig',
    reportedByCount: 5,
    reason: 'Prohibited artificial traffic service',
    description: 'Promotes non-compliant bot traffic violating platform service policies.',
    flaggedAgo: '2 days ago',
    status: 'Pending',
  },
  {
    id: 'mod-4',
    title: 'Job posting flagged — "Unpaid trial assignment required before hiring"',
    targetType: 'job',
    reportedByCount: 2,
    reason: 'Violates platform paid trial policy',
    description: 'Client asking applicants to complete 8 hours of work for free as part of application.',
    flaggedAgo: '3 days ago',
    status: 'Pending',
  },
];
