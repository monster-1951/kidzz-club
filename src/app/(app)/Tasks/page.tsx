"use client";

import { useState, useEffect } from "react";
import parentTasks from "@/constants/parentTasks";
import { childTasks } from "@/constants/childTasks"; // Import childTasks
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { parentTasksType } from "../../../../types/parentTasksType";

export default function Tasks() {
  const { toast } = useToast();
  const { data: session } = useSession();

  const [mode, setMode] = useState<string | null>(null);

  // Initialize tasks based on mode and localStorage
  const [tasks, setTasks] = useState<parentTasksType[]>(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      const storedTasks = localStorage.getItem(
        storedMode === "Parent Mode" ? "parentTasks" : "childTasks"
      );
      return storedTasks
        ? JSON.parse(storedTasks)
        : storedMode === "Parent Mode"
        ? parentTasks
        : childTasks;
    }
    return parentTasks; // Default to parentTasks if window is undefined
  });

  useEffect(() => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const today = new Date().toISOString().split("T")[0];

    // Reset tasks only if last reset date is not today
    if (lastResetDate !== today) {
      resetTasks();
    }

    // Schedule reset at midnight
    scheduleMidnightReset();
  }, []);

  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      mode === "Parent Mode" ? "parentTasks" : "childTasks",
      JSON.stringify(tasks)
    );
  }, [tasks, mode]);

  const resetTasks = () => {
    const resetTasks = (mode === "Parent Mode" ? parentTasks : childTasks).map(
      (task:parentTasksType) => ({
        ...task,
        taskStatus: "Not Completed",
      })
    );
    setTasks(resetTasks);
    localStorage.setItem(
      mode === "Parent Mode" ? "parentTasks" : "childTasks",
      JSON.stringify(resetTasks)
    );
    localStorage.setItem(
      "lastResetDate",
      new Date().toISOString().split("T")[0]
    );
  };

  const scheduleMidnightReset = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to 12:00 AM next day

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      resetTasks();
      scheduleMidnightReset(); // Schedule next reset
    }, timeUntilMidnight);
  };

  const updatePoints = async (taskCoins: number, action: "add" | "remove") => {
    const storedUserId = session?.user._id;
    if (!storedUserId) {
      console.log("User ID is missing");
      return;
    }

    try {
      const res = await axios.post("/api/updateCoins", {
        _id: storedUserId,
        Points: taskCoins,
        action,
      });

      if (res.data.success) {
        toast({
          title: "Success",
          description: `You earned ${res.data.Points} coins today!`,
        });
        console.log("Updated Points:", res.data.Points);
      }
    } catch (error) {
      toast({
        title: "Failure",
        description: "Try again after some time",
      });
      console.error("Error updating points:", error);
    }
  };

  const toggleTaskStatus = async (index: number) => {
    console.log("Clicked toggle");
    const task = tasks[index];
    await updatePoints(
      task.taskCoins,
      task.taskStatus === "Completed" ? "remove" : "add"
    );

    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? {
              ...task,
              taskStatus:
                task.taskStatus === "Completed" ? "Not Completed" : "Completed",
            }
          : task
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mb-28">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "Parent Mode" ? "Parent Tasks" : "Child Tasks"}
      </h1>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`p-4 border rounded-lg ${
              task.taskStatus === "Completed" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{task.taskName}</h2>
                <p className="text-sm text-gray-600">{task.taskDescription}</p>
                <p className="text-sm font-medium">Coins: {task.taskCoins}</p>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={
                      task.taskStatus === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {task.taskStatus}
                  </span>
                </p>
              </div>
              <input
                type="checkbox"
                checked={task.taskStatus === "Completed"}
                onChange={() => toggleTaskStatus(index)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
