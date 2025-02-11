"use client";
import { FetchUsersByLocation } from "@/lib/FetchUsersByLocation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  UserName: string;
  ParentName: string;
  Gender: string;
  ParentGender: string;
  ParentEmail: string;
  ParentMobileNumber?: number;
  DateOfBirth: string;
  Points: number;
  Location: string;
}

const Connect = () => {
  const [users, setUsers] = useState<User[]>([]); // Set initial state to empty array
  const { data: session } = useSession();
  const location = session?.user.location;
  const username = session?.user.username;
  // const { location, username } = session?.user;
  useEffect(() => {
    const fetchData = async () => {
      console.log({ location, username });
      const response = await FetchUsersByLocation(location, username);
      if (response.success) {
        setUsers(response.users || []); // Ensure to set users if present
      } else {
        console.log("Error:", response);
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks if component unmounts
    return () => {
      setUsers([]);
    };
  }, [session]); // Empty dependency array to call fetchData once on component mount

  return (
    <div className="h-fit mb-28">
      <Image
        alt="Connect"
        src={"/ConnectPage/Buddies_Near_you.png"}
        width={1000}
        height={1000}
        className="w-60 h-fit mx-auto"
      />
      <div>
        <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {users.length > 0 ? (
            users.map((user, index) => (
              <Link href={`/Connect/${user._id}`} key={index}>
                <div className="bg-[#bfa0ff] mx-auto w-[85%] font-medium p-5 rounded-xl flex justify-between">
                  <Image
                    alt="Connect"
                    src={"/ConnectPage/Profile.png"}
                    width={1000}
                    height={1000}
                    className="w-10 h-fit mx-auto"
                  />
                  <span className="my-auto text-lg text-center mx-auto">
                    {user.UserName}
                  </span>
                  <Image
                    alt="Connect"
                    src={"/ConnectPage/HandShake.png"}
                    width={1000}
                    height={1000}
                    className="w-10 h-fit mx-auto"
                  />
                </div>
              </Link>
            ))
          ) : (
            <p>No users found in your location.</p> // Show message if no users are available
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
