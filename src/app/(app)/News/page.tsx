"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { newsData } from "@/constants/news";

// Define the news data type
interface NewsItem {
  headline: string;
  content: string;
  summary: string;
  imageUrl: string;
}

// Sample news data with image URLs


const News: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-24">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Kids' News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <div  key={index} className="bg-white shadow-lg rounded-lg p-4">
            <Image
              src={news.imageUrl}
              alt={news.headline}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <Link  href={`/News/${index}`}>
            <h2 className="text-xl font-semibold mt-4">{news.headline}</h2>
          </Link>
            <p className="text-gray-600 mt-2">{news.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
