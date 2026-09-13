export interface MessageBubble {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ConversationItem {
  id: string;
  freelancerName: string;
  role: string;
  avatar: string;
  time: string;
  snippet: string;
  unreadCount?: number;
  messages: MessageBubble[];
}

export const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-1',
    freelancerName: 'Mira Vance',
    role: 'Brand Designer & Identity Systems',
    avatar: 'M',
    time: '09:42',
    snippet: 'Concepts are uploaded — take a look when you can.',
    unreadCount: 2,
    messages: [
      { id: 'm1', sender: 'them', text: 'Morning! Starting on the second milestone today.', time: '08:12' },
      { id: 'm2', sender: 'me', text: 'Perfect. Any blockers from the discovery notes?', time: '08:20' },
      { id: 'm3', sender: 'them', text: 'None — the positioning doc was unusually clear, which helps a lot.', time: '08:24' },
      { id: 'm4', sender: 'them', text: 'Concepts are uploaded — take a look when you can.', time: '09:42' },
    ],
  },
  {
    id: 'conv-2',
    freelancerName: 'Devon Park',
    role: 'Front-end Engineer — React & Tailwind',
    avatar: 'D',
    time: 'Yesterday',
    snippet: 'Deployed the staging build, link in the preview dashboard.',
    unreadCount: 0,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey, build is ready for client review!', time: 'Yesterday 14:10' },
      { id: 'm2', sender: 'them', text: 'Deployed the staging build, link in the preview dashboard.', time: 'Yesterday 14:12' },
    ],
  },
  {
    id: 'conv-3',
    freelancerName: 'Aria Sol',
    role: 'Motion Designer & Video Editor',
    avatar: 'A',
    time: 'Mon',
    snippet: "I've responded to the dispute note with source render stems.",
    unreadCount: 1,
    messages: [
      { id: 'm1', sender: 'them', text: "I've responded to the dispute note with source render stems.", time: 'Mon 11:05' },
    ],
  },
  {
    id: 'conv-4',
    freelancerName: 'Theo Lang',
    role: 'Copywriter & Content Strategist',
    avatar: 'T',
    time: 'Jul 12',
    snippet: 'Appreciate the review — was a fun one.',
    unreadCount: 0,
    messages: [
      { id: 'm1', sender: 'them', text: 'Appreciate the review — was a fun one.', time: 'Jul 12 16:45' },
    ],
  },
];

export function getConversationById(id: string): ConversationItem {
  const found = MOCK_CONVERSATIONS.find(c => c.id === id || c.freelancerName.toLowerCase().includes(id.toLowerCase()));
  return found || MOCK_CONVERSATIONS[0];
}
