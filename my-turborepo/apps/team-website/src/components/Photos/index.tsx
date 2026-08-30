"use client";

import { useEffect, useRef } from "react";

import StatSectionImages from "../Hero/StatSectionImages";

const ABOUT_US_SECTION_ID = "about-us";

const Photos = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef1 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef2 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef3 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !imageWrapperRef1.current ||
      !imageWrapperRef2.current ||
      !imageWrapperRef3.current
    ) {
      return;
    }

    let killed = false;
    let killTimeline: (() => void) | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (killed) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        requestAnimationFrame(() => {
          if (killed) return;

          const imageRefs = [
            imageWrapperRef1.current,
            imageWrapperRef2.current,
            imageWrapperRef3.current,
          ];

          // Start when About Us has fully left the viewport (bottom edge at top of screen).
          const aboutUsSection = document.getElementById(ABOUT_US_SECTION_ID);
          const scrollTriggerTarget = aboutUsSection ?? sectionRef.current;

          gsap.set(imageRefs[0], { y: 0 });
          gsap.set([imageRefs[1], imageRefs[2]], { y: "100dvh" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scrollTriggerTarget,
              start: aboutUsSection ? "bottom top" : "top top",
              end: "+=150%",
              pin: sectionRef.current,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: 0.15 })
            .to(imageRefs[1], { y: 0, duration: 0.5, ease: "power2.out" })
            .to(imageRefs[2], { y: 0, duration: 0.5, ease: "power2.out" });

          const scrollTrigger = tl.scrollTrigger;

          killTimeline = () => {
            tl.kill();
            scrollTrigger?.kill();
          };

          ScrollTrigger.refresh();
        });
      },
    );

    return () => {
      killed = true;
      killTimeline?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="photos"
      className="relative h-svh w-full overflow-hidden bg-[#2d69df]"
    >
      <StatSectionImages
        firstImageVisible
        refs={{
          imageWrapperRef1,
          imageWrapperRef2,
          imageWrapperRef3,
        }}
      />
    </section>
  );
};

export default Photos;
