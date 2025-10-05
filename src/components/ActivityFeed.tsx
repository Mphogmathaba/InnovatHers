import { DollarSign, UserPlus, ArrowUpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/data/mockData';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <DollarSign className="h-4 w-4 text-success" />;
      case 'payout':
        return <ArrowUpCircle className="h-4 w-4 text-primary" />;
      case 'member_joined':
        return <UserPlus className="h-4 w-4 text-secondary" />;
      default:
        return null;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'contribution':
        return (
          <>
            <span className="font-semibold text-foreground">{activity.user}</span> contributed{' '}
            <span className="font-semibold text-success">R{activity.amount}</span> to{' '}
            <span className="text-foreground">{activity.groupName}</span>
          </>
        );
      case 'payout':
        return (
          <>
            <span className="font-semibold text-foreground">{activity.user}</span> requested payout of{' '}
            <span className="font-semibold text-primary">R{activity.amount}</span> from{' '}
            <span className="text-foreground">{activity.groupName}</span>
          </>
        );
      case 'member_joined':
        return (
          <>
            <span className="font-semibold text-foreground">{activity.user}</span> joined{' '}
            <span className="text-foreground">{activity.groupName}</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-muted-foreground">{getActivityText(activity)}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
