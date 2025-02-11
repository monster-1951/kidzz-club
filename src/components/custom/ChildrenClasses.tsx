// app/components/ChildrenClasses.tsx
import Link from 'next/link';
import { childrenClasses } from '@/constants/ClassesForChildren'; // Import the array

export default function ChildrenClasses() {
  return (
    <div className="p-6 mb-24">
      <h1 className="text-2xl font-bold mb-6">Classes for Children</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childrenClasses.map((cls, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{cls.className}</h2>
            <p className="text-gray-600 mb-2">{cls.classObjective}</p>
            <p className="text-sm text-gray-500 mb-4">{cls.classDescription}</p>
            <div className="text-sm mb-2">
              <span className="font-medium">Time:</span> {cls.time}
            </div>
            <div className="text-sm mb-2">
              <span className="font-medium">Date:</span> {cls.date}
            </div>
            <div className="text-sm mb-4">
              <span className="font-medium">Host:</span> {cls.hostName}
            </div>
            <Link
              href={`/Classes/${index}`} // Dynamic route based on index
              className="bg-[#eedb8e] text-black hover:bg-[#f6d44c] px-4 py-2 rounded-md  transition-colors"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}