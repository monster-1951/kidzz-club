"use client";

import { fetchUserById } from "@/lib/FetchUserToConnect";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { User } from "../../../../../types/user";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const ConnectWithUser = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // State to track connection status

  const id = params.id as string;
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserById(id);
      if (response.success && response.user) {
        const fetchedUser = response.user as User;
        setUser(fetchedUser);
        // Check if the current user is connected to the fetched user
        const isUserConnected = fetchedUser.Connections.includes(session?.user._id);
        setIsConnected(isUserConnected);
      } else {
        console.error("Error:", response.error);
      }
    };
    fetchUser();
  }, [id, session?.user?._id]); // Depend on session._id to refetch when it changes

  const handleConnect = async () => {
    if (!session?.user?._id) {
      toast({
        title: "Login required",
        description: "You must be logged in to connect.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/ConnectToUser", {
        _id: session?.user._id,
        connectTo: id,
      });

      if (response.data.success) {
        setIsConnected(true);
        toast({
          title: "Success",
          description: "Successfully connected!",
        });
      } else {
        toast({
          title: "Connection failed",
          description: response.data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "An error occurred while connecting.",
        variant: "destructive",
      });
      console.error("Connection error:", error);
    }

    setLoading(false);
  };

  const handleDisconnect = async () => {
    if (!session?.user?._id) {
      toast({
        title: "Login required",
        description: "You must be logged in to disconnect.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/DisconnectFromUser", {
        _id: session?.user._id,
        disconnectFrom: id,
      });

      if (response.data.success) {
        setIsConnected(false);
        toast({
          title: "Disconnected",
          description: "You are no longer connected."
        });
      } else {
        toast({
          title: "Disconnection failed",
          description: response.data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Disconnection error",
        description: "An error occurred while disconnecting.",
        variant: "destructive",
      });
      console.error("Disconnection error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-[85%] sm:w-[60%] md:w-[40%] mx-auto">
      {/* Profile Card */}
      <div className="bg-[#fee0d6] p-4 flex mt-5 rounded-xl justify-between">
        <div className="w-20 h-20 mx-auto rounded-full mt-5">
          <Image alt="Connect" src={"/ConnectPage/Profile.png"} width={100} height={100} />
          {user && <p className="text-gray-600 text-center mt-2">Points: {user.Points}</p>}
        </div>
        {user ? (
          <div className="mt-4 px-3 pl-5">
            <h2 className="text-xl font-semibold">{user.UserName}</h2>
            <p className="text-gray-600">Location: {user.Location}</p>
            <p className="text-gray-600">Gender: {user.Gender}</p>
            <p className="text-gray-600">Parent: {user.ParentName}</p>
            <p className="text-gray-600">Parent Email: {user.ParentEmail}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading user data...</p>
        )}
      </div>

      {/* Hobbies and Interests */}
      {user && (
        <div className="py-6">
          <h1 className="text-xl font-semibold py-6">Hobbies & Interests</h1>
          {user.HobbiesAndInterests.map((item, index) => (
            <div key={index} className="py-2">
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Connect/Disconnect Button */}
      <div className="w-full flex justify-end py-3">
        {isConnected ? (
          <Button
            className="bg-[#d79a72]"
            onClick={handleDisconnect}
            disabled={loading}
          >
            {loading ? "Disconnecting..." : "DISCONNECT"}
          </Button>
        ) : (
          <Button
            className="bg-[#d79a72]"
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "CONNECT"}
          </Button>
        )}
      </div>

      {/* Connection Status Text */}
      {isConnected && <p className="text-center text-gray-600 mt-3">You are already connected!</p>}
    </div>
  );
};

export default ConnectWithUser;
