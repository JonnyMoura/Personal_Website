// Slideshow.js
import React, { useState, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './Slideshow.css';

const images = [
  require('./Link_Images/IMG_4159.png'),
  require('./Link_Images/IMG_4312_COLORS.png'),
  require('./Link_Images/IMG_4376.jpg'),
  require('./Link_Images/IMG_4324.png'),
];

const clickableAreas = [
  // Rectangle for IMG_4312_COLORS
  {
    index: 1,
    shape: 'rect',
    coordinates: { x: 35, y:65, width: 10, height: 21 },
    hyperlink: 'https://example.com/rect',
  },
  // Rectangle for IMG_4159
  {
    index: 0,
    shape: 'rect',
    coordinates: { x: 7, y: 30, width: 12, height: 25 },
    hyperlink: 'https://example.com/rect',
  },
  // Circle for IMG_4324
  {
    index: 3,
    shape: 'circle',
    coordinates: { x: 28, y: 45.5, radius: 5 },
    hyperlink: 'https://example.com/circle',
  },
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  const props = useSprings(
    images.length,
    images.map((_, i) => ({
      opacity: initialRender ? 0.0 : i === index ? 1 : 0,
      transform: `translateX(${(i - index) * 100}%)`,
      config: { tension: 120, friction: 30 },
    }))
  );

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx] }) => {
        if (mx > window.innerWidth / 4) {
          setIndex((prev) => (prev + 1) % images.length);
        } else if (mx < -window.innerWidth / 4) {
          setIndex((prev) => (prev - 1 + images.length) % images.length);
        }
      },
    },
    {
      drag: { filterTaps: true },
    }
  );

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      setIndex((prev) => (prev + 1) % images.length);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleMouseEnter = (area) => {
    setHoveredArea(area.index);
  };
  
  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  const handleTouchStart = (area) => {
    setHoveredArea(area.index);
  };

  const handleTouchEnd = () => {
    if (hoveredArea !== null) {
      setHoveredArea(null);
    }
  };
  const handleAreaClick = (area) => {
    window.open(area.hyperlink, '_blank');
  };

  useEffect(() => {
    if (initialRender) {
      // Set a timeout to trigger the opacity change after a short delay
      const timeout = setTimeout(() => {
        setInitialRender(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [initialRender]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Add an empty dependency array to ensure the effect runs only once

  return (
    <>
      <div className="slideshow-container" {...bind()}>
        {props.map((style, i) => (
          <animated.div
            key={i}
            style={{
              ...style,
              backgroundImage: `url(${images[i]})`,
            }}
          >
            {/* Render clickable areas */}
            {clickableAreas.map((area) =>
  area.index === i ? (
            <div
          key={area.index}
          className={`clickable-area ${hoveredArea === area.index ? 'hover' : ''}`}
          style={{ ...getClickableAreaStyle(area, hoveredArea === area.index), zIndex: 2 }}
          onMouseEnter={() => handleMouseEnter(area)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => handleTouchStart(area)}
          onTouchEnd={handleTouchEnd}
          onClick={() => handleAreaClick(area)}
        />

  ) : null
)}
          </animated.div>
        ))}
      </div>
      <div className="arrow-container">
        <div
          className={`arrow left ${hoveredArea === 'all' ? 'hover' : ''}`}
          onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
        >
          {'<'}
        </div>
        <div
          className={`arrow right ${hoveredArea === 'all' ? 'hover' : ''}`}
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        >
          {'>'}
        </div>
      </div>
    </>
  );
};

export default Slideshow;

const getClickableAreaStyle = (area, isHovered) => {
  const baseStyle = {
    position: 'absolute',
    background: 'transparent', // Make the shape transparent
    
  };

  switch (area.shape) {
    case 'rect':
      return {
        ...baseStyle,
        left: `${area.coordinates.x}%`,
        top: `${area.coordinates.y}%`,
        width: `${area.coordinates.width}%`,
        height: `${area.coordinates.height}%`,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderRadius: '10px', // Make the circle a perfect circle
      };
    case 'circle':
      return {
        ...baseStyle,
        left: `${area.coordinates.x - area.coordinates.radius}%`,
        top: `${area.coordinates.y - area.coordinates.radius}%`,
        width: `${area.coordinates.radius * 2}%`, // Set width to the same value as radius
        height: `${area.coordinates.radius * 4}%`, // Set height to the same value as radius
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        borderRadius: '50%', // Make the circle a perfect circle
      };
    default:
      return baseStyle;
  }
};
