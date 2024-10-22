"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import DraggableComponent from "./_components/DraggableComponent";
import FAQComponent from "./_components/FAQComponent";
import IconList from "./_components/IconList";
import { TAMUy2k } from "./_components/preregistration-form";
import WindowContainer from "./_components/WindowContainer";

export const runtime = "edge";

export default function HomePage() {
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex h-full w-full items-center justify-center lg:relative ">
            {/* FAQ Component */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="FAQ"
              focus={activeWindow}
              className="absolute lg:left-[50%] lg:top-[10%] "
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
              className="absolute lg:left-[40%] lg:top-[45%]"
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
              className="absolute lg:left-[20%] lg:top-[25%] "
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
            setFocus={setActiveWindow}
            className="absolute bottom-10 z-10 lg:bottom-20"
          />
        </div>
      </div>
    </>
  );
}
