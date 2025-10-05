import { ArrowDownCircle, ArrowUpCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/data/mockData';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownCircle className="h-5 w-5 text-success" />;
      case 'Withdrawal':
        return <ArrowUpCircle className="h-5 w-5 text-destructive" />;
      case 'Interest':
        return <TrendingUp className="h-5 w-5 text-secondary" />;
      default:
        return null;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'Deposit':
      case 'Interest':
        return 'text-success';
      case 'Withdrawal':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                {getIcon(transaction.type)}
                <div>
                  <p className="text-sm font-medium text-foreground">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.type}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-semibold ${getAmountColor(transaction.type)}`}>
                {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
