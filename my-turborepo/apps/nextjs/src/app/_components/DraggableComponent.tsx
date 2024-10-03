"use client";

import React from "react";
import Draggable from "react-draggable";
import WindowContainer from "~/app/_components/WindowContainer";
import {ExitButton, Lines, TAMUy2k} from "~/app/_components/preregistration-form";
import {toast} from "~/hooks/use-toast";

const DraggableComponent: React.FC = () => {
  return (
      <Draggable handle=".handle" bounds="parent" positionOffset={{ x: '-50%', y: '-50%' }}>
          <div className="handle">
              <WindowContainer>
                  <div className="text-2xl text-cyan-700 pb-2">WELCOME TO</div>
                  <TAMUy2k/>
              </WindowContainer>
          </div>
      </Draggable>
  );
};

export default DraggableComponent;
