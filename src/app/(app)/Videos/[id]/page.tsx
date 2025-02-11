"use client";
import { Button } from "@/components/ui/button";
import { videos } from "@/constants/videos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface VideoPageProps {
  params: {
    id: string;
  };
}

const VideoPage = () => {
  const [suggestion, setsuggestion] = useState("Suggest this video to my kid");
  const { id } = useParams(); // Use useParams directly, no need to await it
  const video = videos.find((v) => v.id === id);
  const [Mode, setMode] = useState<string | null>("");
  useEffect(() => {
    const suggestedVideos = JSON.parse(
      localStorage.getItem("suggestedVideos") || "[]"
    );
    if (!suggestedVideos.includes(id)) {
      setsuggestion(" Suggest this video to my kid");
    } else {
      setsuggestion("Remove from Suggestion");
      console.log("Already suggested");
    }
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);
  });
  const SuggestThisVideoToKid = () => {
    const suggestedVideos = JSON.parse(
      localStorage.getItem("suggestedVideos") || "[]"
    );
    if (!suggestedVideos.includes(id)) {
      suggestedVideos.push(id);
      console.log(suggestedVideos);
      localStorage.setItem("suggestedVideos", JSON.stringify(suggestedVideos));
      // setsuggestion(" Suggest this video to my kid");
    } else {
      // setsuggestion("Remove from Suggestion");
      const newArr = suggestedVideos.filter((item:string) => item !== id)
      localStorage.setItem("suggestedVideos", JSON.stringify(newArr));
      console.log("Already suggested");
    }
  };

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 mb-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <div className="aspect-w-16 aspect-h-9">
          <video
            className="w-full max-w-4xl h-64 rounded-lg shadow-lg border border-gray-700"
            controls
            preload="none"
            poster={`/Vid/Thumbnails/${id}.jpg`}
          >
            <source src={`/Vid/videos/${id}.mp4`} type="video/mp4" />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the videos
          </video>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">{video.channel}</p>
          <p className="text-gray-500 text-sm">
            {video.views} views • {video.duration}
          </p>
        </div>
        {Mode == "Parent Mode" && (
          <div className="p-3 w-fit mx-auto ">
            <Button
              onClick={() => {
                SuggestThisVideoToKid();
              }}
              className=""
            >
             {suggestion}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
