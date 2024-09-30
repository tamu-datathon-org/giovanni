'use client';
import React from 'react';
import Draggable from 'react-draggable';

const DraggableComponent: React.FC = () => {
    return (
        <Draggable>
            <div
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'skyblue',
                    textAlign: 'center',
                    lineHeight: '100px',
                    borderRadius: '10px',
                    cursor: 'move',
                }}
            >
                Drag me
            </div>
        </Draggable>
    );
};

export default DraggableComponent;
