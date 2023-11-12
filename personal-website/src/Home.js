// Home.js
import React from 'react';
import './Home.css';
import './font.css';

const Home = () => {
  return (
    <div className="site_frame">
      <div className="site_words top-left">
        <div>João</div>
        <div className="moura_word">Moura</div>
      </div>
      <div className="site_words top-right">Home</div>
      <div className="site_words bottom-left">About Me</div>
      <div className="site_words bottom-right">Links</div>
      <div className="line top"></div>
      <div className="line right"></div>
      <div className="line bottom"></div>
      <div className="line left"></div>
    </div>
  );
};

export default Home;
