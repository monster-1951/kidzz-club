"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/constants/news";
import { Button } from "@/components/ui/button";

// Define the news data type

// Sample news data (same as in the News component)
const NewsDetails: React.FC = () => {
  const params = useParams();
  const newsIndex = parseInt(params.id as string, 10);
  const newsItem = newsData[newsIndex];

  if (!newsItem) {
    return (
      <div className="text-center text-red-500">News article not found!</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-24">
      <Link href="/News">
        <Button className="mb-4 px-4 py-2 bg-[#edf5e5] text-black rounded-lg">
          Back to News
        </Button>
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Image
          src={newsItem.imageUrl}
          alt={newsItem.headline}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-4">{newsItem.headline}</h1>
        <p className="text-gray-700 mt-4">{newsItem.content}</p>
      </div>
    </div>
  );
};

export default NewsDetails;
