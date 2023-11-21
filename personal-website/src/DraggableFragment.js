// DraggableFragment.js
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const DraggableFragment = ({ id, content, position, onDrag, onStop, isImage }) => {
  const fragmentRef = useRef(null);

  const [{ xy, opacity }, set] = useSpring(() => ({
    xy: [position.x, position.y],
    opacity: 0,
    config: { friction: 150},
  }));

  // Trigger the fade-in effect on component mount
  React.useEffect(() => {
    set({ opacity: 1 });
  }, [set]);

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

  const handleImageLoad = () => {
    // Calculate the maximum allowed positions based on the size of the image and the window dimensions
    const rect = fragmentRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    // Update the spring animation with the new constraints
    set({
      xy: [
        clamp(xy.get()[0], 0, maxX),
        clamp(xy.get()[1], 0, maxY),
      ],
    });
  };

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
        zIndex: 1, 
        opacity,
  
        transform: xy.interpolate((x, y) =>
          `translate3d(${clamp(x, 0, window.innerWidth - 100)}px, ${clamp(y, 0, window.innerHeight - 30)}px, 0)`
        ),
      }}
    >
      {isImage ? (
        <img
          src={content}
          alt={`Image ${id}`}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          onLoad={handleImageLoad}
        />
      ) : (
        <span style={{ color: 'white', pointerEvents: 'none' }}>{content}</span>
      )}
    </animated.div>
  );
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default DraggableFragment;
