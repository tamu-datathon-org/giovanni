"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  { img: "/prizes/air_fryer.jpg", name: "Air Fryer" },
  { img: "/prizes/ipad.png", name: "iPad" },
  { img: "/prizes/g305_mouse.png", name: "Logitech Mouse" },
  { img: "/prizes/anker_speaker.jpg", name: "Anker Blueetooth Speaker" },
  { img: "/prizes/firestick.jpg", name: "Amazon Fire Stick" },
  { img: "/prizes/echo_dot.webp", name: "Amazon Echo Dot" },
  { img: "/prizes/power_bank.jpg", name: "Power Bank" },
  { img: "/prizes/owala_bottle.webp", name: "Owala Water Bottle" },
  { img: "/prizes/apple_air_tag.jpg", name: "Apple Airtag" },
  { img: "/prizes/wireless_charger.jpg", name: "Wireless Charging Pad" },
];

export default function HomePage() {
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(true);
  const [socialsOpen, setSocialsOpen] = useState(false);

  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [prizesOpen, setPrizesOpen] = useState(false);
  const setScheduleOpen = () => {
    window.location.href = "/schedule";
  };
  const setChallenegesOpen = () => {
    window.location.href = "/challenges";
  };
  const setHelpQueueOpen = () => {
    window.location.href = "https://helpqueue.tamudatathon.com/";
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <Link
        id="mlh-trust-badge"
        className="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
        target="_blank"
      >
        <img
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
          alt="Major League Hacking 2025 Hackathon Season"
          className="w-full"
        />
      </Link>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex h-full w-full items-center justify-center lg:relative ">
            {/* Prize Window */}
            <DraggableComponent
                onFocus={setActiveWindow}
                name="Prizes"
                focus={activeWindow}
                className="absolute max-h-full max-w-full lg:left-[1%] lg:top-[2%]"
            >
              <WindowContainer isOpen={prizesOpen} openFunc={setPrizesOpen}>
                <motion.h1
                    className="my-4 text-4xl"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                  THE PRIZES!!!
                </motion.h1>
                <div
                  style={{ overflowY: "auto" }}
                  className="grid max-h-[400px] grid-cols-2 gap-4 overflow-y-visible p-4 sm:grid-cols-3"
                >
                  {prizes.map((prize, index) => (
                      <motion.div
                          key={index}
                          className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-card bg-white p-3 shadow-md transition-shadow duration-300 hover:shadow-lg"
                          initial={{opacity: 0, scale: 0.8}}
                          animate={{
                            opacity: mounted ? 1 : 0,
                            scale: mounted ? 1 : 0.8,
                          }}
                          transition={{duration: 0.5, delay: index * 0.1}}
                          whileHover={{scale: 1.05}}
                      >
                        <div className="mb-4 flex items-center justify-center">
                          <Image
                              src={prize.img}
                              alt={prize.name}
                              width={75}
                              height={75}
                              className="max-h-full max-w-full rounded-md object-contain"
                          />
                        </div>
                        <motion.div
                            className="text-center font-medium text-primary"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.3, delay: index * 0.1 + 0.3}}
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
                className="absolute max-h-full max-w-full lg:left-[5%] lg:top-[50%]"
            >
              <WindowContainer isOpen={sponsorOpen} openFunc={setSponsorOpen}>
                <motion.h1
                    className="my-4 text-4xl"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                  Our Sponsors!
                </motion.h1>
                {/* <div className="w-[200px] h-[100px]"> Set a fixed size for the carousel container */}
                <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
                  {logos.map((logo, index) => (
                      <motion.div
                          key={index}
                          className="flex items-center justify-center rounded-md bg-gray-50 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
                          initial={{opacity: 0, scale: 0.8}}
                          animate={{
                            opacity: mounted ? 1 : 0,
                            scale: mounted ? 1 : 0.8,
                          }}
                          transition={{duration: 0.5, delay: index * 0.1}}
                          whileHover={{scale: 1.05}}
                      >
                        <Image
                            src={logo}
                            alt={logo}
                            width={100}
                            height={100}
                            className="max-h-20 max-w-full object-contain"
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
                className="absolute top-[5%] max-h-full lg:left-[48%] lg:top-[5%]"
            >
              <WindowContainer isOpen={faqOpen} openFunc={setFaqOpen}>
                <FAQComponent/>
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

                {/*<h1 className="animate-color-change m-2 text-3xl font-bold lg:m-6 lg:mb-4 lg:text-5xl">*/}
                {/*  Applications are open!!!*/}
                {/*</h1>*/}
                {/*<Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">*/}
                {/*  <Link href="/apply/application">*/}
                {/*    Click here to apply now.*/}
                {/*  </Link>*/}
                {/*</Button>*/}

                <h1 className="m-2 text-3xl font-bold lg:m-6 lg:mb-4 lg:text-5xl">
                  Applications have closed.
                </h1>
                <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                  <Link href="/apply">Check status</Link>
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
                <TAMUy2k/>
                <h1 className="mb-4 text-4xl">Welcome!!!</h1>
                <h3>
                  Memorial Student Center - Bethancourt Ballroom (MSC 2300)
                </h3>
                <h3>Nov 9-10</h3>
                {/* <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                    <Link href="/apply/application">Click here to apply now.</Link>
                  </Button> */}
              </WindowContainer>
            </DraggableComponent>

            {/* Socials component */}
            <DraggableComponent
                onFocus={setActiveWindow}
                name="Socials"
                focus={activeWindow}
                className="absolute lg:left-[60%] lg:top-[25%] "
            >
              <WindowContainer isOpen={socialsOpen} openFunc={setSocialsOpen}>
                <div className="m-6 flex flex-col gap-4">
                  <h1 className="text-3xl font-bold lg:text-5xl">Socials!!</h1>
                  <div className="flex w-64 flex-col">
                    <Link
                        href="https://discord.gg/pHsNmjuWSc"
                        className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                      Discord Server Link
                    </Link>
                    <Link
                        href="https://www.instagram.com/tamudatathon/"
                        className="compStyling border border-black bg-[#f5f5f5] px-4 text-black hover:bg-[#e4e3e4] hover:text-black"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </WindowContainer>
            </DraggableComponent>
          </div>

          <IconList
            welcFunc={setWelcomeOpen}
            faqFunc={setFaqOpen}
            sponFunc={setSponsorOpen}
            prizeFunc={setPrizesOpen}
            socialsFunc={setSocialsOpen}
            setFocus={setActiveWindow}
            helpQueueFunc={setHelpQueueOpen}

            scheduleFunc={setScheduleOpen}
            challengesFunc={setChallenegesOpen}
            />
        </div>
      </div>
    </>
  );
}
