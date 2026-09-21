"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const frames = [
  "/images/bear_frames/frame_1.png",
  "/images/bear_frames/frame_2.png",
  "/images/bear_frames/frame_3.png",
];

export default function FlickerImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgs = gsap.utils.toArray<HTMLElement>(
      containerRef.current!.children
    );

    const tl = gsap.timeline({ repeat: -1 });

    imgs.forEach((img, i) => {
      const next = imgs[(i + 1) % imgs.length];

      tl.to(img, { opacity: 1, duration: 0.3, ease: "power1.inOut" })  // fade in
        .to({}, { duration: 0.5 })                                     // hold
        .to(img, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, "+=0") // fade out
        .to(next, { opacity: 1, duration: 0.3, ease: "power1.inOut" }, "<"); // overlap next
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-[999] size-[300px]">
      {frames.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`frame ${i}`}
          fill
          priority
          sizes="300px"
          className="object-contain"
          style={{ opacity: i === 0 ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

// "use client";
// import { useRef, useEffect } from "react";
// import Image from "next/image";
// import gsap from "gsap";

// const frames = [
//   "/images/bear_frames/frame_1.png",
//   "/images/bear_frames/frame_2.png",
//   "/images/bear_frames/frame_3.png",
// ];

// export default function FlickerImage() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const imgs = gsap.utils.toArray<HTMLImageElement>(
//       containerRef.current!.children
//     );

//     const tl = gsap.timeline({ repeat: -1 });

//     imgs.forEach((img, i) => {
//       tl.set(imgs, { opacity: 0 })    // hide all
//         .set(img, { opacity: 1 })     // show current
//         .to({}, { duration: 0.40 });  // hold
//     });

//     return () => {tl.kill()};
//   }, []);

//   return (
//     <div ref={containerRef} className="relative z-[999] size-[240px]">
//       {frames.map((src, i) => (
//         <Image
//           key={i}
//           src={src}
//           alt={`frame ${i}`}
//           fill
//           priority
//           sizes="240px"
//           className="object-cover"
//           style={{ opacity: i === 0 ? 1 : 0 }}
//         />
//       ))}
//     </div>
//   );
// }

