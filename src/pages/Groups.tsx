import { Plus, Users as UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import AddMemberButton from '@/components/AddMemberButton';
import { mockGroups } from '@/data/mockData';

const Groups = () => {
  return (
    <div className="container space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Group Management</h1>
          <p className="text-muted-foreground">Manage your stokvel groups and members</p>
        </div>
        <AddMemberButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <div className="h-2 bg-gradient-primary" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    {group.members} members
                  </CardDescription>
                </div>
                <Badge variant="secondary">{group.interestRate}% APY</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings Goal</span>
                  <span className="font-semibold text-foreground">
                    R{group.totalSaved.toLocaleString()} / R{group.goal.toLocaleString()}
                  </span>
                </div>
                <Progress value={group.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {group.progress}% complete • Next payout:{' '}
                  {new Date(group.nextPayout).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/groups/${group.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Groups;
