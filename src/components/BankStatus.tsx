import { Building2, CheckCircle2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BankAccount } from '@/data/mockData';

interface BankStatusProps {
  account: BankAccount;
}

const BankStatus = ({ account }: BankStatusProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Bank Integration
          </span>
          <Badge
            variant={account.status === 'connected' ? 'default' : 'secondary'}
            className="gap-1"
          >
            <CheckCircle2 className="h-3 w-3" />
            {account.status === 'connected' ? 'Connected' : 'Pending'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Account</span>
            <span className="text-sm font-medium text-foreground">
              {account.accountName} {account.accountNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Balance</span>
            <span className="text-xl font-bold text-foreground">
              R{account.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Last synced</span>
            <span className="text-xs text-muted-foreground">{account.lastSync}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default BankStatus;
