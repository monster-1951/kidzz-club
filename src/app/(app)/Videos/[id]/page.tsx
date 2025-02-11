import { videos } from "@/constants/videos";


interface VideoPageProps {
  params: {
    id: string;
  };
}

const VideoPage = ({ params }: VideoPageProps) => {
  const video = videos.find((v) => v.id === params.id);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`} // Replace with actual video URL
            className="w-full h-full rounded-lg shadow-lg"
            allowFullScreen
          />
        </div>
        <div className="mt-6">
          <p className="text-gray-600">{video.channel}</p>
          <p className="text-gray-500 text-sm">
            {video.views} views • {video.duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;