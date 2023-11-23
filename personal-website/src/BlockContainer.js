// BlockContainer.js
import React, { useRef, useState } from 'react';
import DraggableBlock from './DraggableBlock';

const BlockContainer = () => {
  const tetrisPieces = [
    { id: 1, color: 'red', shape: 'I' },
    { id: 2, color: 'blue', shape: 'J' },
    { id: 3, color: 'green', shape: 'L' },
    { id: 4, color: 'yellow', shape: 'O' },
    { id: 5, color: 'purple', shape: 'S' },
    { id: 6, color: 'orange', shape: 'T' },
    { id: 7, color: 'cyan', shape: 'Z' },
    
  ];

  const getRandomPosition = () => ({
    top: Math.floor(Math.random() * window.innerHeight),
    left: Math.floor(Math.random() * window.innerWidth),
  });

  const [pieces, setPieces] = useState([]);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const handleBackgroundClick = (e) => {
    // Check if we are not dragging a piece
    if (!isDraggingRef.current) {
      // Check if the clicked element is part of a draggable block
      if (!e.target.closest('.react-draggable')) {
        const newPiece = tetrisPieces[Math.floor(Math.random() * tetrisPieces.length)];
        const containerRect = containerRef.current.getBoundingClientRect();

        const newPosition = {
          top: e.clientY - containerRect.top,
          left: e.clientX - containerRect.left,
        };

        setPieces((prevPieces) => [...prevPieces, { ...newPiece, style: newPosition }]);
      }
    }
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragStop = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      onClick={handleBackgroundClick}
    >
      {pieces.map((piece) => (
        <DraggableBlock
          key={piece.id}
          {...piece}
          onStart={handleDragStart}
          onStop={handleDragStop}
        />
      ))}
    </div>
  );
};

export default BlockContainer;
