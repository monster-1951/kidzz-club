"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [mode, setMode] = useState<string | null>(null);
  const elements = [
    { Name: "Home", Route: "/" },
    { Name: "Store", Route: "/Store" },
    { Name: "Videos", Route: "/" },
    { Name: "Connect", Route: "/Connect" },
    { Name: "Tution", Route: "/Classes" },
  ];
  const ParentElements = [
    { Name: "Home", Route: "/" },
    { Name: "Store", Route: "/Store" },
    { Name: "Explore", Route: "/Explore" },
    { Name: "Videos", Route: "/Videos" },
    { Name: "Tasks", Route: "/Tasks" },
    
  ];
  useEffect(() => {
    // Ensure that localStorage is only accessed on the client-side
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      setMode(storedMode);
    }
  }, []);

  if (mode === "Child Mode") {
    return (
      <div className="bg-[#edf5e5] text-black flex justify-between fixed bottom-0 z-10 p-5 w-full">
        {elements.map((element, index) => {
          return (
            <Link href={element.Route} key={index} className="flex flex-col">
              <div className="text-3xl">
                <Image
                  alt="Home Icon"
                  src={`/icons/FooterIcons/ChildIcons/${element.Name}.png`}
                  width={1000}
                  height={1000}
                  className="h-10 sm:h-14 w-fit"
                />
              </div>
              <div>{element.Name}</div>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="bg-[#edf5e5] text-black flex justify-between fixed bottom-0 z-10 p-5 w-full">
        {ParentElements.map((element, index) => {
          return (
            <Link href={element.Route} key={index} className="flex flex-col">
              <div className="text-3xl">
                <Image
                  alt="Home Icon"
                  src={`/icons/FooterIcons/ParentIcons/${element.Name}.png`}
                  width={1000}
                  height={1000}
                  className="h-10 sm:h-14 w-fit"
                />
              </div>
              <div className="text-center">{element.Name}</div>
            </Link>
          );
        })}
      </div>
    );
  }
};

export default Footer;
