import { useState } from 'react';
import { UserPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockGroups, stokvelTypes, contributionFrequencies } from '@/data/mockData';

const AddMemberButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('existing');
  const [selectedGroup, setSelectedGroup] = useState('');
  
  // Form data for existing stokvel
  const [memberForm, setMemberForm] = useState({
    name: '',
    accountNumber: '',
    email: '',
    phone: '',
  });

  // Form data for new stokvel
  const [newStokvelForm, setNewStokvelForm] = useState({
    name: '',
    type: '',
    goal: '',
    contributionAmount: '',
    contributionFrequency: 'monthly',
    description: '',
    maxMembers: '',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding member:', { ...memberForm, groupId: selectedGroup });
    setIsOpen(false);
    setMemberForm({ name: '', accountNumber: '', email: '', phone: '' });
    setSelectedGroup('');
  };

  const handleCreateStokvel = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating stokvel:', newStokvelForm);
    setIsOpen(false);
    setNewStokvelForm({
      name: '',
      type: '',
      goal: '',
      contributionAmount: '',
      contributionFrequency: 'monthly',
      description: '',
      maxMembers: '',
    });
  };

  const handleMemberFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberForm({
      ...memberForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewStokvelFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewStokvelForm({
      ...newStokvelForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewStokvelForm({
      ...newStokvelForm,
      [name]: value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Member OR Create New group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add to Stokvel</DialogTitle>
          <DialogDescription>
            Add a member to an existing stokvel or create a new stokvel group.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Add to Existing Stokvel</TabsTrigger>
            <TabsTrigger value="new">Create New Stokvel</TabsTrigger>
          </TabsList>

          {/* Add to Existing Stokvel Tab */}
          <TabsContent value="existing" className="space-y-4">
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stokvel">Select Stokvel</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a stokvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{group.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {group.members} members • R{group.totalSaved.toLocaleString()} saved
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={memberForm.name}
                    onChange={handleMemberFormChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={memberForm.phone}
                    onChange={handleMemberFormChange}
                    placeholder="+27 12 345 6789"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={memberForm.email}
                  onChange={handleMemberFormChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={memberForm.accountNumber}
                  onChange={handleMemberFormChange}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!selectedGroup}>
                  Add Member
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Create New Stokvel Tab */}
          <TabsContent value="new" className="space-y-4">
            <form onSubmit={handleCreateStokvel} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stokvelName">Stokvel Name</Label>
                  <Input
                    id="stokvelName"
                    name="name"
                    value={newStokvelForm.name}
                    onChange={handleNewStokvelFormChange}
                    placeholder="e.g., Family Savings Fund"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Stokvel Type</Label>
                  <Select
                    value={newStokvelForm.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {stokvelTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Savings Goal (R)</Label>
                  <Input
                    id="goal"
                    name="goal"
                    type="number"
                    value={newStokvelForm.goal}
                    onChange={handleNewStokvelFormChange}
                    placeholder="50000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input
                    id="maxMembers"
                    name="maxMembers"
                    type="number"
                    value={newStokvelForm.maxMembers}
                    onChange={handleNewStokvelFormChange}
                    placeholder="20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contributionAmount">Contribution Amount (R)</Label>
                  <Input
                    id="contributionAmount"
                    name="contributionAmount"
                    type="number"
                    value={newStokvelForm.contributionAmount}
                    onChange={handleNewStokvelFormChange}
                    placeholder="1000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
                  <Select
                    value={newStokvelForm.contributionFrequency}
                    onValueChange={(value) => handleSelectChange('contributionFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contributionFrequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={newStokvelForm.description}
                  onChange={handleNewStokvelFormChange}
                  placeholder="Describe the purpose of this stokvel..."
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Stokvel
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberButton;