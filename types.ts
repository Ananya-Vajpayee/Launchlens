export type Role = 'CREATOR' | 'TESTER' | 'ADMIN';

export enum Niche {
  SAAS = 'SaaS Landing Page',
  MOBILE_APP = 'Mobile App',
  GAME = 'Indie Game',
  DIGITAL = 'Digital Product',
  ECOMMERCE = 'E-commerce Store'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  
  // Tester specific
  tier?: 'Bronze' | 'Silver' | 'Gold';
  credits?: number;
  interests?: Niche[];
  completedTests?: number;
  
  // Creator specific
  companyName?: string;
}

export interface TestCriteria {
  label: string;
  type: 'rating' | 'boolean';
}

export interface Test {
  id: string;
  creatorId: string;
  title: string;
  niche: Niche;
  productUrl: string;
  description: string;
  instructions: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  packageSize: 10 | 20 | 50;
  price: number;
  createdAt: string;
  targetAudience?: {
    minAge?: number;
    maxAge?: number;
    gender?: string;
  };
  applicantCount: number;
  completedCount: number;
}

export interface TestResult {
  id: string;
  testId: string;
  testerId: string;
  testerName: string;
  submittedAt: string;
  ratings: Record<string, number | boolean>; // Key is criteria label
  feedback: string;
  videoUrl?: string; // Simulated
  qualityScore: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role: Role) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => void;
}
