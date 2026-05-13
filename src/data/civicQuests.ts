import { Quest, KingstonLocation } from '@/types';

export interface CivicQuest extends Omit<Quest, 'status' | 'completedAt'> {
  location?: KingstonLocation;
  verificationMethod: 'location' | 'voice_report' | 'step_tracker' | 'self_report';
}

export const KINGSTON_CIVIC_QUESTS: CivicQuest[] = [
  {
    questId: 'civic-001',
    title: 'Visit Kingston Public Market',
    description: 'Support local vendors and farmers at the historic Kingston Public Market. Browse fresh produce, artisan goods, and local crafts.',
    type: 'civic',
    category: 'community',
    xpReward: 40,
    duration: 30,
    isCivic: true,
    location: { lat: 44.2312, lng: -76.4860, name: 'Kingston Public Market' },
    verificationMethod: 'location',
  },
  {
    questId: 'civic-002',
    title: 'Report a Pothole',
    description: 'Help improve Kingston roads by reporting a pothole using voice command. Your report helps city maintenance prioritize repairs.',
    type: 'civic',
    category: 'community',
    xpReward: 30,
    duration: 5,
    isCivic: true,
    verificationMethod: 'voice_report',
  },
  {
    questId: 'civic-003',
    title: 'Walk to Work Challenge',
    description: 'Reduce your carbon footprint and boost your health by walking to work or school. Track your steps to complete this quest.',
    type: 'civic',
    category: 'energy',
    xpReward: 50,
    duration: 45,
    isCivic: true,
    verificationMethod: 'step_tracker',
  },
  {
    questId: 'civic-004',
    title: 'Visit Kingston City Hall',
    description: 'Learn about local government and civic services at Kingston City Hall. Engage with your community\'s democratic process.',
    type: 'civic',
    category: 'community',
    xpReward: 35,
    duration: 20,
    isCivic: true,
    location: { lat: 44.2306, lng: -76.4819, name: 'Kingston City Hall' },
    verificationMethod: 'location',
  },
  {
    questId: 'civic-005',
    title: 'Queen\'s University Campus Walk',
    description: 'Take a mindful walk through the beautiful Queen\'s University campus. Enjoy the historic architecture and green spaces.',
    type: 'civic',
    category: 'energy',
    xpReward: 25,
    duration: 25,
    isCivic: true,
    location: { lat: 44.2253, lng: -76.4951, name: "Queen's University" },
    verificationMethod: 'location',
  },
  {
    questId: 'civic-006',
    title: 'Lake Ontario Waterfront Visit',
    description: 'Visit the beautiful Lake Ontario waterfront at Confederation Basin. Breathe fresh air and enjoy scenic views.',
    type: 'civic',
    category: 'energy',
    xpReward: 30,
    duration: 20,
    isCivic: true,
    location: { lat: 44.2279, lng: -76.4797, name: 'Confederation Basin' },
    verificationMethod: 'location',
  },
  {
    questId: 'civic-007',
    title: 'Support Your Local Library',
    description: 'Visit Kingston Frontenac Public Library. Read, study, or simply explore the resources available to Kingston residents.',
    type: 'civic',
    category: 'focus',
    xpReward: 35,
    duration: 30,
    isCivic: true,
    location: { lat: 44.2297, lng: -76.4817, name: 'Kingston Frontenac Public Library' },
    verificationMethod: 'location',
  },
  {
    questId: 'civic-008',
    title: 'Community Volunteer Hour',
    description: 'Log a volunteer hour at any Kingston community organization. Give back to your community and earn bonus XP.',
    type: 'civic',
    category: 'community',
    xpReward: 100,
    duration: 60,
    isCivic: true,
    verificationMethod: 'self_report',
  },
  {
    questId: 'civic-009',
    title: 'Kingston Transit Champion',
    description: 'Use Kingston Transit instead of driving. Reduce traffic, lower emissions, and support public transportation.',
    type: 'civic',
    category: 'community',
    xpReward: 25,
    duration: 30,
    isCivic: true,
    verificationMethod: 'self_report',
  },
  {
    questId: 'civic-010',
    title: 'City Park Mindfulness',
    description: 'Complete a 5-minute mindfulness meditation at City Park. Connect with nature in the heart of Kingston.',
    type: 'civic',
    category: 'energy',
    xpReward: 20,
    duration: 10,
    isCivic: true,
    location: { lat: 44.2332, lng: -76.4815, name: 'City Park' },
    verificationMethod: 'location',
  },
];

export const getCivicQuestById = (questId: string): CivicQuest | undefined =>
  KINGSTON_CIVIC_QUESTS.find(q => q.questId === questId);

export const getCivicQuestsByCategory = (category: string): CivicQuest[] =>
  KINGSTON_CIVIC_QUESTS.filter(q => q.category === category);

export const getLocationBasedQuests = (): CivicQuest[] =>
  KINGSTON_CIVIC_QUESTS.filter(q => q.verificationMethod === 'location');

// Landmark coordinates kept separately for map rendering and future quest expansion
export const KINGSTON_LANDMARKS: KingstonLocation[] = [
  { lat: 44.2312, lng: -76.4860, name: 'Kingston Public Market' },
  { lat: 44.2306, lng: -76.4819, name: 'Kingston City Hall' },
  { lat: 44.2253, lng: -76.4951, name: "Queen's University" },
  { lat: 44.2279, lng: -76.4797, name: 'Confederation Basin' },
  { lat: 44.2297, lng: -76.4817, name: 'Kingston Frontenac Public Library' },
  { lat: 44.2332, lng: -76.4815, name: 'City Park' },
  { lat: 44.2287, lng: -76.4802, name: 'Fort Henry' },
  { lat: 44.2348, lng: -76.5012, name: 'Kingston General Hospital' },
  { lat: 44.2271, lng: -76.4945, name: 'Memorial Centre' },
  { lat: 44.2245, lng: -76.4658, name: 'Cataraqui Centre' },
];
