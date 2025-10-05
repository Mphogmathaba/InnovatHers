import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, Calendar, Share2, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockGroups, mockTransactions, mockChatMessages } from '@/data/mockData';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const GroupDetail = () => {
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === id);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(mockChatMessages.filter((m) => m.groupId === id));

  if (!group) {
    return (
      <div className="container py-8">
        <p className="text-center text-muted-foreground">Group not found</p>
      </div>
    );
  }

  const groupTransactions = mockTransactions.filter((t) => 
    t.name.includes(group.name.split(' ')[0]) || t.groupId === id
  );

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        groupId: id || '1',
        user: 'You',
        message: chatInput,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setChatInput('');
    }
  };

  const handleInvite = () => {
    const inviteLink = `${window.location.origin}/join/${group.id}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  return (
    <div className="container space-y-6 px-4 py-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/groups">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{group.name}</h1>
          <p className="text-muted-foreground">Linked to Bank Account: ****{Math.floor(Math.random() * 10000)}</p>
        </div>
        <Button onClick={handleInvite} className="gap-2 bg-gradient-primary hover:opacity-90">
          <Share2 className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">R{group.totalSaved.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">of R{group.goal.toLocaleString()} goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{group.interestRate}% APY</p>
            <p className="text-xs text-muted-foreground">Fixed rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{group.members}</p>
            <p className="text-xs text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={group.progress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{group.progress}% Complete</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Next payout: {new Date(group.nextPayout).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Goal</p>
                  <p className="text-lg font-semibold text-foreground">
                    Save R{group.goal.toLocaleString()} by December
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interest Type</p>
                  <Badge variant="secondary">Fixed Rate</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-success">
                  R{Math.round(group.totalSaved * (group.interestRate / 100))} interest earned so far
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupTransactions.length > 0 ? (
                  groupTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'Deposit' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'Deposit' ? '+' : '-'}R{transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant={transaction.type === 'Deposit' ? 'default' : 'destructive'}>
                      {transaction.type}
                    </Badge>
                  </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No transactions yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Group Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[400px] space-y-4 overflow-y-auto rounded-lg border border-border p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.user === 'You' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <p className="text-xs font-medium text-muted-foreground">{msg.user}</p>
                      <div
                        className={`mt-1 max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.user === 'You'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-gradient-primary hover:opacity-90">
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupDetail;
