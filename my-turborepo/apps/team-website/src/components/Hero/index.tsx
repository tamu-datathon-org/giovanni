"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import type { CarouselApi } from "~/components/ui/carousel";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "~/components/ui/carousel";
import Squares from "../Squares";

gsap.registerPlugin(ScrollTrigger);

const mascotImages = [
  { src: "/mascot/floatbear.png", alt: "Floating Bear" },
  { src: "/mascot/DETECTIVE BEARTHOLOMEW.png", alt: "Detective Beartholomew" },
  { src: "/mascot/DrippalowmewV3_4K.png", alt: "Drippalowmew" },
  { src: "/mascot/Pixel_PolarBear.png", alt: "Pixel Polar Bear" },
  { src: "/mascot/td Datathon mascot chibi.svg", alt: "Datathon Mascot Chibi" },
  { src: "/mascot/TDEMOTE_bearglasses_4K.png", alt: "Bear with Glasses" },
  { src: "/mascot/image.png", alt: "Squid Bear" },
];

const Hero = () => {
  // const [api, setApi] = useState<CarouselApi>();

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     api.scrollNext();
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [api]);

  const mascotContainerRef = useRef<HTMLDivElement>(null);
  const animationTweensRef = useRef<gsap.core.Tween[]>([]);
  const angleMapRef = useRef<Map<Element, number>>(new Map());

  const getOvalParams = () => {
    if (!mascotContainerRef.current || typeof window === "undefined") {
      return null;
    }

    // Get container dimensions for accurate centering
    const container = mascotContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Responsive center position - true center of the viewport
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Image dimensions (200px base, but will be scaled)
    const baseImageSize = 200;

    // Responsive scaling based on screen size
    let initialScale: number;
    if (window.innerWidth < 640) {
      initialScale = 0.4;
    } else if (window.innerWidth < 768) {
      initialScale = 0.5;
    } else if (window.innerWidth < 1024) {
      initialScale = 0.65;
    } else {
      initialScale = 0.8;
    }

    const scaledImageSize = baseImageSize * initialScale;

    // Horizontal radius
    const radiusX =
      window.innerWidth < 640
        ? window.innerWidth * 0.32
        : window.innerWidth < 768
          ? window.innerWidth * 0.36
          : window.innerWidth < 1024
            ? window.innerWidth * 0.38
            : window.innerWidth * 0.4;

    // Vertical radius
    const radiusY =
      window.innerHeight < 640
        ? window.innerHeight * 0.22
        : window.innerHeight < 768
          ? window.innerHeight * 0.24
          : window.innerHeight < 1024
            ? window.innerHeight * 0.27
            : window.innerHeight * 0.3;

    return {
      centerX,
      centerY,
      radiusX,
      radiusY,
      scaledImageSize,
      initialScale,
    };
  };

  useGSAP(() => {
    if (!mascotContainerRef.current || typeof window === "undefined") return;

    const mascotElements =
      mascotContainerRef.current.querySelectorAll(".mascot-image");
    const totalMascots = mascotElements.length;

    // Kill any existing animations
    animationTweensRef.current.forEach((tween) => tween.kill());
    animationTweensRef.current = [];
    angleMapRef.current.clear();

    const ovalParams = getOvalParams();
    if (!ovalParams) return;

    const {
      centerX,
      centerY,
      radiusX,
      radiusY,
      scaledImageSize,
      initialScale,
    } = ovalParams;

    mascotElements.forEach((mascot, index) => {
      // Initial angle offset - evenly distribute mascots around the oval
      const initialAngle = (index / totalMascots) * Math.PI * 2;

      // Store initial angle in map
      angleMapRef.current.set(mascot, initialAngle);

      // Set initial position
      const initialX =
        centerX + Math.cos(initialAngle) * radiusX - scaledImageSize / 2;
      const initialY =
        centerY + Math.sin(initialAngle) * radiusY - scaledImageSize / 2;

      gsap.set(mascot, {
        x: initialX,
        y: initialY,
        scale: initialScale,
        opacity: 0.75,
        transformOrigin: "center center",
      });

      // Create continuous rotation animation around the oval
      // Each mascot rotates at a slightly different speed for visual interest
      const rotationSpeed = 100; // 20-40 seconds per full rotation

      // Animate the rotation angle using a proxy object
      const angleProxy = { value: initialAngle };
      const targetAngle = initialAngle + Math.PI * 2;

      // Animate the angle value
      const tween = gsap.to(angleProxy, {
        value: targetAngle,
        duration: rotationSpeed,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const currentAngle = angleProxy.value;
          angleMapRef.current.set(mascot, currentAngle);
          const x =
            centerX + Math.cos(currentAngle) * radiusX - scaledImageSize / 2;
          const y =
            centerY + Math.sin(currentAngle) * radiusY - scaledImageSize / 2;

          gsap.set(mascot, {
            x: x,
            y: y,
          });
        },
      });

      animationTweensRef.current.push(tween);
    });
  }, []);

  // Handle window resize - restart animations with new parameters
  useEffect(() => {
    const handleResize = () => {
      // Small delay to ensure resize is complete
      setTimeout(() => {
        if (!mascotContainerRef.current || typeof window === "undefined")
          return;

        const mascotElements =
          mascotContainerRef.current.querySelectorAll(".mascot-image");
        const totalMascots = mascotElements.length;

        // Kill existing animations
        animationTweensRef.current.forEach((tween) => tween.kill());
        animationTweensRef.current = [];

        const ovalParams = getOvalParams();
        if (!ovalParams) return;

        const {
          centerX,
          centerY,
          radiusX,
          radiusY,
          scaledImageSize,
          initialScale,
        } = ovalParams;

        mascotElements.forEach((mascot, index) => {
          // Get current angle from map or calculate initial
          const savedAngle = angleMapRef.current.get(mascot);
          const currentAngle =
            savedAngle ?? (index / totalMascots) * Math.PI * 2;
          const initialAngle = currentAngle % (Math.PI * 2);

          // Update scale immediately
          gsap.set(mascot, {
            scale: initialScale,
            transformOrigin: "center center",
          });

          // Update stored angle
          angleMapRef.current.set(mascot, initialAngle);

          const rotationSpeed = 20 + (index % 3) * 10;

          // Use proxy object for angle animation
          const angleProxy = { value: initialAngle };
          const targetAngle = initialAngle + Math.PI * 2;

          const tween = gsap.to(angleProxy, {
            value: targetAngle,
            duration: rotationSpeed,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              const currentAngleValue = angleProxy.value;
              angleMapRef.current.set(mascot, currentAngleValue);
              const x =
                centerX +
                Math.cos(currentAngleValue) * radiusX -
                scaledImageSize / 2;
              const y =
                centerY +
                Math.sin(currentAngleValue) * radiusY -
                scaledImageSize / 2;

              gsap.set(mascot, {
                x: x,
                y: y,
              });
            },
          });

          animationTweensRef.current.push(tween);
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative h-screen overflow-hidden pb-[4] pt-16 md:pb-[40px] md:pt-[80px] xl:pb-[40px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[30px]"
      >
        {/* Squares Background */}
        <div className="absolute inset-0 z-[-1] h-full w-full">
          <Squares
            speed={0.6}
            squareSize={50}
            direction="down"
            borderColor="lightblue"
            hoverFillColor="#222"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[-1] bg-black/40 dark:bg-black/60"></div>

        {/* Mascot Images Container - Parallax Bounce Animation */}
        <div
          ref={mascotContainerRef}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        >
          {mascotImages.map((mascot, index) => (
            <div
              key={index}
              className="mascot-image absolute"
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              <Image
                className="h-full w-full object-contain shadow-none"
                src={mascot.src || "/placeholder.svg"}
                alt={mascot.alt}
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center px-4">
            {/* Centered Title and Text */}
            <div className="w-full max-w-4xl text-center">
              <div className="relative">
                <h1 className="w-full py-2 text-5xl font-bold leading-tight text-black dark:text-white sm:leading-tight md:text-9xl md:leading-tight">
                  <span className="text-datalightblue dark:text-datalightblue">
                    tamu
                  </span>
                  <span className="text-datadarkblue dark:text-datadarkblue">
                    datathon
                  </span>
                </h1>
                <p className="text-body-color dark:text-body-color-dark mb-12 text-center text-base !leading-relaxed sm:text-lg md:text-xl">
                  We are the largest data science and machine learning focused
                  hackathon in Texas located at Texas A&M University in College
                  Station.
                </p>
              </div>
            </div>

            {/* Right Column - Mascot Carousel */}
            {/* <div className="w-full px-4 pr-16">
              <div className="flex h-fit w-full items-center justify-center">
                <Carousel
                  setApi={setApi}
                  className="h-full w-full max-w-[400px] "
                  opts={{
                    loop: true,
                    align: "center",
                  }}
                >
                  <CarouselContent>
                    {mascotImages.map((mascot, index) => (
                      <CarouselItem key={index}>
                        <div className="flex items-center justify-center">
                          <Image
                            className="animate-float duration-2000 h-full w-full shadow-none"
                            src={mascot.src || "/placeholder.svg"}
                            alt={mascot.alt}
                            width={600}
                            height={600}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div> */}
          </div>
        </div>

        {/* Scroll Arrow */}
        <button
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-white transition-opacity hover:opacity-80 dark:text-white"
        >
          <div className="animate-bob">
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
        {/* <div className="absolute right-0 top-0 z-[2] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[2] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div> */}
      </section>
    </>
  );
};

export default Hero;
