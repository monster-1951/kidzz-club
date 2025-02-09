"use client";
import { LikePost, UnLikePost } from "@/actions/LikePost";
import React, { useState } from "react";

interface LikeTheBlogProps {
  Liked: boolean;
  _id: string;
  postId: string;
  initialLikes: number;
}

const LikeTheBlog = ({ Liked, _id, postId, initialLikes }: LikeTheBlogProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(Liked);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);

  const handleLikeToggle = async () => {
    if (isLiked) {
      console.log("Clicked unlike");
      await UnLikePost(postId, _id);
      setLikesCount((prev) => prev - 1);
    } else {
      console.log("Clicked like");
      await LikePost(postId, _id);
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center space-x-2">
      <div onClick={handleLikeToggle} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isLiked ? "red" : "none"}
          stroke="currentColor"
          strokeWidth={isLiked ? 0 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`feather feather-heart ${isLiked ? "fill-red-600 outline-none" : ""}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <span className="text-sm text-gray-600">{likesCount} Likes</span>
    </div>
  );
};

export default LikeTheBlog;
