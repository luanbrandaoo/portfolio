import React from 'react';
import './components.css'
import windowsLogo from '../assets/windowslogo.png'; 

const ProgramTaskbar = () => {
    return (
        <div className="h-8 startMenuButton flex align-center justify-center px-2">
            <img src={windowsLogo} className="h-6 mt-1"></img>
            <span className="text-black font-ms font-bold text-start mt-1 ml-1">Program name</span>
        </div>
      );
    }

export default ProgramTaskbar;
