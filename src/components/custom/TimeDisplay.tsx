
import React from 'react';
import { Card } from "@/components/ui/card";

interface TimeDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ hours, minutes, seconds }) => {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <Card className="p-8 backdrop-blur-sm bg-white/90 shadow-lg animate-fade-in">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-mint-600">{formatNumber(hours)}</span>
          <span className="text-sm text-gray-500 mt-2">Hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-mint-600">{formatNumber(minutes)}</span>
          <span className="text-sm text-gray-500 mt-2">Minutes</span>
        </div>
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-mint-600">{formatNumber(seconds)}</span>
          <span className="text-sm text-gray-500 mt-2">Seconds</span>
        </div>
      </div>
    </Card>
  );
};

export default TimeDisplay;
