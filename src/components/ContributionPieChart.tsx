import { PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/data/mockData';

interface ContributionPieChartProps {
  groups: Group[];
}

const ContributionPieChart = ({ groups }: ContributionPieChartProps) => {
  const totalSaved = groups.reduce((sum, group) => sum + group.totalSaved, 0);
  
  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'];
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Savings Distribution</CardTitle>
        <PieChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative h-48 w-48">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              {groups.map((group, index) => {
                const percentage = (group.totalSaved / totalSaved) * 100;
                const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                const rotation = accumulatedPercentage * 3.6;
                
                accumulatedPercentage += percentage;

                return (
                  <circle
                    key={group.id}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={colors[index]}
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    transform={`rotate(${rotation - 90} 50 50)`}
                    className="transition-all duration-500 hover:opacity-80"
                  />
                );
              })}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy="0.3em"
                className="text-2xl font-bold fill-foreground"
              >
                {((groups[0].totalSaved / totalSaved) * 100).toFixed(0)}%
              </text>
            </svg>
          </div>
          
          <div className="flex-1 space-y-3 pl-6">
            {groups.map((group, index) => (
              <div key={group.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-sm font-medium">{group.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {((group.totalSaved / totalSaved) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    R{group.totalSaved.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-between rounded-lg bg-muted p-4 text-sm">
          <span className="font-medium">Total Collective Savings</span>
          <span className="font-bold text-primary">
            R{totalSaved.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionPieChart;