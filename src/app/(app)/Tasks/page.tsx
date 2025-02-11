"use client";

import { useState, useEffect } from "react";
import parentTasks from "@/constants/parentTasks";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(parentTasks);
  const { data: session } = useSession();

  useEffect(() => {
    const storedTasks = localStorage.getItem("parentTasks");
    const lastResetDate = localStorage.getItem("lastResetDate");
    const today = new Date().toISOString().split("T")[0];

    if (storedTasks && lastResetDate === today) {
      setTasks(JSON.parse(storedTasks));
    } else {
      resetTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("parentTasks", JSON.stringify(tasks));
  }, [tasks]);

  const resetTasks = () => {
    const resetTasks = parentTasks.map((task) => ({
      ...task,
      taskStatus: "Not Completed",
    }));
    setTasks(resetTasks);
    localStorage.setItem("parentTasks", JSON.stringify(resetTasks));
    localStorage.setItem("lastResetDate", new Date().toISOString().split("T")[0]);
  };

  const updatePoints = async (taskCoins: number, action: "add" | "remove") => {
    const storedUserId = session?.user._id
    if (!storedUserId) {
      console.log("Id is missing")
      return
    };

    try {
      const res = await axios.post("/api/updateCoins", {
        _id: storedUserId,
        Points: taskCoins,
        action,
      });

      if (res.data.success) {
        toast({
          title: "Success",
          description: `You earned ${res.data.Points} coins this day`,
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

  const toggleTaskStatus =async (index: number) => {
    console.log("clicked toggle")
    const task = tasks[index];
   await updatePoints(task.taskCoins, task.taskStatus === "Completed" ? "remove" : "add");
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? {
              ...task,
              taskStatus: task.taskStatus === "Completed" ? "Not Completed" : "Completed",
            }
          : task
      )
    );

   
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
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
                      task.taskStatus === "Completed" ? "text-green-600" : "text-red-600"
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
