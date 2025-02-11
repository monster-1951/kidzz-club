"use client";
import Link from "next/link";
import { videos } from "@/constants/videos";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";

const VideoList = () => {
  const [Mode, setMode] = useState<string | null>("");
  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
  });
  if (Mode == "Parent Mode") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mb-28">
        {videos?.map((video) => (
          <Link key={video.id} href={`/Videos/${video.id}`}>
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    );
  } else {
    const suggestedVideos = JSON.parse(
      localStorage.getItem("suggestedVideos") || "[]"
    );
    console.log(suggestedVideos);
    return (
      <>
        {suggestedVideos.length == 0 && (
          <div className="text-center w-fit font-bold text-2xl mx-auto p-3 text-red-500 ">
            No videos suggested by your parents. Ask them to suggest!
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mb-28">
          {videos?.map((video) => {
            if (suggestedVideos.includes(video.id))
              return (
                <Link key={video.id} href={`/Videos/${video.id}`}>
                  <VideoCard video={video} />
                </Link>
              );
          })}
        </div>
      </>
    );
  }
};

export default VideoList;
