
import { EventStatus, EventActivity, CashTransaction, UserStats, StudioModel, LeaderboardEntry } from './types';

export const MOCK_USER_STATS: UserStats = {
  totalEvents: 12,
  cumulativeViewers: 45800,
  totalCash: 125.80,
  testingPoints: 450, // Added TP
  averageEventIncome: 450,
  averageNormalIncome: 280,
  averageEventViewers: 1200,
  averageNormalViewers: 750
};

export const MOCK_STUDIO_MODELS: StudioModel[] = [
  { id: 'm1', name: 'Alice Wang', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
  { id: 'm2', name: 'Bella Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
  { id: 'm3', name: 'Crystal Li', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: false },
  { id: 'm4', name: 'Diana Zhang', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
  { id: 'm5', name: 'Elena Sun', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
  { id: 'm6', name: 'Fiona He', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
  { id: 'm7', name: 'Grace Wu', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: false },
  { id: 'm8', name: 'Heidi Liu', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=150&h=150', isAvailable: true },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, id: 'l1', name: 'Sophia Grace', avatar: 'https://i.pravatar.cc/150?u=l1', earningsTokens: 125000, trend: 'up' },
  { rank: 2, id: 'l2', name: 'Mia Khalifa', avatar: 'https://i.pravatar.cc/150?u=l2', earningsTokens: 98400, trend: 'stable' },
  { rank: 3, id: 'l3', name: 'Ava Addams', avatar: 'https://i.pravatar.cc/150?u=l3', earningsTokens: 87200, trend: 'up' },
  { rank: 4, id: 'l4', name: 'Lily Love', avatar: 'https://i.pravatar.cc/150?u=l4', earningsTokens: 65000, trend: 'down' },
  { rank: 5, id: 'l5', name: 'Rose Red', avatar: 'https://i.pravatar.cc/150?u=l5', earningsTokens: 54300, trend: 'stable' },
];

export const MOCK_EVENTS: EventActivity[] = [
  {
    id: 'e1',
    name: 'Kinky Night Event',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    description: 'The most anticipated event of the year, rewarding high-quality live content. By increasing engagement and stream duration, models can unlock tiered generous rewards.',
    fullRules: '1. Must stream under the event category; 2. Strictly no pre-recorded content; 3. Tiered rewards are settled instantly to your Lovense Cash account upon completion.',
    status: EventStatus.ONGOING,
    joined: true,
    currentStep: 2,
    totalSteps: 3,
    stages: [
      { stage: 1, target: 'Accumulate 2 hours stream', rewardAmount: 10, isCompleted: true, fullDescription: 'Total valid broadcast duration reaches 120 minutes during the event.' },
      { stage: 2, target: '500 Viewers Peak', rewardAmount: 20, isCompleted: true, fullDescription: 'Peak concurrent viewers in a single broadcast reach 500.' },
      { stage: 3, target: 'Earn 1,000 Tokens', rewardAmount: 50, isCompleted: false, fullDescription: 'Accumulated gift token points reach 1,000.' },
    ],
    stats: { viewers: 850, earningsTokens: 4200, duration: 180, participantCount: 1240 }
  },
  {
    id: 'e2',
    name: 'Miss Popularity Contest',
    cover: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop',
    description: 'Exclusive traffic and interaction incentives. Any model meeting revenue goals and gift variety will receive exclusive traffic cards.',
    fullRules: 'Event only applies to earnings generated during the promotional period. Rewards distributed based on ranking points.',
    status: EventStatus.ONGOING,
    joined: false,
    currentStep: 0,
    totalSteps: 4,
    stages: [
      { stage: 1, target: '60 min single stream', rewardAmount: 5, isCompleted: false },
      { stage: 2, target: '50 unique gifters', rewardAmount: 15, isCompleted: false },
      { stage: 3, target: 'Accumulate 5,000 Tokens', rewardAmount: 30, isCompleted: false },
      { stage: 4, target: 'Reach Top 100 Rank', rewardAmount: 100, isCompleted: false },
    ],
    stats: { viewers: 120, earningsTokens: 0, duration: 0, participantCount: 850 }
  },
  {
    id: 'e3',
    name: 'Free Control Link Campaign',
    cover: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1200&auto=format&fit=crop',
    description: 'Unleash your potential with the Free Control Link event! Designed for high-energy interactions, rewarding models who integrate real-time toy controls.',
    status: EventStatus.UPCOMING,
    joined: false,
    currentStep: 0,
    totalSteps: 3,
    stages: [
      { stage: 1, target: 'Stream for 3 consecutive days', rewardAmount: 30, isCompleted: false },
      { stage: 2, target: 'Gain 100 new followers', rewardAmount: 50, isCompleted: false },
      { stage: 3, target: 'Single session income > 1,000', rewardAmount: 100, isCompleted: false },
    ],
    stats: { viewers: 0, earningsTokens: 0, duration: 0, participantCount: 0 }
  },
  {
    id: 'e4',
    name: 'VR Tech Beta Test',
    cover: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200&h=600',
    description: 'Explore the next boundary of streaming. We are testing deep interaction features based on the Lovense VR toy series.',
    status: EventStatus.TESTING,
    joined: true,
    currentStep: 1,
    totalSteps: 2,
    stages: [
      { stage: 1, target: 'Submit Experience Report', rewardAmount: 200, isCompleted: true, fullDescription: 'Provide detailed feedback to earn Testing Points.' },
      { stage: 2, target: '1-hour Beta stream', rewardAmount: 300, isCompleted: false, fullDescription: 'Broadcast with new VR features to earn Testing Points.' },
    ],
    stats: { viewers: 320, earningsTokens: 1500, duration: 60, participantCount: 45 }
  }
];

export const MOCK_TRANSACTIONS: CashTransaction[] = [
  { id: 't1', date: '2023-10-25 14:30', amount: 20, source: 'Summer Rave Phase 2 Reward', type: 'income' },
  { id: 't2', date: '2023-10-24 09:15', amount: 10, source: 'VR Beta Reward', type: 'income' },
  { id: 't4', date: '2023-10-20 12:00', amount: -50, source: 'Purchased Traffic Pack (1k views)', type: 'spend' },
];
