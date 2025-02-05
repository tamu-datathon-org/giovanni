import React from "react";
import Image from "next/image";

const organizers = [
  {
    name: "John Doe",
    role: "Event Coordinator",
    imageUrl: "/images/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "Technical Lead",
    imageUrl: "/images/jane_smith.jpg",
  },
  {
    name: "Alice Johnson",
    role: "Marketing Head",
    imageUrl: "/images/alice_johnson.jpg",
  },
];

export default function TeamMembers() {
  return (
    <div className="h-full w-full items-center justify-center bg-blue-200 p-4">
      <div className="rounded-lg border-4 bg-white/90 p-4">
        <h1 className="text-3xl font-bold mb-4">Meet the Organizers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {organizers.map((organizer, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={organizer.imageUrl}
                alt={organizer.name}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h2 className="text-xl font-semibold mt-2">{organizer.name}</h2>
              <p className="text-gray-600">{organizer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}