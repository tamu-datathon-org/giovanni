"use client";

import React from "react";
import Draggable from "react-draggable";

interface DraggableComponentProps {
  children: React.ReactNode;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ children }) => {
  return (
    <Draggable >
      <div className="h-min-content w-min-content overflow-hidden cursor-move"
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
