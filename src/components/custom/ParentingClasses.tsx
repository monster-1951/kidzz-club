// app/components/Classes.tsx
import Link from "next/link";
import { parentingClasses } from "@/constants/parentingClasses"; // Import the array

export default function ParentingClasses() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Parenting Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parentingClasses.map((cls, index) => (
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
              className="bg-[#edf5e5] text-black px-4 py-2 rounded-md hover:bg-[#d2f5af] transition-colors"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
