import Link from "next/link";
import { videos } from "@/constants/videos";
import VideoCard from "./VideoCard";

const VideoList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {videos?.map((video) => (
        <Link key={video.id} href={`/Videos/${video.id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;