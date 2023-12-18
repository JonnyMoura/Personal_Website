// Slideshow.js
import React, { useState, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './Slideshow.css';

const images = [
  require('./Link_Images/IMG_4312_COLORS.png'),
  require('./Link_Images/IMG_4159.png'),
  require('./Link_Images/IMG_4376.jpg'),
  require('./Link_Images/IMG_4324.png'),
  require('./Link_Images/IMG_0947.JPG'),
  require('./Link_Images/IMG_0958.JPG'),
  require('./Link_Images/IMG_1000.JPG'),
  require('./Link_Images/IMG_4028.JPG'),
  require('./Link_Images/IMG_1084.JPG'),
  require('./Link_Images/IMG_4403.jpg'),
];

const logos = [
  { src: require('./Logos/LI-In-Bug.png'), hyperlink: 'https://www.linkedin.com/in/jo%C3%A3o-moura-7428b1291/' },
  { src: require('./Logos/behance.png'), hyperlink: 'https://www.behance.net/joomoura23' },
  { src: require('./Logos/github-logo.png'), hyperlink: 'https://github.com/JonnyMoura' },
];

const clickableAreas = [
  // Rectangle for IMG_4312_COLORS
  {
    index: 0,
    shape: 'rect',
    coordinates: { x: 35, y: 63, width: 10, height: 21 },
    hyperlink: 'https://www.linkedin.com/in/jo%C3%A3o-moura-7428b1291/',
  },
  // Rectangle for IMG_4159
  {
    index: 1,
    shape: 'rect',
    coordinates: { x: 7, y: 30, width: 12, height: 25 },
    hyperlink: 'https://www.behance.net/joomoura23',
  },
  // Circle for IMG_4324
  {
    index: 3,
    shape: 'circle',
    coordinates: { x: 28, y: 45.5, radius: 5 },
    hyperlink: 'https://github.com/JonnyMoura',
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
  }, []); 

  return (
    <>
      <div className="slideshow-container" {...bind()}>
        {props.map((style, i) => (
          <animated.div
            key={i}
            style={{
              ...style,
              backgroundImage: `url(${images[i]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {window.innerWidth >= 768 &&
              clickableAreas.map((area) =>
                area.index === i ? (
                  <div
                    key={area.index}
                    className={`clickable-area ${hoveredArea === area.index ? 'hover' : ''}`}
                    style={{
                      ...getClickableAreaStyle(area, hoveredArea === area.index),
                      zIndex: 2,
                    }}
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
      {window.innerWidth < 768 ? (
        <div className="logo-container">
          {logos.map((logo, i) => (
            <div key={i} className="logo" onClick={() => window.open(logo.hyperlink, '_blank')}>
              <img src={logo.src} alt={`Logo ${i + 1}`} />
            </div>
          ))}
        </div>
      ) : null}
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
}

export default Slideshow;

const getClickableAreaStyle = (area, isHovered) => {
  const baseStyle = {
    position: 'absolute',
    background: 'transparent',
  };

  switch (area.shape) {
    case 'rect':
      return {
        ...baseStyle,
        left: `${(area.coordinates.x / 100) * window.innerWidth}px`,
        top: `${(area.coordinates.y / 100) * window.innerHeight}px`,
        width: `${(area.coordinates.width / 100) * window.innerWidth}px`,
        height: `${(area.coordinates.height / 100) * window.innerHeight}px`,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderRadius: '10px',
      };
    case 'circle':
      return {
        ...baseStyle,
        left: `${((area.coordinates.x - area.coordinates.radius) / 100) * window.innerWidth}px`,
        top: `${((area.coordinates.y - area.coordinates.radius) / 100) * window.innerHeight}px`,
        width: `${(area.coordinates.radius * 2) / 100 * window.innerWidth}px`,
        height: `${(area.coordinates.radius * 4) / 100 * window.innerHeight}px`,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        borderRadius: '50%',
      };
    default:
      return baseStyle;
  }
};
