"use client";

import "./customCss.scss";

import type { MouseEventHandler, TouchEventHandler } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "~/components/ui/button";

// import IconList from "./IconList";

export function Lines() {
  return (
    <div className="w-full pr-3">
      {" "}
      {/**Random Lines */}
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
      <div className="my-[2px] h-[1px] bg-[#585958]"></div>
    </div>
  );
}

export function ExitButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onTouchEnd: TouchEventHandler<HTMLButtonElement>;
}) {
  // This button is only there for visual purposes
  return (
    <Button
      className="compStyling h-fit w-fit"
      onClick={props.onClick}
      onTouchEnd={props.onTouchEnd}
    >
      <AiOutlineClose className="close" color="black" />
    </Button>
  );
}

export function TAMUy2k() {
  return (
    <h1 className="p-5 pb-2.5 text-3xl lg:p-10 lg:pb-5 lg:text-6xl">
      <span className="odd:text-teal-400">T</span>
      <span className="even:text-cyan-700">A</span>
      <span className="odd:text-teal-400 ">M</span>
      <span className="even:text-cyan-700">U</span> Datathon
    </h1>
  );
}

export function TitleText() {
  return (
    <h1 className="p-10 pb-5 text-3xl md:text-6xl">
      <span className="odd:text-teal-400">T</span>
      <span className="even:text-cyan-700">A</span>
      <span className="odd:text-teal-400 ">M</span>
      <span className="even:text-cyan-700">U</span> Datathon Preregistration
    </h1>
  );
}