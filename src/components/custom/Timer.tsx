"use client";
import React, { useState, useEffect } from "react";
import { useTimer } from "@/app/context/TimerContext";
import TimeDisplay from "@/components/custom/TimeDisplay";
import TimeSetter from "@/components/custom/TimeSetter";
import PasswordDialog from "@/components/custom/PasswordDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const Timer = () => {
  const { totalSeconds, isRunning, setTime, resetTime } = useTimer();
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const handlePasswordVerify = (success: boolean) => {
    if (success) {
      resetTime();
    }
  };

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
              <TimeSetter onSetTime={setTime} />
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
