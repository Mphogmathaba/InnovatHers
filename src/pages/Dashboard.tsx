import { UserPlus, ArrowUpCircle, Bell, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GroupCard from '@/components/GroupCard';
import BankStatus from '@/components/BankStatus';
import RecentTransactions from '@/components/RecentTransactions';
import ActivityFeed from '@/components/ActivityFeed';
import SavingsLineChart from '@/components/SavingsLineChart';
import ContributionPieChart from '@/components/ContributionPieChart';
import AddMemberButton from '@/components/AddMemberButton';
import ReminderButton from '@/components/ReminderButton';
import FinanceChatbot from '@/components/FinanceChatbot';
import { mockGroups, mockTransactions, mockBankAccount, mockActivities } from '@/data/mockData';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container space-y-6 px-4 py-8">
        {/* Mission Statement Section */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 text-center border">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Bot className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Smart Stokvels for Modern Communities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Transforming traditional savings circles into <span className="font-semibold text-primary">AI-powered, transparent, and accessible</span> digital platforms. 
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Real-time transparency
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              AI financial guidance
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              Digital collaboration
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              Smart savings tools
            </div>
          </div>
        </div>

        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, Thabo! Here's your stokvel overview. Total savings: <span className="font-semibold text-primary">R129,400</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AddMemberButton />
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowUpCircle className="h-4 w-4" />
              Request Payout
            </Button>
            <ReminderButton />
            
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                <p className="text-2xl font-bold text-foreground">{mockGroups.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">+1 this month</p>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockGroups.reduce((sum, group) => sum + group.members, 0)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across all groups</p>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold text-foreground">+12.5%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <ArrowUpCircle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">From last month</p>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Payout</p>
                <p className="text-2xl font-bold text-foreground">Oct 20</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Community Education</p>
          </div>
        </div>

        {/* Group Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Your Stokvel Groups</h2>
            <Button variant="outline" size="sm">
              View All Groups
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Financial Insights</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <SavingsLineChart />
            <ContributionPieChart groups={mockGroups} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Recent Transactions</h2>
              <Button variant="outline" size="sm">
                View All Transactions
              </Button>
            </div>
            <RecentTransactions transactions={mockTransactions} />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <BankStatus account={mockBankAccount} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
              <ActivityFeed activities={mockActivities} />
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <UserPlus className="h-5 w-5" />
              <span className="text-xs">Add Member</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <ArrowUpCircle className="h-5 w-5" />
              <span className="text-xs">Quick Payout</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Set Reminder</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">Get Advice</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Chatbot - Fixed Position */}
      <FinanceChatbot />
    </div>
  );
};

export default Dashboard;