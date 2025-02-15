"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import TimeDisplay from "@/components/custom/TimeDisplay";
import TimeSetter from "@/components/custom/TimeSetter";
import PasswordDialog from "@/components/custom/PasswordDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter(); // Initialize router

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const handleSetTime = (hours: number, minutes: number) => {
    const newTotalSeconds = hours * 3600 + minutes * 60;
    setTotalSeconds(newTotalSeconds);
    setIsRunning(true);

    // Update local storage when the timer starts
    localStorage.setItem("Dim mode", "disabled");

    toast({
      title: "Timer Started",
      description: `Time set for ${hours}h ${minutes}m`,
    });
  };

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTotalSeconds(0);

    // Reset "Dim mode" when the timer stops manually
    localStorage.setItem("Dim mode", "disabled");

    toast({
      title: "Timer Reset",
      description: "You can now set a new time limit",
    });
  }, [toast]);

  const handlePasswordVerify = (success: boolean) => {
    if (success) {
      handleReset();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowPasswordDialog(true);

            // Update local storage when time runs out
            localStorage.setItem("Dim mode", "enabled");

            // Redirect to "/" and reload the page
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
    <div className="mb-24 min-h-screen bg-gradient-to-br from-mint-50 to-mint-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6 animate-fade-in">
        <Card className="p-8 backdrop-blur-sm bg-white/90 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2 text-mint-800">
            Screen Time Control
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Set your time limit and stay focused
          </p>

          <div className="space-y-6">
            <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

            {!isRunning && totalSeconds === 0 ? (
              <TimeSetter onSetTime={handleSetTime} />
            ) : (
              <Button
                onClick={() => setShowPasswordDialog(true)}
                className="w-full bg-black hover:bg-white hover:text-black transition-colors"
              >
                Reset Timer
              </Button>
            )}
          </div>
        </Card>

        <PasswordDialog
          isOpen={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          onVerify={handlePasswordVerify}
        />
      </div>
    </div>
  );
};

export default Timer;
