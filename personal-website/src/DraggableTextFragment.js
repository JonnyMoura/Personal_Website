// DraggableTextFragment.js
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';


const DraggableTextFragment = ({ id, text, position, onDrag, onStop }) => {
  const fragmentRef = useRef(null);
  

  const [{ xy }, set] = useSpring(() => {
    const rect = fragmentRef.current ? fragmentRef.current.getBoundingClientRect() : { width: 0, height: 0 };
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    return { xy: [position.x, position.y], config: { friction: 100 } };
  });

  const bind = useGesture({
    onDrag: ({ offset: [x, y], xy: [currentX, currentY] }) => {
      if (fragmentRef.current) {
        set({ xy: [currentX + x, currentY + y] });
        onDrag(id, { x, y });
       
      }
    },
    onDragEnd: ({ offset: [x, y] }) => {
      onStop(id, { x, y });
      
    },
    
  });
  

  return (
    <animated.div
      {...bind()}
      ref={fragmentRef}
      style={{
        position: 'absolute',
        userSelect: 'none',
        cursor: 'grab',
        padding: '5px',
        fontFamily: 'Brulia',
        background: 'transparent',
        color: 'white',
        zIndex: 1, // Set to be the top layer
        transform: xy.interpolate((x, y) =>
          `translate3d(${clamp(x, 0, window.innerWidth - 100)}px, ${clamp(y, 0, window.innerHeight - 30)}px, 0)`
        ),
      }}
    >
      {text}
    </animated.div>
  );
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default DraggableTextFragment;
