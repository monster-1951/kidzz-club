
import { Brain, TrendingUp, AlertTriangle, BookOpen, Timer } from "lucide-react";
import { Card } from "../ui/card";

interface Insight {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: keyof typeof icons;
}

const icons = {
  trending: TrendingUp,
  alert: AlertTriangle,
  book: BookOpen,
  timer: Timer
};

export const InsightsPanel = () => {
  const insights: Insight[] = [
    {
      title: "Screen Time Alert",
      description: "Screen time has increased by 25% this week. Consider setting limits.",
      priority: 'high',
      icon: 'alert'
    },
    {
      title: "Learning Pattern Detected",
      description: "Peak learning efficiency observed between 9-11 AM. Schedule important tasks during this window.",
      priority: 'medium',
      icon: 'trending'
    },
    {
      title: "Physical Activity",
      description: "Only 30 minutes of physical activity today. Encourage outdoor play.",
      priority: 'high',
      icon: 'timer'
    },
    {
      title: "Educational Progress",
      description: "Reading comprehension has improved by 15% this week. Keep up the good work!",
      priority: 'medium',
      icon: 'book'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      default:
        return 'text-green-500 bg-green-50';
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-secondary" />
        <h2 className="text-xl font-semibold">AI Insights</h2>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const IconComponent = icons[insight.icon];
          const priorityColor = getPriorityColor(insight.priority);
          
          return (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${priorityColor}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColor}`}>
                      {insight.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
