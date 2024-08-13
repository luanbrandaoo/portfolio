import { useState, forwardRef, useRef, useEffect } from 'react';
import './desktopComponents.css';

import useProgramStore from '../programStore';

const Shortcut = forwardRef(({ programName, icon, selected, setSelected, dragging, position }, ref) => {
  const programs = useProgramStore((state) => state.programs);
  const addProgram = useProgramStore((state) => state.addProgram);
  const firstClick = useRef(true);

  const handleMouseDown = () => {
    setSelected(false);
  };

  const handleMouseClick = () => {
    if (!firstClick.current){
      addProgram({programName, icon});
    }
    else{
      setSelected(true);
      firstClick.current = false;
    }
  };

  useEffect(() => {
    if (selected == false) {
      firstClick.current = true;
    }}, [selected]);

  return (
    <div
      className={`h-24 w-24 flex flex-col gap-1 items-center justify-center ${dragging ? 'opacity-70' : ''} ${selected ? 'selected' : ''}`}
      style={{ position: 'fixed', left: position.x, top: position.y }}
    >
      <img
        ref={ref}
        className={`shortcut h-12 mt-1 ${dragging ? 'opacity-70' : ''} ${selected ? 'iconSelection' : ''}`}
        src={icon}
        draggable="false"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={handleMouseClick}
      />
      <span 
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={handleMouseClick}
        className={`shortcut text-white font-ms font-normal text-clock ${dragging ? 'opacity-70' : ''} ${selected ? 'textSelection' : ''}`}>
          {programName}
      </span>
    </div>
  );
});


export default Shortcut;
