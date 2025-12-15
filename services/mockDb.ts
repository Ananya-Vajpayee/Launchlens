import { User, Test, TestResult, Niche } from '../types';

// Initial Seed Data
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    email: 'creator@demo.com',
    name: 'Alice Creator',
    role: 'CREATOR',
    companyName: 'NextGen SaaS',
  },
  {
    id: 'u2',
    email: 'tester@demo.com',
    name: 'Bob Tester',
    role: 'TESTER',
    tier: 'Silver',
    credits: 450,
    interests: [Niche.SAAS, Niche.MOBILE_APP],
    completedTests: 12
  }
];

const MOCK_TESTS: Test[] = [
  {
    id: 't1',
    creatorId: 'u1',
    title: 'Landing Page Conversion Test',
    niche: Niche.SAAS,
    productUrl: 'https://example.com/saas',
    description: 'We need feedback on our new pricing page layout. Is the value prop clear?',
    instructions: '1. Browse the homepage. 2. Navigate to pricing. 3. Try to find the "Enterprise" plan details.',
    status: 'ACTIVE',
    packageSize: 10,
    price: 79,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    applicantCount: 4,
    completedCount: 2
  },
  {
    id: 't2',
    creatorId: 'u1',
    title: 'Mobile App Beta',
    niche: Niche.MOBILE_APP,
    productUrl: 'https://testflight.apple.com/join/xyz',
    description: 'Beta test for our new fitness tracking app.',
    instructions: 'Install the app, complete onboarding, and log one workout.',
    status: 'COMPLETED',
    packageSize: 20,
    price: 149,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    applicantCount: 20,
    completedCount: 20
  }
];

const MOCK_RESULTS: TestResult[] = [
  {
    id: 'r1',
    testId: 't1',
    testerId: 'u2',
    testerName: 'Bob Tester',
    submittedAt: new Date().toISOString(),
    ratings: {
      'Value Proposition Clarity': 8,
      'Call-to-Action Effectiveness': 7,
      'Trust & Credibility': 9,
      'Pricing Clarity': 6,
      'Would you sign up?': true
    },
    feedback: 'The pricing table is a bit confusing on mobile, but otherwise looks great.',
    qualityScore: 90
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDB {
  private users: User[] = [...MOCK_USERS];
  private tests: Test[] = [...MOCK_TESTS];
  private results: TestResult[] = [...MOCK_RESULTS];

  async login(email: string): Promise<User | undefined> {
    await delay(500);
    return this.users.find(u => u.email === email);
  }

  async register(user: Partial<User>): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: user.email!,
      name: user.name!,
      role: user.role!,
      credits: user.role === 'TESTER' ? 0 : undefined,
      tier: user.role === 'TESTER' ? 'Bronze' : undefined,
      interests: user.interests || [],
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }
  
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(600);
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  async getTestsForCreator(creatorId: string): Promise<Test[]> {
    await delay(500);
    return this.tests.filter(t => t.creatorId === creatorId);
  }

  async getAvailableTestsForTester(testerId: string): Promise<Test[]> {
    await delay(500);
    const user = this.users.find(u => u.id === testerId);
    if (!user || !user.interests) return [];
    
    // Filter active tests matching interests
    return this.tests.filter(t => 
      t.status === 'ACTIVE' && 
      user.interests?.includes(t.niche) &&
      !this.results.some(r => r.testId === t.id && r.testerId === testerId) // Not already taken
    );
  }

  async getTestById(id: string): Promise<Test | undefined> {
    await delay(300);
    return this.tests.find(t => t.id === id);
  }

  async createTest(test: Omit<Test, 'id' | 'createdAt' | 'applicantCount' | 'completedCount' | 'status'>): Promise<Test> {
    await delay(800);
    const newTest: Test = {
      ...test,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      applicantCount: 0,
      completedCount: 0,
      status: 'ACTIVE'
    };
    this.tests.unshift(newTest);
    return newTest;
  }

  async submitTestResult(result: Omit<TestResult, 'id' | 'submittedAt' | 'qualityScore'>): Promise<TestResult> {
    await delay(1000);
    const newResult: TestResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      qualityScore: Math.floor(Math.random() * 20) + 80 // Random score 80-100
    };
    this.results.push(newResult);
    
    // Update test counts
    const testIndex = this.tests.findIndex(t => t.id === result.testId);
    if (testIndex >= 0) {
      this.tests[testIndex].completedCount += 1;
      this.tests[testIndex].applicantCount += 1;
    }

    // Add credits to tester
    const testerIndex = this.users.findIndex(u => u.id === result.testerId);
    if (testerIndex >= 0) {
      this.users[testerIndex].credits = (this.users[testerIndex].credits || 0) + 25;
      this.users[testerIndex].completedTests = (this.users[testerIndex].completedTests || 0) + 1;
    }

    return newResult;
  }

  async getResultsForTest(testId: string): Promise<TestResult[]> {
    await delay(500);
    return this.results.filter(r => r.testId === testId);
  }
}

export const db = new MockDB();