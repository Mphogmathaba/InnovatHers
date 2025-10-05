import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SavingsLineChart = () => {
  // Mock data for line chart
  const monthlyData = [
    { month: 'Jan', amount: 25000 },
    { month: 'Feb', amount: 32000 },
    { month: 'Mar', amount: 41000 },
    { month: 'Apr', amount: 38000 },
    { month: 'May', amount: 52000 },
    { month: 'Jun', amount: 45000 },
    { month: 'Jul', amount: 52000 },
    { month: 'Aug', amount: 61000 },
    { month: 'Sep', amount: 73000 },
    { month: 'Oct', amount: 89000 },
  ];

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));
  const minAmount = Math.min(...monthlyData.map(d => d.amount));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Savings Growth Trend</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-border/50" />
              ))}
            </div>
            
            {/* Line chart */}
            <svg className="w-full h-48" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <path
                d={`M0,50 ${monthlyData.map((data, index) => {
                  const x = (index / (monthlyData.length - 1)) * 100;
                  const y = 50 - ((data.amount - minAmount) / (maxAmount - minAmount)) * 50;
                  return `L${x},${y}`;
                }).join(' ')} L100,50 Z`}
                fill="url(#lineGradient)"
              />
              
              {/* Line */}
              <path
                d={`M0,50 ${monthlyData.map((data, index) => {
                  const x = (index / (monthlyData.length - 1)) * 100;
                  const y = 50 - ((data.amount - minAmount) / (maxAmount - minAmount)) * 50;
                  return `L${x},${y}`;
                }).join(' ')}`}
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Data points */}
              {monthlyData.map((data, index) => {
                const x = (index / (monthlyData.length - 1)) * 100;
                const y = 50 - ((data.amount - minAmount) / (maxAmount - minAmount)) * 50;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#3b82f6"
                    className="hover:r-4 transition-all"
                  />
                );
              })}
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
            {monthlyData.filter((_, i) => i % 2 === 0).map((data, i) => (
              <span key={i}>{data.month}</span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">R89k</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">+256%</div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">R25k</div>
            <div className="text-xs text-muted-foreground">Starting</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsLineChart;