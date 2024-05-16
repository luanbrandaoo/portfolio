import React from 'react';
import './components.css'

const ProgramTaskbar = (props) => {
    return (
        <div className="h-8 programTaskbar flex align-center justify-center px-2">
            <img src={props.icon} className="h-6 mt-1"></img>
            <span className="text-black font-ms font-normal text-start mt-1 ml-1">{props.programName}</span>
        </div>
      );
    }

export default ProgramTaskbar;
