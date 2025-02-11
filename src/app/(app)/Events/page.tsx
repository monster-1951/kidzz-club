"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eevents } from "@/constants/events"; // Import the events array from a separate file
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Events: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24">
      {Eevents.map((event,index) => (
        <Card
          key={index}
          className="shadow-lg rounded-xl overflow-hidden"
        >
          <Image
            src={event.eventImageUrl}
            alt={event.headline}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{event.headline}</h2>
            <p className="text-gray-600 mb-4">{event.eventInfo}</p>
            <div className="flex justify-between">
              <p className="my-auto">{event.eventDate}</p>
              <Link href={`/Events/${index}`} >
              <Button
              >
                Know More
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Events;
