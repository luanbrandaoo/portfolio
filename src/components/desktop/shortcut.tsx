import { useState, forwardRef } from 'react';
import './desktopComponents.css';

import useProgramStore from '../programStore';

const Shortcut = forwardRef(({ programName, icon, selected, setSelected }, ref) => {
  const programs = useProgramStore((state) => state.programs);
  const addProgram = useProgramStore((state) => state.addProgram);

  const handleShortcutClick = (programName, icon) => {
    const newProgram = { programName, icon };
    addProgram(newProgram);
    setSelected(false);
  };

  const handleMouseDown = () => {
    setSelected(true);
  };

  const handleMouseUp = () => {

  };

  return (
    <div
      className={`h-24 w-24 flex flex-col gap-1 items-center justify-center ${selected ? 'selected' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        ref={ref}
        className={`h-12 mt-1 ${selected ? 'iconSelection' : ''}`}
        src={icon}
        draggable="false"
      />
      <span
        className={`text-white font-ms font-normal text-clock ${selected ? 'textSelection' : ''}`}
      >
        {programName}
      </span>
    </div>
  );
});


export default Shortcut;
