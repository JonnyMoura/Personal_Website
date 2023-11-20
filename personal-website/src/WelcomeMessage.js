// WelcomeMessage.js
import React, { useState, useEffect } from 'react';


const WelcomeMessage = () => {
  const messages = [
    "Welcome to my personal page!",
    "Have fun customizing it and learning more about me!",
    "Click anywhere to start!"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [allMessagesShown, setAllMessagesShown] = useState(false);

  useEffect(() => {
    const fadeInOutTimer = setInterval(() => {
      if (fadeIn && opacity < 1) {
        setOpacity(opacity + 0.02);
      } else if (fadeIn && opacity >= 1) {
        clearInterval(fadeInOutTimer);
        setTimeout(() => {
          setFadeIn(false);
          setTimeout(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            setFadeIn(true);
          }, 3000); // Adjust the delay before starting fade-out
        }, 3000); // Adjust the delay before starting fade-out
      } else if (!fadeIn && opacity > 0) {
        setOpacity(opacity - 0.02);
      } else if (!fadeIn && opacity <= 0) {
        clearInterval(fadeInOutTimer);

        // Check if all messages have been shown
        if (currentMessageIndex === messages.length - 1) {
          setAllMessagesShown(true);
          
        }
      }
    }, 15); // Adjust the fade speed

    return () => clearInterval(fadeInOutTimer);
  }, [fadeIn, opacity, currentMessageIndex, messages ]);

  return allMessagesShown ? null : (
    <div className="welcome-message" style={{ opacity }}>
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default WelcomeMessage;
