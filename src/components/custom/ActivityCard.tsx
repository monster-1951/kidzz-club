
import { Activity } from "lucide-react";
import { Card } from "../ui/card";

interface ActivityCardProps {
  title: string;
  duration: string;
  type: string;
  time: string;
}

export const ActivityCard = ({ title, duration, type, time }: ActivityCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{type}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </Card>
  );
};
