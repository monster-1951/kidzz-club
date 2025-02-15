"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TimerContextProps {
  totalSeconds: number;
  isRunning: boolean;
  setTime: (hours: number, minutes: number) => void;
  resetTime: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Initialize state without accessing localStorage directly
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Load from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSeconds = Number(localStorage.getItem("timer_seconds") || "0");
      const savedRunningState = localStorage.getItem("timer_running") === "true";
      setTotalSeconds(savedSeconds);
      setIsRunning(savedRunningState);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timer_seconds", totalSeconds.toString());
      localStorage.setItem("timer_running", isRunning.toString());
    }
  }, [totalSeconds, isRunning]);

  // Function to start timer
  const setTime = (hours: number, minutes: number) => {
    const newTotalSeconds = hours * 3600 + minutes * 60;
    setTotalSeconds(newTotalSeconds);
    setIsRunning(true);
    if (typeof window !== "undefined") localStorage.setItem("Dim mode", "disabled");
  };

  // Function to reset timer
  const resetTime = () => {
    setTotalSeconds(0);
    setIsRunning(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("Dim mode", "disabled");
      localStorage.setItem("timer_seconds", "0");
      localStorage.setItem("timer_running", "false");
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (typeof window !== "undefined") {
              localStorage.setItem("Dim mode", "enabled");
              localStorage.setItem("timer_running", "false");
              localStorage.setItem("timer_seconds", "0");
            }

            router.push("/");
            setTimeout(() => {
              window.location.reload();
            }, 500);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds, router]);

  return (
    <TimerContext.Provider value={{ totalSeconds, isRunning, setTime, resetTime }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the TimerContext
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
