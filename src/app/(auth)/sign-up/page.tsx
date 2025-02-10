"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas/registerSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Selectt from "@/components/custom/Selectt";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { convertParagraphToSentences } from "@/lib/ConvertParagraphToSentenct";

const Register = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [Submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      UserName: "",
      Location: "",
      ParentName: "",
      ParentEmail: "",
      ParentMobileNumber: "",
      Password: "",
      ConfirmPassword: "",
      DateOfBirth: "",
      ParentPassword: "",
      ConfirmParentPassword: "",
      ParentDateOfBirth: "",
      HobbiesAndInterests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setSubmitting(true);
    try {
      const response = await axios
        .post("/api/register", values)
        .catch((err) => {
          console.log(err);
        });
      console.log(response, "response");
      console.log("👍", values, "This is the data from onSubmit function");
      toast({
        title: "Success",
        description: "User Registered Successfully",
      });
      console.log(values.ParentEmail, values.Password, "👍");
      const result = await signIn("credentials", {
        redirect: false,
        identifier: values.UserName,
        password: values.Password.toString(),
      }).catch((err) => {
        console.log(err);
      });
      console.log(result, "result");
      router.replace(`/`);
      setSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast({
        title: "Sign Up Failed",
        variant: "destructive",
      });
      setSubmitting(false);
    }
    console.log(values);
    console.log(convertParagraphToSentences(values.HobbiesAndInterests));
  }

  return (
    <div className="h-[250vh] overflow-y-scroll w-[60%] mx-auto my-auto py-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 overflow-y-scroll"
        >
          {/* Child Name */}
          <FormField
            control={form.control}
            name="UserName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your Child..." {...field} />
                </FormControl>
                <FormDescription>
                  This is the Public display name of your child.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Location */}
          <FormField
            control={form.control}
            name="Location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Child Gender */}
          <FormField
            control={form.control}
            name="Gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child Gender</FormLabel>
                <FormControl>
                  <Selectt
                    value={field.value}
                    onChange={field.onChange}
                    options={["Male", "Female"]}
                    placeHolder="Gender"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Child Date of Birth */}
          <FormField
            control={form.control}
            name="DateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Born day of the child"
                    {...field}
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Child's Hobbies and Interests */}
          <FormField
            control={form.control}
            name="HobbiesAndInterests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobbies and Interests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List hobbies and interests..."
                    {...field}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Name */}
          <FormField
            control={form.control}
            name="ParentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Parent Name...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Gender */}
          <FormField
            control={form.control}
            name="ParentGender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Gender</FormLabel>
                <FormControl>
                  <Selectt
                    value={field.value}
                    onChange={field.onChange}
                    options={["Male", "Female"]}
                    placeHolder="Gender"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Date of Birth */}
          <FormField
            control={form.control}
            name="ParentDateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Date of birth</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Born day of the parent"
                    {...field}
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Email Address */}
          <FormField
            control={form.control}
            name="ParentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Mobile Number */}
          <FormField
            control={form.control}
            name="ParentMobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile Number" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parent Password */}
          <FormField
            control={form.control}
            name="ParentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a password for parent</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Parent Password */}
          <FormField
            control={form.control}
            name="ConfirmParentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Parent password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Link href={"/sign-in"}>
              <Button type="button">Login</Button>
            </Link>
            <Button type="submit">
              {Submitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
