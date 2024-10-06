"use client";
// import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CreatePostForm, PostCardSkeleton, PostList } from "./_components/posts";
import { Suspense, useState } from "react";
import { api } from "~/trpc/server";
import WindowContainer from "./_components/WindowContainer";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import IconList from "./_components/IconList";
import DraggableComponent from "./_components/DraggableComponent";
import React from "react";
import { TAMUy2k } from "./_components/preregistration-form";

// import { api } from "~/trpc/server";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(true);

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-full h-full ">

            {/* Welcome Component */}

            <DraggableComponent onFocus={setActiveWindow} name="welcome" focus={activeWindow} className="absolute top-1/4 left-1/4">
              <WindowContainer isOpen={welcomeOpen} openFunc={setWelcomeOpen} >
                <TAMUy2k />
                <h1 className="mb-4 text-4xl">Welcome!!!</h1>
                {/* <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                    <Link href="/apply/application">Click here to apply now.</Link>
                  </Button> */}
              </WindowContainer>
            </DraggableComponent>


            {/* Apply Component */}
            <DraggableComponent onFocus={setActiveWindow} name="apply" focus={activeWindow} className="absolute top-1/3 left-1/2">
              <WindowContainer isOpen={applyOpen} openFunc={setApplyOpen} >
                <h1 className="mb-4 text-4xl m-6">Applications are open!!!</h1>
                <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                  <Link href="/apply/application">Click here to apply now.</Link>
                </Button>
              </WindowContainer>
            </DraggableComponent>
          </div>

          <IconList welcFunc={setWelcomeOpen} applyFunc={setApplyOpen} className="absolute bottom-20 flex z-50" />
        </div>
      </div >
    </>
  );
}
