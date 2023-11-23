// TextJoiningGame.js
import React, { useState, useRef, useEffect } from 'react';
import DraggableFragment from './DraggableFragment';

const getRandomPosition = (width, height) => ({
    x: Math.floor(Math.random() * (window.innerWidth - width)),
    y: Math.floor(Math.random() * (window.innerHeight - height)),
  })
const TextJoiningGame = () => {
    
    
  const fragmentWidth = 450
  const fragmentHeight =20
    

    
    const [fragments, setFragments] = useState([
      { id: 1, content: 'Hi my name is João Moura and i´m currently studying Design and Multimedia', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false },
      { id: 2, content: 'although my background was in Computer Science.', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 3, content: 'I´m a huge enthusiast of various artforms such as:', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 4, content: ' Music, Literature and Cinema', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 5, content: ' and I try to apply the Computational background into these media', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false },
      { id: 6, content: ' to create experimental and innovative designs.', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 7, content: ' Also an enjoyer of playing guitar, being a Radio Host at RUC and exploring new ideas and technologies.', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 8, content: ' Have fun exploring the website!', position: getRandomPosition(fragmentWidth, fragmentHeight),isImage: false  },
      { id: 9, content: require('./slices/image1.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 10, content: require('./slices/image2.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id:11, content: require('./slices/image3.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 12, content: require('./slices/image4.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id:13, content: require('./slices/image5.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 14, content: require('./slices/image6.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 15, content: require('./slices/image7.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 16, content: require('./slices/image8.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },
      { id: 17, content: require('./slices/image9.png'), position: getRandomPosition(fragmentWidth, fragmentHeight), isImage: true },

    ])
    const fragmentRefs = useRef(fragments.map(() => React.createRef()));

    const handleDrag = (id, data) => {
      const { x, y } = data;
  
      // Calculate boundaries to prevent dragging out of the viewport
      const maxX = window.innerWidth - fragmentWidth;
      const maxY = window.innerHeight - fragmentHeight;
  
      // Clamp the new position within the boundaries
      const clampedX = Math.min(maxX, Math.max(0, x));
      const clampedY = Math.min(maxY, Math.max(0, y));
  
      setFragments((prevFragments) =>
        prevFragments.map((fragment) =>
          fragment.id === id ? { ...fragment, position: { x: clampedX, y: clampedY } } : fragment
        )
      );
    };

    const handleStop = (id, data) => {
      
    };
  
    useEffect(() => {
      fragmentRefs.current.forEach((ref, id) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          console.log(`Fragment ${id} position:`, rect);
        }
      });
    }, [fragments]);
  
    return (
      <div style={{ position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {fragments.map((fragment, index) => (
          <DraggableFragment
            key={fragment.id}
            id={fragment.id}
            content={fragment.content}
            position={fragment.position}
            onDrag={handleDrag}
            onStop={handleStop}
            isImage={fragment.isImage}
            ref={fragmentRefs.current[index]}
          />
  
      ))}
    </div>
  );
};


export default TextJoiningGame;
