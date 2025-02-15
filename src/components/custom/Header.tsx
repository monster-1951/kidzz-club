"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Menu from "./Menu";
import axios from "axios";
import { DimToggle } from "./DimToggle";


let response: any;

const Header = () => {
  const [mode, setMode] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isDimmed, setIsDimmed] = useState(false);
  useEffect(() => {
    // Ensure localStorage is only accessed on the client side
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      const dimMode = localStorage.getItem("Dim mode");
      setIsDimmed(dimMode == "enabled"?true:false);
      setMode(storedMode);
    }
  }, []);

  const getUser = async () => {
    if (session?.user._id) {
      response = await axios
        .post("/api/getCurrentUser", {
          id: session.user._id, // ✅ Send `id` in the request body
        })
        .then((res) => res.data.user)
        .catch((err) => {
          console.log("Error fetching user:", err);
        });
      // console.log(response);
      return response;
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() || "";
  };

  const C = capitalizeFirstLetter(session?.user.username);
  const P = capitalizeFirstLetter(session?.user.parentname);

  getUser();

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

  if (mode === "Child Mode" && !isDimmed) {
    return (
      <div className="bg-[#fbf1ee] h-[10vh] p-3 flex justify-between text-black font-bold sm:text-2xl my-auto top-0 sticky">
        <div className="flex space-x-2 justify-between ">
          <div className="h-6 w-6 bg-[#bad194] rounded-full sm:h-12 sm:w-12 my-auto text-center text-white font-bold sm:p-2">
            {C}
          </div>
        </div>
        <div className="my-auto -ml-[15%]">
          Welcome {session?.user.username}
        </div>
        <div className="my-auto">
          <Menu
            session={session ? true : false}
            uname={session?.user.username}
            Mode="Child"
            id={session?.user._id}
          />
        </div>
      </div>
    );
  } else if(!isDimmed) {
    return (
      <div className="bg-[#fffdf5] h-[10vh] p-3 flex justify-between text-black font-bold sm:text-2xl my-auto top-0 sticky">
        <div className="flex space-x-2 justify-between ">
          <div className="h-6 w-6 bg-[#d1e4e2] rounded-full sm:h-12 sm:w-12 my-auto text-center text-black font-bold sm:p-2">
            {P}
          </div>
        </div>
        <div className="my-auto">Welcome {session?.user.parentname}</div>
        <div className="my-auto flex space-x-2">
          
          <Menu
            session={session ? true : false}
            uname={session?.user.parentname}
            Mode="Parent"
            id={session?.user._id}
          />
        </div>
      </div>
    );
  }
};

export default Header;
