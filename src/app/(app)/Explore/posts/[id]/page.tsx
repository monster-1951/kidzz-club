"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import LikeTheBlog from "@/components/custom/LikeTheBlog";

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

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!id) return;
    console.log(id);
    const fetchPost = async () => {
      try {
        const response = await axios.post("/api/FetchPostById", { postId: id });
        if (response.data.success) {
          setPost(response.data.post);
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        setError("Error fetching post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="flex items-center justify-center h-screen text-lg font-semibold">Loading post...</p>;
  if (error) return <p className="flex items-center justify-center h-screen text-lg font-semibold text-red-500" >{error}</p>;
  if (!post) return <p className="flex items-center justify-center h-screen text-lg font-semibold">Post not found.</p>;

  const userId = session?.user._id;
  const isLiked = post.likes.includes(userId);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4 mb-28">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">By {post.author}</p>
      <p className="text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.media && (
        <img
          src={post.media}
          alt="Post Media"
          className="h-fit rounded-lg mt-4 mx-auto"
        />
      )}
      <div className="mt-4">
        <p className="text-lg">{post.content}</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-500">Categories: {post.category.join(", ")}</p>
       
        <Button variant="outline" className="flex items-center space-x-2">
          <LikeTheBlog
            initialLikes={post.likes.length}
            Liked={isLiked}
            _id={userId}
            postId={post._id}
          />
        </Button>
      </div>
    </div>
  );
};

export default PostDetails;
