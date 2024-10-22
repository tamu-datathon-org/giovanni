"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion'

import { Button } from "~/components/ui/button";
import DraggableComponent from "./_components/DraggableComponent";
import FAQComponent from "./_components/FAQComponent";
import IconList from "./_components/IconList";
import { TAMUy2k } from "./_components/preregistration-form";
import WindowContainer from "./_components/WindowContainer";

export const runtime = "edge";

const logos = [
  "/company_Logos/C1_Logo.png",
  "/company_Logos/GM_Logo.png",
  "/company_Logos/Chevron_Logo.png",
  "/company_Logos/66_Logo.png",
  "/company_Logos/Baker_Logo.png",
  "/company_Logos/Qualcomm_Logo.png",
  "/company_Logos/SailPoint_Logo.png",
  "/company_Logos/TAMUIDS_Logo.png",
];

const prizes = [
  { img: "/prizes/escooter.jpg", name: "Electric Scooter" },
  { img: "/prizes/keyboard.jpg", name: "Keychron Keyboard" },
  { img: "/prizes/polaroid.webp", name: "FujiFilm Camera" },
  { img: "/prizes/drawing_tablet.jpg", name: "Drawing Tablet" },
  { img: "/prizes/air_frier.jpg", name: "Air Frier" },
];

export default function HomePage() {
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(true);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [prizesOpen, setPrizesOpen] = useState(false);

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex h-full w-full items-center justify-center lg:relative ">

            {/* Prizes Window */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="Prizes"
              focus={activeWindow}
              className="absolute lg:left-[1%] lg:top-[2%]"
            >
              <WindowContainer isOpen={prizesOpen} openFunc={setPrizesOpen}>
                <motion.h1
                  className="my-4 text-4xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  THE PRIZES!!!
                </motion.h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
                  {prizes.map((prize, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <Image
                          src={prize.img}
                          alt={prize.name}
                          width={100}
                          height={100}
                          className="max-w-full max-h-full rounded-md object-contain"
                        />
                      </div>
                      <motion.div
                        className="text-center font-medium text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                      >
                        {prize.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                {/* </div> */}
              </WindowContainer>
            </DraggableComponent>

            {/* Sponsor Window */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="Sponsor"
              focus={activeWindow}
              className="absolute lg:left-[5%] lg:top-[50%]"
            >
              <WindowContainer isOpen={sponsorOpen} openFunc={setSponsorOpen}>
                <motion.h1
                  className="my-4 text-4xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  Our Sponsors!
                </motion.h1>
                {/* <div className="w-[200px] h-[100px]"> Set a fixed size for the carousel container */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                  {logos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}>
                      <Image
                        src={logo}
                        alt={logo}
                        width={100}
                        height={100}
                        className="max-w-full max-h-20 object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
                {/* </div> */}
              </WindowContainer>
            </DraggableComponent>

            {/* FAQ Component */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="FAQ"
              focus={activeWindow}
              className="absolute lg:left-[48%] lg:top-[5%] "
            >
              <WindowContainer isOpen={faqOpen} openFunc={setFaqOpen}>
                <FAQComponent />
              </WindowContainer>
            </DraggableComponent>

            {/* Apply Page */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="Apply"
              focus={activeWindow}
              className="absolute lg:left-[40%] lg:top-[50%]"
            >
              <WindowContainer isOpen={applyOpen} openFunc={setApplyOpen}>
                <style jsx global>{`
                  :root {
                    --color-start: #0e7490;
                    --color-end: #2dd4bf;
                  }
                  @keyframes color-change {
                    0%,
                    100% {
                      color: var(--color-start);
                    }
                    50% {
                      color: var(--color-end);
                    }
                  }
                  .animate-color-change {
                    animation: color-change 2s ease-in-out infinite;
                  }
                `}</style>

                <h1 className="animate-color-change m-2 text-3xl font-bold lg:m-6 lg:mb-4 lg:text-5xl">
                  Applications are open!!!
                </h1>
                <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                  <Link href="/apply/application">
                    Click here to apply now.
                  </Link>
                </Button>
              </WindowContainer>
            </DraggableComponent>

            {/* Welcome Component */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="Welcome"
              focus={activeWindow}
              className="absolute lg:left-[18%] lg:top-[25%] "
            >
              <WindowContainer isOpen={welcomeOpen} openFunc={setWelcomeOpen}>
                <TAMUy2k />
                <h1 className="mb-4 text-4xl">Welcome!!!</h1>
                <h3>Memorial Student Center - Bethancourt Ballroom (MSC 2300)</h3>
                <h3>Nov 9-10</h3>
                {/* <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                    <Link href="/apply/application">Click here to apply now.</Link>
                  </Button> */}
              </WindowContainer>
            </DraggableComponent>
          </div>

          <IconList
            welcFunc={setWelcomeOpen}
            applyFunc={setApplyOpen}
            faqFunc={setFaqOpen}
            sponFunc={setSponsorOpen}
            prizeFunc={setPrizesOpen}
            setFocus={setActiveWindow}
            className="absolute bottom-10 z-10 lg:bottom-20"
          />
        </div>
      </div >
    </>
  );
}
