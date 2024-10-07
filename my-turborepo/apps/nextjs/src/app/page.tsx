"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import DraggableComponent from "./_components/DraggableComponent";
import IconList from "./_components/IconList";
import { TAMUy2k } from "./_components/preregistration-form";
import WindowContainer from "./_components/WindowContainer";
import FaqComponent from "./_components/faqComponent";


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
          <div className="lg:relative h-full w-full flex justify-center items-center ">

            {/* FAQ Component */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="FAQ"
              focus={activeWindow}
              className="absolute lg:top-[10%] lg:left-[50%] "
            >
              <WindowContainer isOpen={faqOpen} openFunc={setFaqOpen}>
                <FaqComponent />
              </WindowContainer>
            </DraggableComponent>

            {/* Apply Page */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="apply"
              focus={activeWindow}
              className="absolute lg:top-[45%] lg:left-[40%]"
            >
              <WindowContainer isOpen={applyOpen} openFunc={setApplyOpen}>
                <h1 className="lg:m-6 lg:mb-4 lg:text-4xl">Applications are open!!!</h1>
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
              name="welcome"
              focus={activeWindow}
              className="absolute lg:left-[20%] lg:top-[25%] "
            >
              <WindowContainer isOpen={welcomeOpen} openFunc={setWelcomeOpen}>
                <TAMUy2k />
                <h1 className="mb-4 text-4xl">Welcome!!!</h1>
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
            className="absolute lg:bottom-20 bottom-10"
          />
        </div>
      </div >
    </>
  );
}
