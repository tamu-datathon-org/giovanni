'use client';
import "./_components/customCss.scss";
import DraggableComponent from "./_components/DraggableComponent";
// import { Suspense } from "react";
import { redirect } from "next/navigation";
import WindowContainer from "~/app/_components/WindowContainer";
import Draggable from "react-draggable";
import {TAMUy2k} from "~/app/_components/preregistration-form";
import React from "react";
import Image from "next/image";

// import { api } from "~/trpc/server";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  // redirect("/registration");
  return(
      <main
          className="font-XPfont bg-large-device flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat">
          <Draggable handle=".handle" bounds="parent" defaultPosition={{x: -300, y: -50}}>
              <div className="handle">
                  <WindowContainer>
                      <div className="text-2xl text-cyan-700 pb-2">
                          <span>
                              FAQ
                          </span>
                      </div>
                  </WindowContainer>
              </div>
          </Draggable>
          <Draggable handle=".handle" bounds="parent" defaultPosition={{x: -500, y: -300}}>
              <div className="handle">
                  <WindowContainer>
                      <div className="text-2xl text-cyan-700 pb-2">
                          <Image
                              src="/Pixel_PolarBear.png"
                              className=""
                              width={200}
                              height={200}
                              alt="polar bear"
                          />
                      </div>
                  </WindowContainer>
              </div>
          </Draggable>
          <Draggable handle=".handle" bounds="parent" defaultPosition={{x: 0, y: 0}}>
              <div className="handle">
                  <WindowContainer>
                      <div className="text-2xl text-cyan-700 pb-2">WELCOME TO</div>
                      <TAMUy2k/>
                  </WindowContainer>
              </div>
          </Draggable>
      </main>
  )

    // You can await this here if you don't want to show Suspense fallback below
    // const posts = api.post.all();
    //
    // return (
    //   <main className="container h-screen py-16">
    //     <div className="flex flex-col items-center justify-center gap-4">
  //       <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
  //         Create <span className="text-primary">T3</span> Turbo
  //       </h1>
  //
  //       <CreatePostForm />
  //       <div className="w-full max-w-2xl overflow-y-scroll">
  //         <Suspense
  //           fallback={
  //             <div className="flex w-full flex-col gap-4">
  //               <PostCardSkeleton />
  //               <PostCardSkeleton />
  //               <PostCardSkeleton />
  //             </div>
  //           }
  //         >
  //           <PostList posts={posts} />
  //         </Suspense>
  //       </div>
  //     </div>
  //   </main>
  // );
}
