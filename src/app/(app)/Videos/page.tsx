import VideoList from "@/components/custom/VideoList";

const VideoPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">Videos</h1>
      <VideoList />
    </div>
  );
};

export default VideoPage;