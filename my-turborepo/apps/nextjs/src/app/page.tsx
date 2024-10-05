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

// import { api } from "~/trpc/server";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  // redirect("/registration");
  // You can await this here if you don't want to show Suspense fallback below
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex flex-col justify-center items-center h-screen">
          <DraggableComponent>
            <WindowContainer isOpen={welcomeOpen} openFunc={setWelcomeOpen}>
              <h1 className="mb-4 text-4xl">Welcome!!!</h1>
              <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                <Link href="/apply/application">Click here to apply now.</Link>
              </Button>
            </WindowContainer>
          </DraggableComponent>
          <IconList welcFunc={setWelcomeOpen} className="absolute bottom-10" />
        </div >
      </div >
    </>
  );
}
