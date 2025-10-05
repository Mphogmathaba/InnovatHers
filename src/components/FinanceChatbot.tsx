import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, User, Send, Lightbulb, TrendingUp, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'advice' | 'tip' | 'warning' | 'info';
}

const FinanceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm StokAId, your financial assistant. I can help with savings tips, spending advice, and stokvel management. What would you like to know?",
      role: 'assistant',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "How can I save more?",
    "Best way to manage stokvel funds?",
    "Emergency fund tips",
    "Investment advice for groups",
    "How to avoid overspending?"
  ];

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Savings and budgeting advice
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return {
        id: Date.now().toString(),
        content: "💡 **Smart Saving Strategies:**\n\n• **20% Rule**: Aim to save 20% of your stokvel contributions for long-term goals\n• **Round-Up**: Round up your contributions (e.g., R1,050 instead of R1,000)\n• **Windfall Strategy**: Put unexpected money (bonuses, tax returns) directly into savings\n• **Automate**: Set up automatic transfers to your stokvel on payday\n\n*Remember: Consistent small amounts grow faster than occasional large contributions!*",
        role: 'assistant',
        timestamp: new Date(),
        type: 'tip'
      };
    }

    // Stokvel management
    if (lowerMessage.includes('stokvel') || lowerMessage.includes('manage') || lowerMessage.includes('group')) {
      return {
        id: Date.now().toString(),
        content: "👥 **Stokvel Management Best Practices:**\n\n• **Clear Rules**: Establish contribution deadlines and consequences for late payments\n• **Transparency**: Use our dashboard to track all transactions in real-time\n• **Emergency Fund**: Keep 10-15% of total funds accessible for emergencies\n• **Regular Meetings**: Schedule monthly check-ins using our reminder system\n• **Diversify**: Consider splitting funds between short-term needs and longer-term investments\n\n*Pro tip: Use our voting system for major financial decisions to maintain trust!*",
        role: 'assistant',
        timestamp: new Date(),
        type: 'advice'
      };
    }

    // Emergency funds
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return {
        id: Date.now().toString(),
        content: "🛡️ **Emergency Fund Guidance:**\n\n• **3-6 Month Rule**: Aim for 3-6 months of essential expenses in your emergency fund\n• **Separate Account**: Keep emergency funds in a separate, accessible account\n• **Tiered Approach**: \n  - Level 1: Immediate cash for small emergencies\n  - Level 2: Short-term savings for larger unexpected costs\n  - Level 3: Insurance for major catastrophes\n\n*Remember: Emergency funds are for true emergencies, not opportunities!*",
        role: 'assistant',
        timestamp: new Date(),
        type: 'warning'
      };
    }

    // Investment advice
    if (lowerMessage.includes('invest') || lowerMessage.includes('grow') || lowerMessage.includes('return')) {
      return {
        id: Date.now().toString(),
        content: "📈 **Smart Investment Tips for Groups:**\n\n• **Start Small**: Consider low-risk options like fixed deposits or money market accounts\n• **Diversify**: Don't put all your eggs in one basket\n• **Time Horizon**: Match investments with your stokvel's goals:\n  - Short-term (1-2 years): Savings accounts\n  - Medium-term (3-5 years): Bonds\n  - Long-term (5+ years): Consider unit trusts\n• **Get Professional Advice**: For larger amounts, consult a financial advisor\n\n*Compound interest is the 8th wonder of the world - use it wisely!*",
        role: 'assistant',
        timestamp: new Date(),
        type: 'advice'
      };
    }

    // Spending control
    if (lowerMessage.includes('spend') || lowerMessage.includes('overspend') || lowerMessage.includes('budget')) {
      return {
        id: Date.now().toString(),
        content: "💰 **Spending Control Strategies:**\n\n• **50/30/20 Rule**: \n  - 50% for needs (essential bills)\n  - 30% for wants (entertainment, dining)\n  - 20% for savings & debt repayment\n• **24-Hour Rule**: Wait 24 hours before making non-essential purchases\n• **Cash Envelopes**: Use digital envelopes to categorize spending\n• **Track Everything**: Our transaction history helps you see spending patterns\n\n*Ask yourself: Is this purchase moving me toward my financial goals?*",
        role: 'assistant',
        timestamp: new Date(),
        type: 'tip'
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      content: "I'm here to help with financial guidance! Try asking about:\n\n• Saving strategies and tips\n• Stokvel management best practices\n• Emergency fund planning\n• Investment options for groups\n• Budgeting and spending control\n\nOr choose one of the quick questions above!",
      role: 'assistant',
      timestamp: new Date(),
      type: 'info'
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageIcon = (role: 'user' | 'assistant', type?: string) => {
    if (role === 'user') return <User className="h-4 w-4" />;
    
    switch (type) {
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      case 'advice': return <TrendingUp className="h-4 w-4" />;
      case 'warning': return <Shield className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getMessageBadge = (type?: string) => {
    switch (type) {
      case 'tip': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Tip</Badge>;
      case 'advice': return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Advice</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Important</Badge>;
      case 'info': return <Badge variant="secondary" className="bg-green-100 text-green-800">Info</Badge>;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 fixed bottom-6 right-6 shadow-lg">
          <MessageCircle className="h-4 w-4" />
          StokAId Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            StokAId Financial Assistant
          </DialogTitle>
          <DialogDescription>
            Get personalized financial advice and stokvel management tips
          </DialogDescription>
        </DialogHeader>

        {/* Quick Replies */}
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              className="text-xs h-7"
            >
              {reply}
            </Button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {getMessageIcon(message.role, message.type)}
              </div>
              <div
                className={`flex-1 space-y-2 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div className="flex items-center gap-2 justify-start">
                  {message.role === 'assistant' && getMessageBadge(message.type)}
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div
                  className={`rounded-lg px-4 py-2 whitespace-pre-line ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about savings, investments, or stokvel management..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinanceChatbot;