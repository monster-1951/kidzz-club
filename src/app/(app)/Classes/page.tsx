// app/components/Classes.tsx
"use client";
import Link from "next/link";
import { parentingClasses } from "@/constants/parentingClasses"; // Import the array
import { useEffect, useState } from "react";
import ChildrenClasses from "@/components/custom/ChildrenClasses";
import ParentingClasses from "@/components/custom/ParentingClasses";

export default function Classes() {
  const [Mode, setMode] = useState<string | null>("");
  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
  });
  if (Mode === "Parent Mode") {
    return <ParentingClasses/>
  } else {
    return <ChildrenClasses />;
  }
}
