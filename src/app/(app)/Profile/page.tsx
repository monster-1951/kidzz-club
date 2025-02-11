"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

let response: any;

interface User {
  UserName: string;
  ParentName: string;
  ParentEmail: string;
  ParentMobileNumber?: number;
  Gender: "Male" | "Female";
  ParentGender: "Male" | "Female";
  DateOfBirth: string;
  ParentPassword: string;
  Points: number;
  Location: string;
  Cart: { _id: string; name: string; price: number }[];
  HobbiesAndInterests: string[];
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const { data: session } = useSession();

  function formatDate(dateStr: string): string {
    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(2, 4);
    const year = dateStr.slice(4, 8);

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options).replace(",", "");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      setMode(storedMode);
    }
    const getUser = async () => {
      if (session?.user._id) {
        response = await axios
          .post("/api/getCurrentUser", {
            id: session.user._id,
          })
          .then((res) => res.data.user)
          .catch((err) => {
            console.log("Error fetching user:", err);
          });
        setUser(response);
        console.log(response);
        return response;
      }
    };

    getUser();
  }, [session]);

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 mb-28">
      <Card className="p-8 shadow-2xl w-full max-w-2xl mx-auto rounded-lg bg-white border border-gray-200 transform transition-transform hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Profile
        </h2>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Name:</strong>{" "}
              <span className="text-gray-700">{user.UserName}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Parent Name:</strong>{" "}
              <span className="text-gray-700">{user.ParentName}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Parent Email:</strong>{" "}
              <span className="text-gray-700">{user.ParentEmail}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Parent Mobile:</strong>{" "}
              <span className="text-gray-700">
                {user.ParentMobileNumber || "N/A"}
              </span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Gender:</strong>{" "}
              <span className="text-gray-700">{user.Gender}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Parent Gender:</strong>{" "}
              <span className="text-gray-700">{user.ParentGender}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Date of Birth:</strong>{" "}
              <span className="text-gray-700">
                {formatDate(user.DateOfBirth)}
              </span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Points:</strong>{" "}
              <span className="text-gray-700">{user.Points}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Location:</strong>{" "}
              <span className="text-gray-700">{user.Location}</span>
            </div>
            <div className="text-lg bg-gray-50 p-4 rounded-lg shadow-sm">
              <strong className="text-indigo-600">Hobbies & Interests:</strong>{" "}
              <div className="mt-2">
                {user.HobbiesAndInterests[0].split("\n").map((Hobby, index) => (
                  <span key={index} className="block text-gray-700">
                    {Hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;