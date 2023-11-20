// DraggableBlock.js
import React from 'react';
import Draggable from 'react-draggable';

const DraggableBlock = ({ color, id, shape, style }) => {
  const blockStyle = {
    position: 'absolute',
    backgroundColor:  'transparent',
    border:  '1px solid white',
    
    ...style,
  };
  const getRandomColor = () => {
    const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    return randomColor;
  };
  switch (shape) {
    case 'I':
      blockStyle.width = '10vw';
      blockStyle.height = '5vh';
      break;
    case 'J':
      blockStyle.width = '20vw';
      blockStyle.height = '3vh';
      break;
    case 'L':
      blockStyle.width = '4vw';
      blockStyle.height = '20vh';
      break;
    case 'S':
      blockStyle.width = '15vw';
      blockStyle.height =  '30vh';
      break;
    case 'T':
      blockStyle.width = '30vw';
      blockStyle.height =  '30vh';
      break;
    case 'Z':
      blockStyle.width = '2vw';
      blockStyle.height = '25vh';
      break;
    case 'O':
      blockStyle.width = '10vw';
      blockStyle.height = '10vh';
      break;
    default:
      break;
  }
  blockStyle.borderColor = getRandomColor();
  return (
    <Draggable bounds="parent">
      <div style={blockStyle}></div>
    </Draggable>
  );
};

export default DraggableBlock;
