"use client";

import React from "react";
import { isMobile } from "react-device-detect";
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
      disabled={isMobile}
      onDrag={() => {
        onFocus(name);
      }}
    >
      <div
        className={`h-fit w-fit cursor-move overflow-hidden ${focus === name ? "z-40" : "z-10"} ${className}`}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
