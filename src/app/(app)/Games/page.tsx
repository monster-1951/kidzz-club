"use client";
import { useState } from "react";
import { GameCard } from "@/components/custom/GameCard";
import { PointsDisplay } from "@/components/custom/PointsDisplay";
import { useToast } from "@/hooks/use-toast";
const games = [
  {
    id: 1,
    title: "Memory Match",
    description: "Match pairs of cards to test and improve your memory!",
    points: 100,
    difficulty: "easy" as const,
  },
  {
    id: 2,
    title: "Math Challenge",
    description: "Solve fun math problems and earn points while learning!",
    points: 150,
    difficulty: "medium" as const,
  },
  {
    id: 3,
    title: "Word Wizard",
    description: "Build vocabulary and spelling skills with word games!",
    points: 200,
    difficulty: "hard" as const,
  },
  {
    id: 4,
    title: "Pattern Quest",
    description: "Find and complete patterns to boost logical thinking!",
    points: 120,
    difficulty: "medium" as const,
  },
];

const Index = () => {
  const { toast } = useToast();
  const [totalPoints, setTotalPoints] = useState(0);

  const handleGameClick = (gameTitle: string) => {
    toast({
      title: "Coming Soon!",
      description: `${gameTitle} will be available in the next update!`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen mb-28">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
            KidsPlay Brain Games
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Play fun games, develop your brain, and earn points for awesome
            rewards!
          </p>
          <PointsDisplay points={totalPoints} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              points={game.points}
              difficulty={game.difficulty}
              onClick={() => handleGameClick(game.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
