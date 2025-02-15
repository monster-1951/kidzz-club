
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeSetterProps {
  onSetTime: (hours: number, minutes: number) => void;
}

const TimeSetter: React.FC<TimeSetterProps> = ({ onSetTime }) => {
  const [hours, setHours] = React.useState<string>('');
  const [minutes, setMinutes] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    onSetTime(h, m);
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full"
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full"
              placeholder="0"
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-mint-600 transition-colors"
        >
          Set Time
        </Button>
      </form>
    </Card>
  );
};

export default TimeSetter;
