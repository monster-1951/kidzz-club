
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ShirtCanvasProps {
  color: string;
  text: string;
  textColor: string;
}

export const ShirtCanvas = ({ color, text, textColor }: ShirtCanvasProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl aspect-square mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full"
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))" }}
        >
          {/* T-shirt body */}
          <path
            d="M75 75 L125 50 L175 50 L225 75 L225 250 L75 250 Z"
            fill={color}
            stroke="#0001"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Left sleeve */}
          <path
            d="M75 75 L25 100 L50 125 L75 100 Z"
            fill={color}
            stroke="#0001"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Right sleeve */}
          <path
            d="M225 75 L275 100 L250 125 L225 100 Z"
            fill={color}
            stroke="#0001"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Collar */}
          <path
            d="M125 50 L150 60 L175 50"
            fill="none"
            stroke="#0002"
            strokeWidth="2"
          />
        </svg>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ top: "30%" }}
          >
            <p
              className="text-4xl font-bold text-center break-words max-w-full"
              style={{ color: textColor }}
            >
              {text}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
