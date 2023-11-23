// DraggableFragment.js
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './DraggableFragments.css';

const DraggableFragment = ({ id, content, position, onDrag, onStop, isImage }) => {
  const fragmentRef = useRef(null);

  const [{ xy, opacity }, set] = useSpring(() => ({
    xy: [position.x, position.y],
    opacity: 0,
    config: { friction: 150 },
  }));

  
  React.useEffect(() => {
    set({ opacity: 1 });
  }, [set]);

  const bind = useGesture({
    onDrag: ({ offset: [x, y], xy: [currentX, currentY] }) => {
      if (fragmentRef.current) {
        
        const rect = fragmentRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        
        const clampedX = clamp(currentX + x, 0, maxX);
        const clampedY = clamp(currentY + y, 0, maxY);

        
        set({ xy: [clampedX, clampedY] });

        
        onDrag(id, { x: clampedX - currentX, y: clampedY - currentY });
      }
    },
  
  });

  const handleImageLoad = () => {
    
    const rect = fragmentRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    
    set({
      xy: [clamp(xy.get()[0], 0, maxX), clamp(xy.get()[1], 0, maxY)],
    });
  };

  return (
    <animated.div
      {...bind()}
      ref={fragmentRef}
      className={`fragment ${isImage ? 'image-fragment' : 'text-fragment'}`}
      style={{
        opacity,
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
      }}
    >
      {isImage ? (
        <img
          src={content}
          alt={`Image ${id}`}
          style={{ width: '100%', height: '100%', pointerEvents: 'none', opacity: '0.7' }}
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
