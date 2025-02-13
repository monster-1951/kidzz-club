
import { Card } from "@/components/ui/card";
import { Trophy, Brain, Star } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  onClick: () => void;
}

export const GameCard = ({ title, description, points, difficulty, onClick }: GameCardProps) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-accent">{title}</h3>
          <Brain className="w-6 h-6 text-accent animate-float" />
        </div>
        
        <p className="text-gray-600">{description}</p>
        
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-success-DEFAULT" />
            <span className="font-semibold">{points} points</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className={`w-5 h-5 ${getDifficultyColor(difficulty)}`} />
            <span className="capitalize text-sm">{difficulty}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
