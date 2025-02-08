"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const ParentPasswordInput = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const username = session?.user.username;
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    // Check for localStorage only on the client side
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios
        .post("/api/parentAuth", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.isPasswordCorrect) {
            if (typeof window !== "undefined") {
              localStorage.setItem("Mode", "Parent Mode");
            }
            router.replace("/");
            window.location.reload();
            console.log("Response:", response.data);
            toast({
              title: "Success",
              description: "Successfully logged in as parent",
            });
          } else {
            toast({
              title: "Attempt Failed",
              variant: "destructive",
              description: "Incorrect password",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Attempt failed",
            variant: "destructive",
            description: err,
          });
        });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (mode === "Child Mode") {
    return (
      <div className="flex flex-col justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-80 mx-auto">
          <p className="text-left font-semibold">
            Enter Password to log in as Parent
          </p>
          <Input
            type="password"
            placeholder="Enter Parent Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <Button onClick={handleLogin} className="w-full">
            Log In As Parent
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-80 mx-auto">
          <p className="text-left font-semibold">You are in Parent Mode</p>

          <div className="flex h-fit flex-col space-y-5">
            <Link href={"/"} className="w-full mx-auto">
              <Button>Go to Home</Button>
            </Link>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.setItem("Mode", "Child Mode");
                }
                window.location.reload();
              }}
              className="h-fit"
            >
              Switch to Child Mode
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ParentPasswordInput;
