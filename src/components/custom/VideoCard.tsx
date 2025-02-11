// Define the Video type if needed

import Image from "next/image";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    views: string;
    duration: string;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Image
        src={video.thumbnail}
        alt={video.title}
        className="w-fit h-48 mx-auto"
        width={1000}
        height={1000}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
        <p className="text-gray-600 text-sm">{video.channel}</p>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{video.views} views</span>
          <span>{video.duration}</span>
        </div>
      
      </div>
    </div>
  );
};

export default VideoCard;
