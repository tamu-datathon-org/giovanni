'use client';
import React from 'react';
import Draggable from 'react-draggable';

const DraggableComponent: React.FC = () => {
    return (
        <Draggable handle=".handle" bounds="parent">
            <div>
                <div className="bg-red-800 handle">
                    Drag from here
                </div>
                <div>This readme is really dragging on...</div>
            </div>
        </Draggable>
    );
};

export default DraggableComponent;
