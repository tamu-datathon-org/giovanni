"use client";

import React, { useState } from "react";
import Link from "next/link";

import FAQComponent from "~/app/faq/FAQComponent";
import { Button } from "~/components/ui/button";
import DraggableComponent from "./_components/DraggableComponent";
import IconList from "./_components/IconList";
import { TAMUy2k } from "./_components/preregistration-form";
import WindowContainer from "./_components/WindowContainer";

export const runtime = "edge";

export default function HomePage() {
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="relative h-full w-full ">
            {/* Welcome Component */}

            <DraggableComponent
              onFocus={setActiveWindow}
              name="welcome"
              focus={activeWindow}
              className="max-w-screen flex lg:absolute lg:left-1/4 lg:top-1/4 "
            >
              <WindowContainer isOpen={welcomeOpen} openFunc={setWelcomeOpen}>
                <TAMUy2k />
                <h1 className="mb-4 text-4xl">Welcome!!!</h1>
                {/* <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                    <Link href="/apply/application">Click here to apply now.</Link>
                  </Button> */}
              </WindowContainer>
            </DraggableComponent>

            {/* Apply Component */}
            <DraggableComponent
              onFocus={setActiveWindow}
              name="apply"
              focus={activeWindow}
              className="absolute left-1/2 top-1/3"
            >
              <WindowContainer isOpen={applyOpen} openFunc={setApplyOpen}>
                <h1 className="m-6 mb-4 text-4xl">Applications are open!!!</h1>
                <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                  <Link href="/apply/application">
                    Click here to apply now.
                  </Link>
                </Button>
              </WindowContainer>
            </DraggableComponent>
          </div>

          <DraggableComponent
            onFocus={setActiveWindow}
            name="faq"
            focus={activeWindow}
            className="absolute left-1/2 top-1/3"
          >
            <FAQComponent onFocus={setActiveWindow} focus={activeWindow} />
          </DraggableComponent>

          <IconList
            welcFunc={setWelcomeOpen}
            applyFunc={setApplyOpen}
            className="absolute bottom-20 flex "
          />
        </div>
      </div>
    </>
  );
}
