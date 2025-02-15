"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DimToggle } from "./DimToggle";

const Homee = () => {
  const [mode, setMode] = useState<string | null>(null);
  const [isDimmed, setIsDimmed] = useState(false);

  useEffect(() => {
    // Ensure that localStorage is only accessed in the client-side
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      const dimMode = localStorage.getItem("Dim mode");
      setIsDimmed(dimMode == "enabled");
      console.log(isDimmed);
      setMode(storedMode);
    }
  }, [mode, isDimmed]);

  if (isDimmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-300 to-slate-800">
        <DimToggle />
        <div className="fixed top-52 w-[80%] mx-auto p-3 flex justify-center ">
          Virtual Switch of mode is enabled . Click on the top right icon and
          enter the password to disable the Virtual Switch of mode
        </div>
      </div>
    );
  }
  if (mode === "Child Mode") {
    return (
      <>
        <DimToggle />
        <div className="p-3 py-5 grid grid-flow-row md:grid-cols-2  overflow-scroll sm:h-[80vh] space-y-3 mt-5 mb-5">
          <Link
            href={"/News"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ChildHome/KidsNews.png"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[70vh] mx-auto mt-10 md:mt-0"
            />
          </Link>
          <Link
            href={"/Tasks"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ChildHome/DailyTasks.png"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[70vh] mx-auto mb-3"
            />
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <DimToggle />
        <div className="p-3 py-5 grid grid-flow-row md:grid-cols-2  overflow-scroll sm:h-[80vh] space-y-3 mt-5 mb-28">
          <Link
            href={"/Events"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ParentHome/Parents Networking.png"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[70vh] mx-auto mt-10 md:mt-0"
            />
          </Link>
          <Link
            href={"/Classes"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ParentHome/ParentingClasses.png"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[50vh] mx-auto mb-3"
            />
          </Link>
          <Link
            href={"/AIBehaviourAnalysis"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ParentHome/AIBehaviour.jpg"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[50vh] mx-auto mb-3 mt-10"
            />
          </Link>
          <Link
            href={"/TShirtDesign"}
            className="h-[65%] sm:h-[80%] flex flex-col justify-center"
          >
            <Image
              src={"/HomeIcons/ParentHome/T-ShirtDesign.png"}
              alt="Home"
              width={1000}
              height={1000}
              className="rounded-lg h-fit w-[50vh] mx-auto mb-3"
            />
          </Link>
        </div>
      </>
    );
  }
};

export default Homee;
