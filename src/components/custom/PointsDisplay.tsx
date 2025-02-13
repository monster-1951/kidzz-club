
import { Award } from "lucide-react";

interface PointsDisplayProps {
  points: number;
}

export const PointsDisplay = ({ points }: PointsDisplayProps) => {
  return (
    <div className="flex items-center gap-3 bg-accent bg-opacity-10 px-6 py-3 rounded-full">
      <Award className="w-6 h-6 text-accent" />
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">Total Points</span>
        <span className="font-bold text-accent">{points}</span>
      </div>
    </div>
  );
};
