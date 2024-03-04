import React from 'react';
import './components.css'
import windowsLogo from '../assets/windowslogo.png'; 

const StartMenuButton = () => {
  return (
    <div className="h-8 w-20 startMenuButton flex align-center justify-center">
        <img src={windowsLogo} className="h-6 mt-1"></img>
        <span className="text-black font-ms font-bold text-start mt-1 ml-1">Start</span>
    </div>
  );
}

export default StartMenuButton;
