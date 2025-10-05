import { Users, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Group } from '@/data/mockData';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-glow">
      <div className="h-2 bg-gradient-primary" />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between">
          <span className="text-lg">{group.name}</span>
          <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
            {group.interestRate}% APY
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{group.progress}%</span>
          </div>
          <Progress value={group.progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saved</span>
            <span className="font-semibold text-foreground">
              R{group.totalSaved.toLocaleString()} / R{group.goal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{group.members} members</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Next: {new Date(group.nextPayout).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-success/10 p-2 text-sm">
          <TrendingUp className="h-4 w-4 text-success" />
          <span className="text-success">
            R{Math.round(group.totalSaved * (group.interestRate / 100))} interest earned
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
