// TextJoiningGame.js
import React, { useState, useRef, useEffect } from 'react';
import DraggableTextFragment from './DraggableTextFragment';

const getRandomPosition = (width, height) => ({
    x: Math.floor(Math.random() * (window.innerWidth - width)),
    y: Math.floor(Math.random() * (window.innerHeight - height)),
  })
const TextJoiningGame = () => {
    
    
    const fragmentWidth = 650; // Adjust the width of your text fragments
    const fragmentHeight = 30; // Adjust the height of your text fragments
    
    const [textFragments, setTextFragments] = useState([
      { id: 1, text: 'I my name is João Moura and i´m currently studying Design and Multimedia', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 2, text: 'although my background was in Computer Science.', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 3, text: 'I´m a huge enthusiast of various artforms such as:', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 4, text: ' Music, Literature and Cinema', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 5, text: ' and I try to apply the Computational background into these media', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 6, text: ' to create experimental and innovative designs.', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 7, text: ' Also an enjoyer of playing guitar, being a Radio Host at RUC and exploring new ideas and technologies.', position: getRandomPosition(fragmentWidth, fragmentHeight) },
      { id: 8, text: ' Have fun exploring the website!', position: getRandomPosition(fragmentWidth, fragmentHeight) },
    ])
  const fragmentRefs = useRef(textFragments.map(() => React.createRef()));

  const handleDrag = (id, data) => {
    // Handle drag event if needed
    // You can update the state here to reflect the dragged position
  };

  const handleStop = (id, data) => {
    const updatedFragments = textFragments.map((fragment) => {
      if (fragment.id === id) {
        return { ...fragment, position: { x: data.x, y: data.y } };
      }
      return fragment;
    });

    setTextFragments(updatedFragments);
  };

  useEffect(() => {
    fragmentRefs.current.forEach((ref, id) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        console.log(`Fragment ${id} position:`, rect);
      }
    });
  }, [textFragments]);

  return (
    <div style={{ position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {textFragments.map((fragment, index) => (
        <DraggableTextFragment
          key={fragment.id}
          id={fragment.id}
          text={fragment.text}
          position={fragment.position}
          onDrag={handleDrag}
          onStop={handleStop}
          ref={fragmentRefs.current[index]}
        />
      ))}
    </div>
  );
};

export default TextJoiningGame;
