import { useState } from 'react';
import { Plus, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { mockPayoutRequests, mockGroups } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PayoutRequests = () => {
  const [requests, setRequests] = useState(mockPayoutRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    groupId: '',
    amount: '',
    reason: '',
  });

  const handleVote = (requestId: string, vote: 'approve' | 'reject') => {
    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          const newVotes = [
            ...req.votes,
            { userId: 'current-user', userName: 'You', vote },
          ];
          const approvalCount = newVotes.filter((v) => v.vote === 'approve').length;
          const approvalPercentage = (approvalCount / req.votesRequired) * 100;
          
          return {
            ...req,
            votes: newVotes,
            status: approvalPercentage >= 70 ? 'approved' : req.status,
          };
        }
        return req;
      })
    );
  };

  const handleCreateRequest = () => {
    if (newRequest.groupId && newRequest.amount && newRequest.reason) {
      const request = {
        id: String(requests.length + 1),
        groupId: newRequest.groupId,
        requestedBy: 'You',
        amount: parseFloat(newRequest.amount),
        reason: newRequest.reason,
        status: 'pending' as const,
        votes: [],
        votesRequired: 5,
        createdAt: new Date().toISOString(),
      };
      setRequests([request, ...requests]);
      setNewRequest({ groupId: '', amount: '', reason: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payout Requests</h1>
          <p className="text-muted-foreground">Vote on payout requests from group members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4" />
              Request Payout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Payout</DialogTitle>
              <DialogDescription>
                Submit a payout request for group approval
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                <Select value={newRequest.groupId} onValueChange={(value) => 
                  setNewRequest({ ...newRequest, groupId: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (R)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="5000"
                  value={newRequest.amount}
                  onChange={(e) => setNewRequest({ ...newRequest, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you need this payout..."
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateRequest} className="w-full bg-gradient-primary hover:opacity-90">
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => {
          const group = mockGroups.find((g) => g.id === request.groupId);
          const approvalCount = request.votes.filter((v) => v.vote === 'approve').length;
          const approvalPercentage = (approvalCount / request.votesRequired) * 100;
          const hasVoted = request.votes.some((v) => v.userName === 'You');

          return (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>R{request.amount.toLocaleString()} Payout Request</span>
                      <Badge
                        variant={
                          request.status === 'approved'
                            ? 'default'
                            : request.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {request.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Requested by {request.requestedBy} • {group?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                  <p className="text-foreground">{request.reason}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Approval Progress</span>
                    <span className="font-semibold text-foreground">
                      {approvalCount} / {request.votesRequired} votes (70% required)
                    </span>
                  </div>
                  <Progress value={approvalPercentage} className="h-2" />
                </div>

                {request.votes.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Votes</p>
                    <div className="flex flex-wrap gap-2">
                      {request.votes.map((vote, idx) => (
                        <Badge
                          key={idx}
                          variant={vote.vote === 'approve' ? 'default' : 'destructive'}
                        >
                          {vote.userName}: {vote.vote}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {request.status === 'pending' && !hasVoted && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1 gap-2 bg-gradient-primary hover:opacity-90"
                      onClick={() => handleVote(request.id, 'approve')}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 gap-2"
                      onClick={() => handleVote(request.id, 'reject')}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}

                {request.status === 'approved' && (
                  <div className="rounded-lg bg-success/10 p-3 text-center">
                    <p className="font-semibold text-success">
                      ✅ Payout Approved! Funds will be transferred shortly.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PayoutRequests;
