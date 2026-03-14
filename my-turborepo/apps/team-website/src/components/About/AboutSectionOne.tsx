"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionTitle } from "@vanni/ui/section-title";

//TODO:change it

import ScrollStats from "./ScrollStats";

gsap.registerPlugin(ScrollTrigger);

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="text-body-color dark:text-body-color-dark mb-5 flex items-center text-lg font-medium">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary/10 text-primary">
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
        onUpdate: (self) => setScrollProgress(self.progress),
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
      {/* ================= PINNED SECTION ================= */}
      <div ref={pinContainerRef} className="flex min-h-screen flex-col">
        <div className="pt-16 md:pt-20 lg:pt-28">
          <div className="container">
            <div className="border-body-color/50 border-b pb-16 dark:border-white/50">
              <div className="-mx-4 flex flex-wrap items-center justify-center">
                {/* LEFT */}
                <div className="flex w-full flex-col px-4 lg:w-1/2">
                  <SectionTitle
                    title="About Us"
                    paragraph="We are the largest data science and machine learning focused hackathon in Texas, hosted at Texas A&M University in College Station."
                    mb="44px"
                  />

                  <div className="max-w-[570px]">
                    <div className="mx-[-12px] flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2">
                        <List text="Located in Texas" />
                        <List text="Data Science Based" />
                        <List text="Main Event in Fall" />
                      </div>
                      <div className="w-full px-3 sm:w-1/2">
                        <List text="TD Lite in Spring" />
                        <List text="Sponsored Challenges" />
                        <List text="All Experiences Welcome" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="w-2/3 px-4 lg:w-1/2">
                  <div className="relative mx-auto flex aspect-[25/24] max-w-[400px] justify-center">
                    {/* Ambient Glow */}
                    <div className="absolute -z-10 h-72 w-72 animate-[slowFloat_14s_ease-in-out_infinite] rounded-full bg-primary/20 blur-3xl" />
                    <ScrollStats progress={scrollProgress} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MISSION STATEMENT ================= */}
        <div className="container flex w-full flex-row">
          <div className="container py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">
                Our Mission
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Build real-world data scientists through real-world problems
              </h2>
              <p className="text-body-color dark:text-body-color-dark mt-6 text-lg leading-relaxed">
                TAMU Datathon bridges academia and industry by immersing
                students in authentic, high-impact data challenges - empowering
                them to build, learn, and innovate with purpose.
              </p>
            </div>
          </div>

          {/* ================= SECTION TWO ================= */}
          <div className="container py-20">
            <div className="mx-auto max-w-[700px] text-center">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Innovate Through Challenge
              </h3>

              <p className="mb-10 text-sm uppercase tracking-widest text-primary">
                Everyone belongs here
              </p>

              <div className="grid gap-8 text-left sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    New to Data Science?
                  </h4>
                  <p className="text-body-color dark:text-body-color-dark">
                    Guided workshops, mentors, and beginner-friendly challenges
                    help you learn fast — no prior experience required.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Ready to Go Deeper?
                  </h4>
                  <p className="text-body-color dark:text-body-color-dark">
                    Open-ended challenges, real datasets, and industry judges
                    push you to build impactful, production-level solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SCROLL HINT ================= */}
        <div
          className={`flex flex-1 items-end justify-center pb-8 transition-opacity duration-500 ${
            scrollProgress > 0.9 ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-body-color dark:text-body-color-dark flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-widest">
              Discover the experience
            </span>
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
