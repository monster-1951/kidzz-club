"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { childrenClasses } from "@/constants/ClassesForChildren";
import { parentingClasses } from "@/constants/parentingClasses";
import Link from "next/link";

export default function ClassDetails() {
  const params = useParams(); // Get params properly
  const [Mode, setMode] = useState<string | null>(null);
  const [classId, setClassId] = useState<number | null>(null);

  useEffect(() => {
    // Get mode from local storage
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);

    // Parse the ID safely
    if (params?.id) {
      const parsedId = parseInt(params.id as string, 10);
      if (!isNaN(parsedId)) setClassId(parsedId);
    }
  }, [params]);

  if (classId === null) return <div>Loading...</div>;

  const cls =
    Mode === "Parent Mode" ? parentingClasses[classId] : childrenClasses[classId];

  if (!cls) return <div>Class not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{cls.className}</h1>
      <p className="text-gray-600 mb-4">{cls.classObjective}</p>
      <p className="text-sm text-gray-500 mb-4">{cls.classDescription}</p>
      <div className="text-sm mb-2">
        <span className="font-medium">Time:</span> {cls.time}
      </div>
      <div className="text-sm mb-2">
        <span className="font-medium">Date:</span> {cls.date}
      </div>
      <div className="text-sm mb-4">
        <span className="font-medium">Host:</span> {cls.hostName}
      </div>
      <Link
        href={cls.linkToJoin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#fffdf5] text-black hover:bg-[#f9e493] px-4 py-2 rounded-md transition-colors"
      >
        Join Class
      </Link>
    </div>
  );
}
