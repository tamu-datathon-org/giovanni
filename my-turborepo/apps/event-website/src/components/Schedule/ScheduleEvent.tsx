// "use client";
// import { useState } from "react";

// // interface Event {
// //     id: string | number;
// //     date: string;
// //     title: string;
// //     description: string;

// // }

// interface Event {
//     day: string | number;
//     id: string | number;
//     startTime: string;
//     endTime: string;
//     title: string;
//     location: string;
// }

// interface ScheduleEventProps {
//     event: Event;
// }

// export default function ScheduleEvent({ event }: ScheduleEventProps) {
//     const [expanded, setExpanded] = useState(false);

//     function formatTime(dateString: string) {
//         const d = new Date(dateString);
//         if (isNaN(d.getTime())) return dateString;
//         let hours = d.getHours();
//         const minutes = String(d.getMinutes()).padStart(2, "0");
//         const ampm = hours >= 12 ? "PM" : "AM";
//         hours = hours % 12 || 12; // convert to 12-hour format
//         return `${hours}:${minutes} ${ampm}`;
//     }




//     return (
//         <div className="w-full bg-[#F5EDE4] rounded-lg shadow-lg overflow-hidden">
//             {/* heading  */}
//             <div className="bg-[#F5EDE4] p-6 border-b-4 border-black">
//                 <div>
//                     <p className="text-sm text-gray-600">{formatTime(event.startTime)}</p>
//                     <h2 className="text-lg font-semibold">{event.title}</h2>
//                 </div>
//                 <span
//                     className={`text-sm text-gray-500 transition-transform ${
//                         expanded ? "rotate-180" : ""
//                     }`}
//                 >
//           ▼
//         </span>
//             </div>

//             {expanded && (
//                 <div className="mt-3 border-t border-gray-200 pt-3 text-gray-700 animate-fadeIn">
//                     <p className="whitespace-pre-wrap">{event.description}</p>
//                 </div>
//             )}
//         </div>
//     );


// }
