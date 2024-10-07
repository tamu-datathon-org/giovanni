"use client";

import React from "react";
import Draggable from "react-draggable";

interface DraggableComponentProps {
  children: React.ReactNode;
  className?: string;
  onFocus: (arg0: string) => void;
  name: string;
  focus: string;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  children,
  onFocus,
  name,
  focus,
  className,
}) => {
  return (
    <Draggable
      onDrag={() => {
        onFocus(name);
        console.log(name, focus, name === focus);
      }}
    >
      <div
        className={`h-fit w-fit cursor-move overflow-hidden ${focus === name ? "z-50" : "z-10"} ${className}`}
        // style={{
        //   // width: 100,
        //   // height: 100,
        //   // backgroundColor: "skyblue",
        //   // textAlign: "center",
        //   // lineHeight: "100px",
        //   // borderRadius: "10px",

        //   cursor: "move",
        // }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
