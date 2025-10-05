import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockGroups, mockTransactions } from '@/data/mockData';

const Insights = () => {
  const totalSaved = mockGroups.reduce((sum, group) => sum + group.totalSaved, 0);
  const totalGoals = mockGroups.length;
  const achievedGoals = mockGroups.filter((g) => g.progress === 100).length;
  const totalMembers = mockGroups.reduce((sum, group) => sum + group.members, 0);
  const thisMonthContributions = mockTransactions
    .filter(
      (t) =>
        t.type === 'Deposit' &&
        new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const topContributors = [
    { name: 'Thabo Mokoena', amount: 15000, consistency: 98 },
    { name: 'Sipho Ndlovu', amount: 12500, consistency: 95 },
    { name: 'Nomsa Khumalo', amount: 11000, consistency: 92 },
  ];

  return (
    <div className="container space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Insights & Impact</h1>
        <p className="text-muted-foreground">Track your collective success and impact</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Saved
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R{totalSaved.toLocaleString()}
            </div>
            <p className="text-xs text-success">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Members
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">Across {totalGoals} groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goals Achieved
            </CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {achievedGoals} / {totalGoals}
            </div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R{thisMonthContributions.toLocaleString()}
            </div>
            <p className="text-xs text-success">Strong performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Impact Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gradient-primary/10 p-4">
            <p className="text-lg font-semibold text-foreground">
              🎉 Your stokvel has funded {achievedGoals * 3} goals so far!
            </p>
            <p className="text-sm text-muted-foreground">
              From education expenses to business investments, your collective efforts are making a
              real difference.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <p className="text-sm text-muted-foreground">Fastest Payout Approved</p>
              <p className="text-2xl font-bold text-success">5 minutes</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-sm text-muted-foreground">Average Interest Earned</p>
              <p className="text-2xl font-bold text-primary">8.5%</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-sm text-muted-foreground">Member Satisfaction</p>
              <p className="text-2xl font-bold text-secondary">96%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topContributors.map((contributor, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contributor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        R{contributor.amount.toLocaleString()} contributed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">{contributor.consistency}%</p>
                    <p className="text-xs text-muted-foreground">consistency</p>
                  </div>
                </div>
                <Progress value={contributor.consistency} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['January', 'February', 'March', 'April'].map((month, idx) => (
              <div key={month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{month}</span>
                  <span className="font-semibold text-foreground">
                    R{((idx + 1) * 8500).toLocaleString()}
                  </span>
                </div>
                <Progress value={65 + idx * 10} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
