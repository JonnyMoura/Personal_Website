import './App.css';
import BlockContainer from './BlockContainer';
import Slideshow from './Slideshow';
import TextJoiningGame from './TextJoiningGame';
import WelcomeMessage from './WelcomeMessage';
import React, { useState } from 'react';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentClick = (component) => {
    // If the clicked component is the same as the active one, reset the state
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <BlockContainer />;
      case 'aboutMe':
        return <TextJoiningGame />;

      case 'links':
        return <Slideshow/>
      default:
        return (
          <>
            <BlockContainer />
            <WelcomeMessage />
          </>
        );
    }
  };

  return (
    <div className="App">
      <div className="site_frame">
        <div className="site_words top-left">
          <div>João</div>
          <div className="moura_word">Moura</div>
        </div>
        <div className="site_words top-right" onClick={() => handleComponentClick('home')}>
          Home
        </div>
        <div className="site_words bottom-left" onClick={() => handleComponentClick('aboutMe')}>
          About Me
        </div>
        <div className="site_words bottom-right" onClick={() => handleComponentClick('links')}>
          Links
        </div>
        <div className="line top_left"></div>
        <div className="line top_right"></div>
        <div className="line bottom_right"></div>
        <div className="line bottom_left"></div>
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default App;
