
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paintbrush, ShoppingCart, Type } from "lucide-react";

interface CustomizationPanelProps {
  color: string;
  setColor: (color: string) => void;
  text: string;
  setText: (text: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  onAddToCart: () => void;
}

export const CustomizationPanel = ({
  color,
  setColor,
  text,
  setText,
  textColor,
  setTextColor,
  onAddToCart,
}: CustomizationPanelProps) => {
  const colors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Navy", value: "#1B1464" },
    { name: "Red", value: "#E84118" },
    { name: "Green", value: "#009432" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle>Customize Your Shirt</CardTitle>
        <CardDescription>
          Choose colors and add text to create your perfect shirt
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4" />
            <Label>Shirt Color</Label>
          </div>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === c.value ? "border-blue-500 scale-110" : "border-gray-200"
                }`}
                style={{ backgroundColor: c.value }}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <Label>Custom Text</Label>
          </div>
          <Input
            placeholder="Enter your text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full"
          />
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10"
          />
        </div>

        <Button
          onClick={onAddToCart}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
