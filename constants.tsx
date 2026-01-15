
import { EventStatus, EventActivity, CashTransaction, UserStats, StudioModel, LeaderboardEntry } from './types';

export const MOCK_USER_STATS: UserStats = {
  totalEvents: 12,
  cumulativeViewers: 45800,
  totalCash: 125.80,
  averageEventIncome: 450,
  averageNormalIncome: 280,
  averageEventViewers: 1200,
  averageNormalViewers: 750
};

export const MOCK_STUDIO_MODELS: StudioModel[] = [
  { id: 'm1', name: 'Alice Wang', avatar: 'https://i.pravatar.cc/150?u=m1', isAvailable: true },
  { id: 'm2', name: 'Bella Chen', avatar: 'https://i.pravatar.cc/150?u=m2', isAvailable: true },
  { id: 'm3', name: 'Crystal Li', avatar: 'https://i.pravatar.cc/150?u=m3', isAvailable: false },
  { id: 'm4', name: 'Diana Zhang', avatar: 'https://i.pravatar.cc/150?u=m4', isAvailable: true },
  { id: 'm5', name: 'Elena Sun', avatar: 'https://i.pravatar.cc/150?u=m5', isAvailable: true },
  { id: 'm6', name: 'Fiona He', avatar: 'https://i.pravatar.cc/150?u=m6', isAvailable: true },
  { id: 'm7', name: 'Grace Wu', avatar: 'https://i.pravatar.cc/150?u=m7', isAvailable: false },
  { id: 'm8', name: 'Heidi Liu', avatar: 'https://i.pravatar.cc/150?u=m8', isAvailable: true },
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
    cover: 'https://picsum.photos/seed/kinky1/1200/600',
    description: 'The most anticipated event of the year, designed to reward high-quality live content. By increasing interaction rates and broadcast duration, models can unlock tiered generous rewards. This event is sponsored by Lovense Official, and top-ranking models have the chance to be featured on the homepage carousel.',
    fullRules: '1. Must stream under the event category; 2. Strictly no pre-recorded videos; 3. Tiered rewards are settled instantly to the Lovense Cash account upon task completion.',
    status: EventStatus.ONGOING,
    joined: true,
    currentStep: 2,
    totalSteps: 3,
    stages: [
      { stage: 1, target: 'Live for 2 hours', rewardAmount: 10, isCompleted: true, fullDescription: 'Accumulated valid broadcast duration reaches 120 minutes during the event.' },
      { stage: 2, target: 'Reach 500 Viewers', rewardAmount: 20, isCompleted: true, fullDescription: 'Peak viewers in a single broadcast reach 500 people.' },
      { stage: 3, target: 'Earn 1000 Tokens', rewardAmount: 50, isCompleted: false, fullDescription: 'Accumulated gift tokens reach 1000 (excluding rebates).' },
    ],
    stats: { viewers: 850, earningsTokens: 4200, duration: 180, participantCount: 1240 }
  },
  {
    id: 'e4',
    name: 'Orgy Event',
    cover: 'https://picsum.photos/seed/orgy1/1200/600',
    description: 'Special incentives for weekday traffic. During Tuesday to Thursday, any model who meets the earnings target can receive extra traffic card rewards. This is an excellent opportunity to enhance fan loyalty and stabilize daily income.',
    fullRules: 'The event is only valid for earnings generated between Tuesday 0:00 and Thursday 23:59 Beijing time.',
    status: EventStatus.ONGOING,
    joined: false,
    currentStep: 0,
    totalSteps: 4,
    stages: [
      { stage: 1, target: 'Single Session 60 min', rewardAmount: 5, isCompleted: false },
      { stage: 2, target: '50 Unique Gifters', rewardAmount: 15, isCompleted: false },
      { stage: 3, target: 'Accumulate 5000 Tokens', rewardAmount: 30, isCompleted: false },
      { stage: 4, target: 'Top 100 Rank', rewardAmount: 100, isCompleted: false },
    ],
    stats: { viewers: 120, earningsTokens: 0, duration: 0, participantCount: 850 }
  },
  {
    id: 'e2',
    name: 'Kinky Soirée',
    cover: 'https://picsum.photos/seed/soiree1/1200/600',
    description: 'Welcome to the Lovense family! This is an exclusive track for new models who have joined for less than 30 days. Here, we don\'t look at traffic depth, only growth speed. Completing tasks rewards high exposure bonuses to help you pass the newcomer period quickly.',
    status: EventStatus.UPCOMING,
    joined: false,
    currentStep: 0,
    totalSteps: 3,
    stages: [
      { stage: 1, target: 'Stream for 3 consecutive days', rewardAmount: 30, isCompleted: false },
      { stage: 2, target: 'Gain 100 followers', rewardAmount: 50, isCompleted: false },
      { stage: 3, target: 'Single session income > 1k', rewardAmount: 100, isCompleted: false },
    ],
    stats: { viewers: 0, earningsTokens: 0, duration: 0, participantCount: 0 }
  },
  {
    id: 'e3',
    name: 'VR Tech Beta Test',
    cover: 'https://picsum.photos/seed/vrtech1/1200/600',
    description: 'Explore the next boundary of live streaming. We are testing deep interaction features based on the Lovense VR series toys. Participating models need to interact with fans through specific interfaces and provide valuable feedback.',
    status: EventStatus.TESTING,
    joined: true,
    currentStep: 1,
    totalSteps: 2,
    stages: [
      { stage: 1, target: 'Submit Experience Report', rewardAmount: 20, isCompleted: true },
      { stage: 2, target: '1 hour Beta Session', rewardAmount: 30, isCompleted: false },
    ],
    stats: { viewers: 320, earningsTokens: 1500, duration: 60, participantCount: 45 }
  }
];

export const MOCK_TRANSACTIONS: CashTransaction[] = [
  { id: 't1', date: '2023-10-25 14:30', amount: 20, source: 'Summer Rave Phase 2 Reward', type: 'income' },
  { id: 't2', date: '2023-10-24 09:15', amount: 10, source: 'VR Beta Reward', type: 'income' },
  { id: 't4', date: '2023-10-20 12:00', amount: -50, source: 'Bought Exposure Pack (1000 views)', type: 'spend' },
];
