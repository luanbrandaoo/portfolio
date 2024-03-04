import React from 'react';
import './components.css'
import windowsLogo from '../assets/windowslogo.png'; 

const StartMenuButton = () => {
  return (
    <div className="h-8 w-20 startMenuButton flex align-center justify-center">
        <img src={windowsLogo}></img>
        <span className="text-black">Start</span>
    </div>
  );
}

export default StartMenuButton;
