"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { signOut } from "next-auth/react";

import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";

interface MenuProps {
  session: boolean;
  uname?: string;
  Mode: "Child" | "Parent";
}
const Menu = ({ session, uname, Mode }: MenuProps) => {
  useEffect(() => {
    // getUser();
    // console.log(response);
    console.log(Mode);
  });
  const ParentElements = ["COINS","CART", "RECIPES", "PARENTING CLASSES"];
  const elements = ["POINTS", "VIRTUAL ASSISTANT", "VIRTUAL MEETUP"];
  if (Mode == "Child") {
    return (
      <Sheet>
        <SheetTrigger>
          {" "}
          <RxHamburgerMenu />
        </SheetTrigger>
        <SheetContent className="bg-[#ffedac] sm:w-full w-[60%]">
          <SheetHeader className="  space-y-5">
            <SheetTitle className="text-center bg-[#bcb497] w-[85%] sm:w-[75%] mx-auto py-2 px-5 rounded-3xl border border-black">
             
              {/* Profile */}
             
              <Link href={"/"} className="flex">
                <Image
                  alt="Home Icon"
                  src={`/icons/SheetIcons/User.png`}
                  width={1000}
                  height={1000}
                  className="h-10 sm:h-14 w-fit"
                />{" "}
                <span className=" my-auto "> {uname || "PROFILE"}</span>
              </Link>
            </SheetTitle>
            {session && (
              <SheetDescription className="font-bold text-black sm:w-[75%] space-y-10 mx-auto text-left w-[85%]">
               
                {/* Switch Mode */}
               
                <Link href={"/ParentAuth"} className="flex space-x-2">
                  <Image
                    alt="Home Icon"
                    src={`/icons/SheetIcons/SwitchMode.png`}
                    width={1000}
                    height={1000}
                    className="h-10 sm:h-14 w-fit my-auto"
                  />
                  <span className="my-auto">
                    Switch to{" "}
                    {localStorage.getItem("Mode") == "Child Mode"
                      ? "Parent Mode"
                      : "Child Mode"}
                  </span>
                </Link>

                {/* Elements */}
                
                {elements.map((element, index) => {
                  return (
                    <Link href={"/"} key={index} className="flex space-x-4">
                      <Image
                        alt="Home Icon"
                        src={`/icons/SheetIcons/ChildIcons/${element}.png`}
                        width={1000}
                        height={1000}
                        className="h-10 sm:h-14 w-fit"
                      />
                      {/* <span className="my-auto">{element=="POINTS"?`POINTS - ${response?.Points}` : element}</span> */}
                      <span className="my-auto">{element}</span>
                    </Link>
                  );
                })}

                {/* Logout */}
                
                <span className="flex">
                  <Image
                    alt="Home Icon"
                    src={`/icons/SheetIcons/LOGOUT.png`}
                    width={1000}
                    height={1000}
                    className="h-10 sm:h-14 w-fit"
                  />
                  <Button
                    className="my-auto border-none bg-inherit text-black font-bold"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    LOGOUT
                  </Button>
                </span>
              </SheetDescription>
            )}
            {!session && (
              <Link href={"/sign-in"}>
                <Button className="my-auto mx-auto">LOG IN</Button>
              </Link>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <>
        <Sheet>
          <SheetTrigger>
            {" "}
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent className="bg-[#ffedac] bg-transparent sm:w-full w-[60%] ">
            <SheetHeader className="  space-y-5">
              <SheetTitle className="text-center bg-[#bcb497] w-[85%] sm:w-[75%] mx-auto py-2 px-5 rounded-3xl border border-black">
                <Link href={"/"} className="flex">
                  <Image
                    alt="Home Icon"
                    src={`/icons/SheetIcons/User.png`}
                    width={1000}
                    height={1000}
                    className="h-10 sm:h-14 w-fit"
                  />{" "}
                  <span className=" my-auto "> {uname || "PROFILE"}</span>
                </Link>
              </SheetTitle>
              {session && (
                <SheetDescription className="font-bold text-black sm:w-[75%] space-y-10 mx-auto text-left w-[85%]">
                  <span className="flex space-x-2 h-fit my-auto">
                    <Image
                      alt="Home Icon"
                      src={`/icons/SheetIcons/SwitchMode.png`}
                      width={1000}
                      height={1000}
                      className="h-10 sm:h-14 w-fit my-auto"
                    />
                    <Button
                      className="my-auto border-none bg-inherit text-white font-bold w-[20vh] text-wrap"
                      onClick={() => {
                        localStorage.setItem("Mode", "Child Mode");
                        window.location.reload();
                      }}
                    >
                      Switch to{" "}
                      {localStorage.getItem("Mode") == "Child Mode"
                        ? "Parent Mode"
                        : "Child Mode"}
                    </Button>
                  </span>

                  {ParentElements.map((element, index) => {
                    return (
                      <Link href={"/"} key={index} className="flex space-x-4">
                        <Image
                          alt="Home Icon"
                          src={`/icons/SheetIcons/ParentIcons/${element}.png`}
                          width={1000}
                          height={1000}
                          className="h-10 sm:h-14 w-fit"
                        />
                        <span className="my-auto text-white">{element}</span>
                      </Link>
                    );
                  })}

                  <span className="flex">
                    <Image
                      alt="Home Icon"
                      src={`/icons/SheetIcons/LOGOUT.png`}
                      width={1000}
                      height={1000}
                      className="h-10 sm:h-14 w-fit"
                    />
                    <Button
                      className="my-auto border-none bg-inherit text-white font-bold"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      LOGOUT
                    </Button>
                  </span>
                </SheetDescription>
              )}
              {!session && (
                <Link href={"/sign-in"}>
                  <Button className="my-auto mx-auto">LOG IN</Button>
                </Link>
              )}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </>
    );
  }
};

export default Menu;
