// Slideshow.js
import React, { useState, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './Slideshow.css';

const images = [
  require('./Link_Images/IMG_4159.png'),
  require('./Link_Images/IMG_4312_COLORS.png'),
  require('./Link_Images/IMG_4376.jpg'),
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  const props = useSprings(
    images.length,
    images.map((_, i) => ({
      opacity: i === index ? 1 : 0,
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
          />
        ))}
      </div>
      <div className="arrow-container">
        <div className="arrow left" onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}>
          {'<'}
        </div>
        <div className="arrow right" onClick={() => setIndex((prev) => (prev + 1) % images.length)}>
          {'>'}
        </div>
      </div>
    </>
  );
};

export default Slideshow;
