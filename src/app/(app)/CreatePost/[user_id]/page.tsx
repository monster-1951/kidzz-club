"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import Selectt from "@/components/custom/Selectt";
import { categories } from "@/constants/categories";
import Image from "next/image";
import { postSchema } from "@/schemas/postSchema";


type PostFormData = z.infer<typeof postSchema>;

const CreatePost = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const [mode, setMode] = useState<string | null>(null);
  const router = useRouter();
  const [base64, setBase64] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [userId, setUserId] = useState<string | null>(null);
  const [preview, setpreview] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
    // Wait for the params to resolve
    params.then((resolvedParams) => {
      setUserId(resolvedParams.user_id);
    });
  }, [params]);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      media: "",
    },
  });

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as base64"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setBase64(base64String);
        // console.log(base64String, "😘");
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
      setpreview(URL.createObjectURL(file));
      console.log(preview);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);
    data.media = base64 as string;
    try {
      const response = await axios.post("/api/createNewPost", {
        ...data,
        postedBy: userId,
      });
      console.log({
        ...data,
        postedBy: userId,
      });
      if (response.data.success) {
        router.push("/Explore");
      }
    } catch (error) {
      console.error("Error in posting:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    // Show a loading indicator while waiting for the user ID
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
  }

  if (!(mode === "Child Mode")) {
    return (
      <Form {...form}>
        <h1 className="text-xl font-bold text-center p-3">
       Upload a blog
      </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-3 mb-32 w-[60%] sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Post content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex justify-between">
                <FormLabel className="my-auto">Category</FormLabel>
                <FormControl>
                  <Selectt
                    value={field.value}
                    onChange={field.onChange}
                    options={categories}
                    placeHolder="Category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Media Input*/}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="my-auto">Select an image</FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      type="file"
                      className="w-fit"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {preview && (
            <div className="mt-3 h-fit">
              <Image
                width={500}
                src={preview}
                alt="Preview"
                className=" w-fit mx-auto"
                height={500}
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Create Post"}
          </Button>
        </form>
      </Form>
    );
  }
};

export default CreatePost;
