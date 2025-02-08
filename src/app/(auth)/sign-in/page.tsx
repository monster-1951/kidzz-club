"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Access localStorage safely on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      setMode(storedMode);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: values.identifier,
      password: values.password,
    }).catch((err) => {
      console.log(err);
      setIsSubmitting(false);
    });

    localStorage.setItem("Mode", "Child Mode");
    setIsSubmitting(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }

    if (result?.url) {
      router.replace("/");
    }
    console.log(values);
  }

  return (
    <div className="w-fit mx-auto my-10 border-2 p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input placeholder="UserName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Link href={"/sign-up"}>
              <Button type="button">Register</Button>
            </Link>
            <Button type="submit">
              {isSubmitting ? "Loading...." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
