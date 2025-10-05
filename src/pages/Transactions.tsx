import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockTransactions, mockGroups } from '@/data/mockData';

const Transactions = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredTransactions =
    filter === 'all'
      ? mockTransactions
      : mockTransactions.filter((t) => t.type === filter);

  const getGroupName = (groupId: string) => {
    return mockGroups.find((g) => g.id === groupId)?.name || 'Unknown';
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Deposit':
        return (
          <Badge variant="default" className="bg-success hover:bg-success/90">
            Deposit
          </Badge>
        );
      case 'Withdrawal':
        return (
          <Badge variant="destructive">Withdrawal</Badge>
        );
      case 'Interest':
        return (
          <Badge variant="secondary">Interest</Badge>
        );
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="container space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and filter all your transaction history</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'Deposit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('Deposit')}
              >
                Deposits
              </Button>
              <Button
                variant={filter === 'Withdrawal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('Withdrawal')}
              >
                Withdrawals
              </Button>
              <Button
                variant={filter === 'Interest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('Interest')}
              >
                Interest
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getGroupName(transaction.groupId)}
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.amount > 0 ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}R
                    {Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
