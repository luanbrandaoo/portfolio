import React, { useState } from 'react';
import './desktopComponents.css';

const Shortcut = (props) => {
  const [click, setClick] = useState(false);

  const handleMouseDown = () => {
    setClick(true);
  };

  const handleMouseUp = () => {
    
  };

  return (
    <div
      className={'h-24 w-24 flex flex-col gap-1 items-center justify-center'}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        className={`h-12 mt-1 ${click ? 'iconSelection' : ''}`}
        src={props.icon}
      ></img>
      <span
        className={`text-white font-ms font-normal text-clock ${click ? 'textSelection' : ''}`}
      >
        {props.programName}
      </span>
    </div>
  );
};

export default Shortcut;
