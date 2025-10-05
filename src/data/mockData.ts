export interface Group {
  id: string;
  name: string;
  goal: number;
  totalSaved: number;
  members: number;
  interestRate: number;
  nextPayout: string;
  progress: number;
  type: 'family' | 'business' | 'community' | 'education' | 'other';
  description?: string;
  adminId: string;
  createdAt: string;
  maxMembers?: number;
  contributionAmount: number;
  contributionFrequency: 'weekly' | 'monthly' | 'quarterly';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Transaction {
  id: string;
  date: string;
  name: string;
  amount: number;
  type: 'Deposit' | 'Withdrawal' | 'Interest';
  groupId: string;
}

export interface BankAccount {
  accountName: string;
  accountNumber: string;
  balance: number;
  status: 'connected' | 'pending' | 'disconnected';
  lastSync: string;
}

export interface Activity {
  id: string;
  type: 'contribution' | 'payout' | 'member_joined' | 'member_left' | 'group_created';
  user: string;
  amount?: number;
  timestamp: string;
  groupName: string;
}

export interface ChatMessage {
  id: string;
  groupId: string;
  user: string;
  message: string;
  timestamp: string;
}

export interface PayoutRequest {
  id: string;
  groupId: string;
  requestedBy: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  votes: {
    userId: string;
    userName: string;
    vote: 'approve' | 'reject';
  }[];
  votesRequired: number;
  createdAt: string;
}

export interface GroupRules {
  groupId: string;
  minContribution: number;
  approvalThreshold: number;
  withdrawalConditions: string;
  interestType: 'fixed' | 'variable';
  adminId: string;
}

// Updated mock groups with more details
export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Family Emergency Fund',
    goal: 50000,
    totalSaved: 32500,
    members: 8,
    interestRate: 4.5,
    nextPayout: '2025-11-15',
    progress: 65,
    type: 'family',
    description: 'Emergency savings for family medical expenses and urgent needs',
    adminId: 'user1',
    createdAt: '2024-01-15',
    maxMembers: 12,
    contributionAmount: 1000,
    contributionFrequency: 'monthly'
  },
  {
    id: '2',
    name: 'Small Business Growth',
    goal: 100000,
    totalSaved: 78000,
    members: 12,
    interestRate: 5.2,
    nextPayout: '2025-12-01',
    progress: 78,
    type: 'business',
    description: 'Investment pool for small business expansion and equipment',
    adminId: 'user2',
    createdAt: '2024-02-01',
    maxMembers: 15,
    contributionAmount: 2000,
    contributionFrequency: 'monthly'
  },
  {
    id: '3',
    name: 'Community Education',
    goal: 30000,
    totalSaved: 18900,
    members: 15,
    interestRate: 3.8,
    nextPayout: '2025-10-20',
    progress: 63,
    type: 'education',
    description: 'Funding for community education programs and school fees',
    adminId: 'user3',
    createdAt: '2024-03-10',
    maxMembers: 20,
    contributionAmount: 500,
    contributionFrequency: 'monthly'
  },
  {
    id: '4',
    name: 'Holiday Savings',
    goal: 20000,
    totalSaved: 12500,
    members: 6,
    interestRate: 3.5,
    nextPayout: '2025-12-10',
    progress: 62.5,
    type: 'other',
    description: 'Year-end holiday celebration fund',
    adminId: 'user1',
    createdAt: '2024-04-05',
    maxMembers: 10,
    contributionAmount: 800,
    contributionFrequency: 'monthly'
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Thabo Mokoena',
    email: 'thabo.mokoena@email.com',
    phone: '+27 72 123 4567',
    accountNumber: '****1234',
    joinedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 'user2',
    name: 'Zanele Dlamini',
    email: 'zanele.dlamini@email.com',
    phone: '+27 83 234 5678',
    accountNumber: '****5678',
    joinedDate: '2024-02-01',
    status: 'active'
  },
  {
    id: 'user3',
    name: 'Sipho Ndlovu',
    email: 'sipho.ndlovu@email.com',
    phone: '+27 71 345 6789',
    accountNumber: '****9012',
    joinedDate: '2024-01-20',
    status: 'active'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2025-10-04',
    name: 'Thabo Mokoena',
    amount: 500,
    type: 'Deposit',
    groupId: '1',
  },
  {
    id: 't2',
    date: '2025-10-03',
    name: 'Zanele Dlamini',
    amount: 750,
    type: 'Deposit',
    groupId: '2',
  },
  {
    id: 't3',
    date: '2025-10-02',
    name: 'Sipho Ndlovu',
    amount: -2000,
    type: 'Withdrawal',
    groupId: '1',
  },
  {
    id: 't4',
    date: '2025-10-01',
    name: 'Interest Earned',
    amount: 125,
    type: 'Interest',
    groupId: '2',
  },
  {
    id: 't5',
    date: '2025-09-30',
    name: 'Nomsa Khumalo',
    amount: 600,
    type: 'Deposit',
    groupId: '3',
  },
  {
    id: 't6',
    date: '2025-09-29',
    name: 'Mandla Sithole',
    amount: 800,
    type: 'Deposit',
    groupId: '1',
  },
];

export const mockBankAccount: BankAccount = {
  accountName: 'Standard Bank',
  accountNumber: '****4521',
  balance: 129400,
  status: 'connected',
  lastSync: '2025-10-05 09:30',
};

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    type: 'contribution',
    user: 'Thabo Mokoena',
    groupName: 'Family Emergency Fund',
    amount: 500,
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'contribution',
    user: 'Zanele Dlamini',
    groupName: 'Small Business Growth',
    amount: 750,
    timestamp: '5 hours ago',
  },
  {
    id: 'a3',
    type: 'payout',
    user: 'Sipho Ndlovu',
    groupName: 'Family Emergency Fund',
    amount: 2000,
    timestamp: '1 day ago',
  },
  {
    id: 'a4',
    type: 'member_joined',
    user: 'Lerato Mthembu',
    groupName: 'Community Education',
    timestamp: '2 days ago',
  },
  {
    id: 'a5',
    type: 'group_created',
    user: 'Thabo Mokoena',
    groupName: 'Holiday Savings',
    timestamp: '3 days ago',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    groupId: '1',
    user: 'Thabo Mokoena',
    message: 'Hey everyone! Just made my contribution for this month.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '2',
    groupId: '1',
    user: 'Sipho Ndlovu',
    message: 'Great! We\'re almost at our goal!',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: '3',
    groupId: '1',
    user: 'Nomsa Khumalo',
    message: 'Can we discuss the next payout priority at our meeting?',
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
];

export const mockPayoutRequests: PayoutRequest[] = [
  {
    id: '1',
    groupId: '1',
    requestedBy: 'Thabo Mokoena',
    amount: 5000,
    reason: 'Emergency medical expenses',
    status: 'pending',
    votes: [
      { userId: '1', userName: 'Sipho Ndlovu', vote: 'approve' },
      { userId: '2', userName: 'Nomsa Khumalo', vote: 'approve' },
    ],
    votesRequired: 5,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    groupId: '2',
    requestedBy: 'Zanele Dlamini',
    amount: 3000,
    reason: 'Business inventory purchase',
    status: 'approved',
    votes: [
      { userId: '3', userName: 'John Smith', vote: 'approve' },
      { userId: '4', userName: 'Sarah Jones', vote: 'approve' },
      { userId: '5', userName: 'Mike Brown', vote: 'approve' },
    ],
    votesRequired: 3,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockGroupRules: GroupRules[] = [
  {
    groupId: '1',
    minContribution: 500,
    approvalThreshold: 70,
    withdrawalConditions: 'Emergency or planned group goal achievement',
    interestType: 'fixed',
    adminId: '1',
  },
  {
    groupId: '2',
    minContribution: 1000,
    approvalThreshold: 60,
    withdrawalConditions: 'Business expenses or approved community projects',
    interestType: 'variable',
    adminId: '2',
  },
];

export const southAfricanLanguages = [
  'English',
  'Afrikaans',
  'isiZulu',
  'isiXhosa',
  'Sesotho',
  'Setswana',
  'Sepedi',
  'Xitsonga',
  'siSwati',
  'Tshivenda',
  'isiNdebele',
];

// New stokvel types for dropdown
export const stokvelTypes = [
  { value: 'family', label: 'Family Fund' },
  { value: 'business', label: 'Business Growth' },
  { value: 'community', label: 'Community Project' },
  { value: 'education', label: 'Education Fund' },
  { value: 'other', label: 'Other' },
];

export const contributionFrequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];