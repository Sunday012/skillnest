export interface ProposalItem {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerVerified: boolean;
  freelancerRole: string;
  freelancerRating: string;
  freelancerReviewsCount: number;
  pitch: string;
  bid: string;
  delivery: string;
}

export interface JobItem {
  id: string;
  metaCode: string;
  category: string;
  postedTime: string;
  title: string;
  description: string;
  proposalsCount: number;
  status: 'Active' | 'In Progress' | 'Draft';
  budget: string;
  proposals: ProposalItem[];
  showingText?: string;
}

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'JB-201',
    metaCode: 'JB-201',
    category: 'Design',
    postedTime: 'Posted 3 days ago',
    title: 'Rebrand for a specialty coffee roaster',
    description: 'Full identity refresh: wordmark, packaging system, and a short brand guide. Existing palette can evolve but should stay warm.',
    proposalsCount: 14,
    status: 'Active',
    budget: '$3,400',
    showingText: 'Showing 2 of 14 proposals — full pagination pattern TBD in a later phase.',
    proposals: [
      {
        id: 'prop-1',
        freelancerId: '1',
        freelancerName: 'Mira Vance',
        freelancerAvatar: 'M',
        freelancerVerified: true,
        freelancerRole: 'Brand Designer & Identity Systems',
        freelancerRating: '4.9',
        freelancerReviewsCount: 212,
        pitch: '"I\'d start with a short positioning session before touching the logo — happy to walk through my process on a call."',
        bid: '$3,200',
        delivery: '10-day delivery',
      },
      {
        id: 'prop-2',
        freelancerId: '3',
        freelancerName: 'Priya Nair',
        freelancerAvatar: 'P',
        freelancerVerified: true,
        freelancerRole: 'Product Designer — SaaS & Dashboards',
        freelancerRating: '4.9',
        freelancerReviewsCount: 131,
        pitch: '"Dense interfaces made calm is my specialty, but I\'ve done a fair bit of packaging work too — portfolio linked."',
        bid: '$3,400',
        delivery: '14-day delivery',
      },
    ],
  },
  {
    id: 'JB-198',
    metaCode: 'JB-198',
    category: 'Development',
    postedTime: 'Posted 1 week ago',
    title: 'Marketing site build — 6 pages, React',
    description: 'Design is finished in Figma. Need a clean React implementation with CMS-ready content structure.',
    proposalsCount: 22,
    status: 'In Progress',
    budget: '$5,200',
    showingText: 'Showing 1 of 22 proposals — full pagination pattern TBD in a later phase.',
    proposals: [
      {
        id: 'prop-3',
        freelancerId: '2',
        freelancerName: 'Devon Park',
        freelancerAvatar: 'D',
        freelancerVerified: true,
        freelancerRole: 'Front-end Engineer — React & Tailwind',
        freelancerRating: '5.0',
        freelancerReviewsCount: 98,
        pitch: '"Clean React + TypeScript code base ready for Next.js or Vite integration with zero bundle bloat."',
        bid: '$5,000',
        delivery: '14-day delivery',
      },
    ],
  },
  {
    id: 'JB-190',
    metaCode: 'JB-190',
    category: 'Video',
    postedTime: 'Posted 2 weeks ago',
    title: 'Quarterly product launch film',
    description: 'Not yet published — finish the brief and milestone budget to post this job.',
    proposalsCount: 0,
    status: 'Draft',
    budget: '$2,800',
    showingText: 'No proposals received yet. Finish posting to invite freelancer bids.',
    proposals: [],
  },
];

export function getJobById(id: string): JobItem {
  const found = MOCK_JOBS.find(j => j.id.toLowerCase() === id.toLowerCase() || j.metaCode.toLowerCase() === id.toLowerCase());
  return found || MOCK_JOBS[0];
}
