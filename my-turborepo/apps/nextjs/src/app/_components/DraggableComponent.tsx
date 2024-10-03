"use client";

import React from "react";
import Draggable from "react-draggable";
import WindowContainer from "~/app/_components/WindowContainer";
import {ExitButton, Lines, TAMUy2k} from "~/app/_components/preregistration-form";
import {toast} from "~/hooks/use-toast";

const DraggableComponent: React.FC = () => {
  return (
      <Draggable handle=".handle" bounds="parent">
          <div className="handle">
              <WindowContainer>
                  hey
              </WindowContainer>
          </div>
      </Draggable>
  );
};

export default DraggableComponent;
