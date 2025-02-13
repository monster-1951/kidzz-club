"use client";

import { useState } from "react";
import { ShirtCanvas } from "@/components/custom/ShirtCanvas";
import { CustomizationPanel } from "@/components/custom/CustomizationPanel";

import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [shirtColor, setShirtColor] = useState("#FFFFFF");
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");

  const handleAddToCart = () => {
  

    toast({
      title: "Success !",
      description: `Your customized shirt has been added to the cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Design Your Perfect Shirt
          </h1>
          <p className="text-lg text-gray-600">
            Customize colors and add your personal touch
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            <ShirtCanvas
              color={shirtColor}
              text={customText}
              textColor={textColor}
            />
          </div>
          <div className="order-1 lg:order-2">
            <CustomizationPanel
              color={shirtColor}
              setColor={setShirtColor}
              text={customText}
              setText={setCustomText}
              textColor={textColor}
              setTextColor={setTextColor}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
