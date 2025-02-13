"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Homee = () => {
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    // Ensure that localStorage is only accessed in the client-side
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      setMode(storedMode);
    }
  }, []);

  if (mode === "Child Mode") {
    return (
      <>
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
