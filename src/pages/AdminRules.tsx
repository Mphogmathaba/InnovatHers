import { useState } from 'react';
import { Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockGroupRules, mockGroups } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const AdminRules = () => {
  const [selectedGroupId, setSelectedGroupId] = useState('1');
  const groupRules = mockGroupRules.find((r) => r.groupId === selectedGroupId);
  const { toast } = useToast();

  const [rules, setRules] = useState({
    minContribution: groupRules?.minContribution || 500,
    approvalThreshold: groupRules?.approvalThreshold || 70,
    withdrawalConditions: groupRules?.withdrawalConditions || '',
    interestType: groupRules?.interestType || 'fixed',
  });

  const handleSave = () => {
    toast({
      title: 'Rules Updated',
      description: 'Group rules have been successfully updated.',
    });
  };

  return (
    <div className="container space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
            <Shield className="h-8 w-8 text-primary" />
            Admin Rules & Settings
          </h1>
          <p className="text-muted-foreground">Manage group rules and policies</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Group</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contribution Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minContribution">Minimum Contribution (R)</Label>
              <Input
                id="minContribution"
                type="number"
                value={rules.minContribution}
                onChange={(e) =>
                  setRules({ ...rules, minContribution: parseInt(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                The minimum amount members must contribute per period
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestType">Interest Type</Label>
              <Select
                value={rules.interestType}
                onValueChange={(value: 'fixed' | 'variable') =>
                  setRules({ ...rules, interestType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Rate</SelectItem>
                  <SelectItem value="variable">Variable Rate</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How interest is calculated on group savings
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="approvalThreshold">Approval Threshold (%)</Label>
              <Input
                id="approvalThreshold"
                type="number"
                min="50"
                max="100"
                value={rules.approvalThreshold}
                onChange={(e) =>
                  setRules({ ...rules, approvalThreshold: parseInt(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                Percentage of votes required to approve a payout (50-100%)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawalConditions">Withdrawal Conditions</Label>
              <Textarea
                id="withdrawalConditions"
                value={rules.withdrawalConditions}
                onChange={(e) =>
                  setRules({ ...rules, withdrawalConditions: e.target.value })
                }
                placeholder="Describe the conditions under which withdrawals are allowed..."
              />
              <p className="text-xs text-muted-foreground">
                Define when and why members can request payouts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Rules Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Minimum Contribution</span>
            <span className="font-semibold text-foreground">
              R{rules.minContribution.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Approval Threshold</span>
            <span className="font-semibold text-foreground">{rules.approvalThreshold}%</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Interest Type</span>
            <span className="font-semibold text-foreground capitalize">
              {rules.interestType}
            </span>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <span className="text-muted-foreground">Withdrawal Conditions</span>
            <span className="text-sm text-foreground">{rules.withdrawalConditions}</span>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full gap-2 bg-gradient-primary hover:opacity-90">
        <Save className="h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );
};

export default AdminRules;
