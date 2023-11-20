
import './App.css';
import BlockContainer from './BlockContainer';
import TextJoiningGame from './TextJoiningGame';
import WelcomeMessage from './WelcomeMessage';
import React, { useState, useEffect } from 'react';




function App() {

  return (
    <div className="App">
      
    
    <div className="site_frame">
   
    
      <div className="site_words top-left">
        <div>João</div>
        <div className="moura_word">Moura</div>
      </div>
      <div className="site_words top-right">Home</div>
      <div className="site_words bottom-left">About Me</div>
  <div className="site_words bottom-right">Links</div>
      <div className="line top_left"></div>
      <div className="line top_right"></div>
      <div className="line bottom_right"></div>
      <div className="line bottom_left"></div>
      <TextJoiningGame/>
      
      
    </div>
     
     
    </div>
  );
}

export default App;
