"use client";

import { useEffect, useRef, useState } from "react";

import StatSectionImages from "./StatSectionImages";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const oldTextRef = useRef<HTMLDivElement | null>(null);
  const newTextRef = useRef<HTMLHeadingElement | null>(null);
  const imageWrapperRef1 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef2 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef3 = useRef<HTMLDivElement | null>(null);

  const [isNarrow, setNarrowState] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const isNarrowRef = useRef(isNarrow);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !oldTextRef.current ||
      !newTextRef.current ||
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
          isNarrowRef.current = isNarrow;
          const imageRefs = [
            imageWrapperRef1.current,
            imageWrapperRef2.current,
            imageWrapperRef3.current,
          ];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=200%",
              scrub: 1,
              pin: true,
            },
          });

          tl.to(oldTextRef.current, {
            scale: isNarrow ? 100 : 77,
            yPercent: isNarrow ? -1400 : -800,
            xPercent: isNarrow ? -355 : 0,
            ease: "power2.in",
            duration: 0.6,
          })
            .to(
              sectionRef.current,
              { backgroundColor: "#2d69df", duration: 0.0 },
              "=0",
            )
            .to(
              newTextRef.current,
              { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 },
              ">",
            )
            .to({}, { duration: 0.2 })
            .set([imageRefs[1], imageRefs[2]], { y: "100vh" }, ">")
            .to(imageRefs[0], { y: 0, duration: 0.5, ease: "power2.out" }, ">")
            .to(imageRefs[1], { y: 0, duration: 0.5, ease: "power2.out" }, ">")
            .to(imageRefs[2], { y: 0, duration: 0.5, ease: "power2.out" }, ">");

          const scrollTrigger = tl.scrollTrigger;
          const onResize = () => {
            ScrollTrigger.refresh();
            const narrow = window.innerWidth < 768;
            if (narrow !== isNarrowRef.current) {
              isNarrowRef.current = narrow;
              setNarrowState(narrow);
            }
          };
          window.addEventListener("resize", onResize);
          killTimeline = () => {
            tl.kill();
            scrollTrigger?.kill();
            window.removeEventListener("resize", onResize);
          };
        });
      },
    );

    return () => {
      killed = true;
      killTimeline?.();
    };
  }, [isNarrow]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("team");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="bg-neutral-90 relative h-screen w-full overflow-hidden"
      >
        <div className="relative z-0 flex h-full w-full items-center justify-center px-4">
          {/* Old text — tamudatathon */}
          <div
            ref={oldTextRef}
            className="absolute flex flex-col items-center lg:flex-row"
            style={{ transformOrigin: "center center" }}
          >
            {/* TAMU SVG — viewBox matches path bounds so path fills allocated space */}
            <svg
              viewBox="0 10.28 106.69 35.57"
              preserveAspectRatio="xMidYMid meet"
              className="text-datalightblue dark:text-datalightblue m-2 h-[18vw] w-auto shrink-0 [paint-order:stroke_fill] lg:h-[9vw]"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <path d="M12.01 41.33L12.65 45.21Q10.79 45.61 9.33 45.61Q6.93 45.61 5.62 44.85Q4.30 44.09 3.76 42.86Q3.22 41.63 3.22 37.67L3.22 22.75L0 22.75L0 19.34L3.22 19.34L3.22 12.92L7.59 10.28L7.59 19.34L12.01 19.34L12.01 22.75L7.59 22.75L7.59 37.92Q7.59 39.79 7.82 40.33Q8.06 40.87 8.58 41.19Q9.11 41.50 10.08 41.50Q10.82 41.50 12.01 41.33ZM33.23 42.07Q30.79 44.14 28.53 45.00Q26.27 45.85 23.68 45.85Q19.41 45.85 17.11 43.76Q14.82 41.67 14.82 38.43Q14.82 36.52 15.69 34.95Q16.55 33.37 17.96 32.42Q19.36 31.47 21.12 30.98Q22.41 30.64 25.02 30.32Q30.35 29.69 32.86 28.81Q32.89 27.91 32.89 27.66Q32.89 24.98 31.64 23.88Q29.96 22.39 26.64 22.39Q23.54 22.39 22.06 23.47Q20.58 24.56 19.87 27.32L15.58 26.73Q16.16 23.97 17.50 22.28Q18.85 20.58 21.39 19.67Q23.93 18.75 27.27 18.75Q30.59 18.75 32.67 19.53Q34.74 20.31 35.72 21.50Q36.69 22.68 37.08 24.49Q37.30 25.61 37.30 28.54L37.30 34.40Q37.30 40.53 37.59 42.15Q37.87 43.77 38.70 45.26L34.11 45.26Q33.42 43.90 33.23 42.07M32.86 32.25Q30.47 33.23 25.68 33.91Q22.97 34.30 21.85 34.79Q20.73 35.28 20.12 36.22Q19.51 37.16 19.51 38.31Q19.51 40.06 20.84 41.24Q22.17 42.41 24.73 42.41Q27.27 42.41 29.25 41.30Q31.23 40.19 32.15 38.26Q32.86 36.77 32.86 33.86L32.86 32.25ZM44.12 45.26L44.12 19.34L48.05 19.34L48.05 22.97Q49.27 21.07 51.29 19.91Q53.32 18.75 55.91 18.75Q58.79 18.75 60.63 19.95Q62.48 21.14 63.23 23.29Q66.31 18.75 71.24 18.75Q75.10 18.75 77.17 20.89Q79.25 23.02 79.25 27.47L79.25 45.26L74.88 45.26L74.88 28.93Q74.88 26.29 74.45 25.13Q74.02 23.97 72.90 23.27Q71.78 22.56 70.26 22.56Q67.53 22.56 65.72 24.38Q63.92 26.20 63.92 30.20L63.92 45.26L59.52 45.26L59.52 28.42Q59.52 25.49 58.45 24.02Q57.37 22.56 54.93 22.56Q53.08 22.56 51.50 23.54Q49.93 24.51 49.22 26.39Q48.51 28.27 48.51 31.81L48.51 45.26L44.12 45.26ZM102.76 45.26L102.76 41.46Q99.73 45.85 94.53 45.85Q92.24 45.85 90.25 44.97Q88.26 44.09 87.29 42.76Q86.33 41.43 85.94 39.50Q85.67 38.21 85.67 35.40L85.67 19.34L90.06 19.34L90.06 33.72Q90.06 37.16 90.33 38.35Q90.75 40.09 92.09 41.08Q93.43 42.07 95.41 42.07Q97.39 42.07 99.12 41.05Q100.85 40.04 101.57 38.29Q102.29 36.55 102.29 33.23L102.29 19.34L106.69 19.34L106.69 45.26L102.76 45.26Z" />
            </svg>

            {/* DATATHON SVG — viewBox matches path bounds so path fills allocated space */}
            <svg
              viewBox="0 9.47 189.48 36.38"
              preserveAspectRatio="xMidYMid meet"
              className="text-datadarkblue dark:text-datadarkblue h-[18vw] w-auto shrink-0 overflow-visible [paint-order:stroke_fill] lg:ml-4 lg:h-[9vw] "
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18.41 45.26L18.41 41.99Q15.94 45.85 11.16 45.85Q8.06 45.85 5.46 44.14Q2.86 42.43 1.43 39.37Q0 36.30 0 32.32Q0 28.44 1.29 25.28Q2.59 22.12 5.18 20.43Q7.76 18.75 10.96 18.75Q13.31 18.75 15.14 19.74Q16.97 20.73 18.12 22.31L18.12 9.47L22.49 9.47L22.49 45.26L18.41 45.26M4.52 32.32Q4.52 37.30 6.62 39.77Q8.72 42.24 11.57 42.24Q14.45 42.24 16.47 39.88Q18.48 37.52 18.48 32.69Q18.48 27.37 16.43 24.88Q14.38 22.39 11.38 22.39Q8.45 22.39 6.48 24.78Q4.52 27.17 4.52 32.32ZM46.31 42.07Q43.87 44.14 41.61 45.00Q39.36 45.85 36.77 45.85Q32.50 45.85 30.20 43.76Q27.91 41.67 27.91 38.43Q27.91 36.52 28.77 34.95Q29.64 33.37 31.04 32.42Q32.45 31.47 34.20 30.98Q35.50 30.64 38.11 30.32Q43.43 29.69 45.95 28.81Q45.97 27.91 45.97 27.66Q45.97 24.98 44.73 23.88Q43.04 22.39 39.72 22.39Q36.62 22.39 35.14 23.47Q33.67 24.56 32.96 27.32L28.66 26.73Q29.25 23.97 30.59 22.28Q31.93 20.58 34.47 19.67Q37.01 18.75 40.36 18.75Q43.68 18.75 45.75 19.53Q47.83 20.31 48.80 21.50Q49.78 22.68 50.17 24.49Q50.39 25.61 50.39 28.54L50.39 34.40Q50.39 40.53 50.67 42.15Q50.95 43.77 51.78 45.26L47.19 45.26Q46.51 43.90 46.31 42.07M45.95 32.25Q43.55 33.23 38.77 33.91Q36.06 34.30 34.94 34.79Q33.81 35.28 33.20 36.22Q32.59 37.16 32.59 38.31Q32.59 40.06 33.92 41.24Q35.25 42.41 37.82 42.41Q40.36 42.41 42.33 41.30Q44.31 40.19 45.24 38.26Q45.95 36.77 45.95 33.86L45.95 32.25ZM66.80 41.33L67.43 45.21Q65.58 45.61 64.11 45.61Q61.72 45.61 60.40 44.85Q59.08 44.09 58.54 42.86Q58.01 41.63 58.01 37.67L58.01 22.75L54.79 22.75L54.79 19.34L58.01 19.34L58.01 12.92L62.38 10.28L62.38 19.34L66.80 19.34L66.80 22.75L62.38 22.75L62.38 37.92Q62.38 39.79 62.61 40.33Q62.84 40.87 63.37 41.19Q63.89 41.50 64.87 41.50Q65.60 41.50 66.80 41.33ZM88.01 42.07Q85.57 44.14 83.31 45.00Q81.05 45.85 78.47 45.85Q74.19 45.85 71.90 43.76Q69.60 41.67 69.60 38.43Q69.60 36.52 70.47 34.95Q71.34 33.37 72.74 32.42Q74.15 31.47 75.90 30.98Q77.20 30.64 79.81 30.32Q85.13 29.69 87.65 28.81Q87.67 27.91 87.67 27.66Q87.67 24.98 86.43 23.88Q84.74 22.39 81.42 22.39Q78.32 22.39 76.84 23.47Q75.37 24.56 74.66 27.32L70.36 26.73Q70.95 23.97 72.29 22.28Q73.63 20.58 76.17 19.67Q78.71 18.75 82.06 18.75Q85.38 18.75 87.45 19.53Q89.53 20.31 90.50 21.50Q91.48 22.68 91.87 24.49Q92.09 25.61 92.09 28.54L92.09 34.40Q92.09 40.53 92.37 42.15Q92.65 43.77 93.48 45.26L88.89 45.26Q88.21 43.90 88.01 42.07M87.65 32.25Q85.25 33.23 80.47 33.91Q77.76 34.30 76.64 34.79Q75.51 35.28 74.90 36.22Q74.29 37.16 74.29 38.31Q74.29 40.06 75.62 41.24Q76.95 42.41 79.52 42.41Q82.06 42.41 84.03 41.30Q86.01 40.19 86.94 38.26Q87.65 36.77 87.65 33.86L87.65 32.25ZM108.50 41.33L109.13 45.21Q107.28 45.61 105.81 45.61Q103.42 45.61 102.10 44.85Q100.78 44.09 100.24 42.86Q99.71 41.63 99.71 37.67L99.71 22.75L96.48 22.75L96.48 19.34L99.71 19.34L99.71 12.92L104.08 10.28L104.08 19.34L108.50 19.34L108.50 22.75L104.08 22.75L104.08 37.92Q104.08 39.79 104.31 40.33Q104.54 40.87 105.07 41.19Q105.59 41.50 106.57 41.50Q107.30 41.50 108.50 41.33ZM112.79 45.26L112.79 9.47L117.19 9.47L117.19 22.31Q120.26 18.75 124.95 18.75Q127.83 18.75 129.96 19.89Q132.08 21.02 133.00 23.02Q133.91 25.02 133.91 28.83L133.91 45.26L129.52 45.26L129.52 28.83Q129.52 25.54 128.09 24.04Q126.66 22.53 124.05 22.53Q122.09 22.53 120.37 23.55Q118.65 24.56 117.92 26.29Q117.19 28.03 117.19 31.08L117.19 45.26L112.79 45.26ZM138.96 32.30Q138.96 25.10 142.97 21.63Q146.31 18.75 151.12 18.75Q156.47 18.75 159.86 22.25Q163.26 25.76 163.26 31.93Q163.26 36.94 161.76 39.81Q160.25 42.68 157.39 44.26Q154.52 45.85 151.12 45.85Q145.68 45.85 142.32 42.36Q138.96 38.87 138.96 32.30M143.48 32.30Q143.48 37.28 145.65 39.76Q147.83 42.24 151.12 42.24Q154.39 42.24 156.57 39.75Q158.74 37.26 158.74 32.15Q158.74 27.34 156.56 24.87Q154.37 22.39 151.12 22.39Q147.83 22.39 145.65 24.85Q143.48 27.32 143.48 32.30ZM168.41 45.26L168.41 19.34L172.36 19.34L172.36 23.02Q175.22 18.75 180.62 18.75Q182.96 18.75 184.92 19.59Q186.89 20.43 187.87 21.80Q188.84 23.17 189.23 25.05Q189.48 26.27 189.48 29.32L189.48 45.26L185.08 45.26L185.08 29.49Q185.08 26.81 184.57 25.48Q184.06 24.15 182.75 23.35Q181.45 22.56 179.69 22.56Q176.88 22.56 174.84 24.34Q172.80 26.12 172.80 31.10L172.80 45.26L168.41 45.26Z" />
            </svg>
          </div>

          {/* New text — appears after old text fades */}
          <h1
            ref={newTextRef}
            id="about"
            className="absolute mx-16 h-auto max-w-5xl origin-center scale-90 text-center text-3xl font-extrabold tracking-tight text-black opacity-0 will-change-transform sm:mx-24 sm:text-3xl md:text-6xl lg:text-6xl"
          >
            We are the largest data science and machine learning focused
            hackathon in Texas!
          </h1>
        </div>

        {/* StatSection images — start off-screen right, slide in only after text has shown; z-index above text so they cover it */}
        <StatSectionImages
          refs={{
            imageWrapperRef1,
            imageWrapperRef2,
            imageWrapperRef3,
          }}
        />

        <button
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-white transition-opacity hover:opacity-80 dark:text-white"
        >
          <div className="animate-bob motion-reduce:animate-none max-md:animate-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </section>
    </>
  );
};

export default Hero;
