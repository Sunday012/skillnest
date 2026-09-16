import type { AppIconName } from '../components/AppIcon';

export interface NotificationItem {
  id: string;
  type: 'Orders' | 'Payouts' | 'System';
  icon: AppIconName;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'Orders',
    icon: 'chatbubble-ellipses-outline',
    title: 'Milestone delivered',
    description: 'Mira Vance delivered "Primary logo concepts" on order SN-4821.',
    time: '12 min ago',
    isUnread: true,
  },
  {
    id: 'n2',
    type: 'Orders',
    icon: 'document-text-outline',
    title: 'New proposal',
    description: 'Priya Nair applied to "Rebrand for a specialty coffee roaster".',
    time: '2 hours ago',
    isUnread: true,
  },
  {
    id: 'n3',
    type: 'Payouts',
    icon: 'cash-outline',
    title: 'Payout sent',
    description: '$1,240.00 is on the way to your bank account ending 4417.',
    time: 'Yesterday',
    isUnread: false,
  },
  {
    id: 'n4',
    type: 'System',
    icon: 'checkmark-circle-outline',
    title: 'Identity verified',
    description: 'Your KYC check passed. The verified badge is now on your profile.',
    time: '3 days ago',
    isUnread: false,
  },
];
