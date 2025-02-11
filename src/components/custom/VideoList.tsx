'use client';
import Link from 'next/link';
import { videos } from '@/constants/videos';
import VideoCard from './VideoCard';
import { useEffect, useState } from 'react';

const VideoList = () => {
  const [Mode, setMode] = useState<string | null>('');
  const [suggestedVideos, setSuggestedVideos] = useState<string[]>([]); // Ensure ids are stored as strings

  useEffect(() => {
    const storedMode = typeof window !== 'undefined' ? localStorage.getItem('Mode') : null;
    setMode(storedMode);

    if (typeof window !== 'undefined') {
      const storedSuggestedVideos = localStorage.getItem('suggestedVideos');
      if (storedSuggestedVideos) {
        setSuggestedVideos(JSON.parse(storedSuggestedVideos));
      }
    }
  }, []);

  if (Mode === 'Parent Mode') {
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
    console.log(suggestedVideos);
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mb-28">
          {videos?.map((video) => {
            if (suggestedVideos.includes(video.id)) {
              return (
                <Link key={video.id} href={`/Videos/${video.id}`}>
                  <VideoCard video={video} />
                </Link>
              );
            }
          })}
        </div>
        {suggestedVideos.length === 0 && (
          <div className="text-red-500 font-bold mx-auto w-fit">
            No videos suggested by your parent. Ask them to suggest.
          </div>
        )}
      </>
    );
  }
};

export default VideoList;
