"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionTitle } from "@vanni/ui/section-title";

import ScrollStats from "./ScrollStats";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="text-body-color dark:text-body-color-dark mb-5 flex items-center text-lg font-medium">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white dark:bg-transparent"
    >
      {/* Pinned container with stats */}
      <div ref={pinContainerRef} className="flex min-h-screen flex-col">
        <div className="pt-16 md:pt-20 lg:pt-28">
          <div className="container">
            <div className="border-body-color/[.5] border-b pb-8 dark:border-white/[.5] md:pb-12 lg:pb-16">
              <div className="-mx-4 flex flex-wrap items-center justify-center">
                <div className="flex w-full flex-col justify-center px-4 lg:w-1/2">
                  <SectionTitle
                    title="About Us"
                    paragraph="We are the largest data science and machine learning focused hackathon in Texas located at Texas A&M University in College Station."
                    mb="44px"
                  />

                  <div
                    className="mb-12 max-w-[570px] lg:mb-0"
                    data-wow-delay=".15s"
                  >
                    <div className="mx-[-12px] flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                        <List text="Located in Texas" />
                        <List text="Data Science Based" />
                        <List text="Main Event in Fall" />
                      </div>
                      <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                        <List text="TD Lite in Spring" />
                        <List text="Sponsored Challenges" />
                        <List text="All Experiences Welcome" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-2/3 px-4 lg:w-1/2">
                  <div className="relative mx-auto flex aspect-[25/24] max-w-[400px] justify-center">
                    <ScrollStats progress={scrollProgress} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section Two Content */}
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full p-4 text-center lg:w-1/2">
              <div className="max-w-[700px]">
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Innovate Through Challenge
                  </h3>
                  <p className="text-body-color dark:text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                    We believe in challenge-based problem solving instead of
                    traditional themes. Participants gain industry-relevant
                    skills by working on real-world challenges. Designed for
                    both beginners and experienced individuals.
                  </p>

                  <p className="text-body-color dark:text-body-color-dark pt-6 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                    TAMU Datathon offers workshops, mentorship, and resources to
                    help participants enhance their data science and machine
                    learning skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div
          className={`flex flex-1 items-end justify-center pb-8 transition-opacity duration-500 ${scrollProgress > 0.9 ? "opacity-0" : "opacity-100"}`}
        >
          <div className="text-body-color dark:text-body-color-dark flex flex-col items-center gap-2">
            <span className="text-sm">Keep scrolling</span>
            <div className="animate-bounce">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
