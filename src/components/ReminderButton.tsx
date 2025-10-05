import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ReminderButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState('weekly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reminder setting here
    console.log('Setting reminder frequency:', reminderFrequency);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Bell className="h-4 w-4" />
          Send Reminder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Reminder Frequency</DialogTitle>
          <DialogDescription>
            Choose how often you want to receive reminders about contributions and payouts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup
            value={reminderFrequency}
            onValueChange={setReminderFrequency}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly" className="flex flex-col">
                <span className="font-medium">Hourly</span>
                <span className="text-sm text-muted-foreground">
                  Get reminders every hour for urgent matters
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="flex flex-col">
                <span className="font-medium">Daily</span>
                <span className="text-sm text-muted-foreground">
                  Daily summary of contributions and activities
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="flex flex-col">
                <span className="font-medium">Weekly</span>
                <span className="text-sm text-muted-foreground">
                  Weekly overview and upcoming payout reminders
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="flex flex-col">
                <span className="font-medium">Monthly</span>
                <span className="text-sm text-muted-foreground">
                  Monthly progress reports and interest statements
                </span>
              </Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Set Reminder</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderButton;