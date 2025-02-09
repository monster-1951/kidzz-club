"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import LikeTheBlog from "@/components/custom/LikeTheBlog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  _id: string;
  postedBy: string;
  author: string;
  title: string;
  content: string;
  category: string[];
  media?: string;
  likes: string[];
  createdAt: string;
}

const PostsList = () => {
  const [mode, setMode] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    //   const id = session?.user.

    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/FetchPosts");
        if (response.data.success) {
          setPosts(response.data.AllPosts);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  console.log(session);
  const id = session?.user._id;
  if (loading)
    return (
      <p className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading posts...
      </p>
    );

  if (error)
    return (
      <p className="flex items-center justify-center h-screen text-lg font-semibold">
        {error}
      </p>
    );
  if (!(mode === "Child Mode")) {
    return (
      <div className="p-4 space-y-4 mb-32">
        <h2 className="text-xl font-bold text-center">Explore blogs</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="border p-4 rounded-lg shadow-md">
                <Link href={`/Explore/posts/${post._id}`}>
                  {" "}
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                </Link>
                <p className="text-sm text-gray-600">By {post.author}</p>
                {/* {post.media && (
                  <Image
                    alt=""
                    src={post.media || ""}
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                )} */}
                <p className="mt-2">{post.content.substring(0, 100)}...</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mt-1">
                      Categories: {post.category.join(", ")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant={"outline"}
                      className="bg-inherit flex  space-x-2"
                    >
                      <LikeTheBlog
                        Liked={post.likes.includes(id)}
                        _id={id}
                        postId={post._id.toString()}
                        initialLikes={post.likes.length}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    );
  } else {
    redirect("/");
  }
};

export default PostsList;
