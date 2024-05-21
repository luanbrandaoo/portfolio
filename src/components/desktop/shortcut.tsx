import { useState } from 'react';
import './desktopComponents.css';

import useProgramStore from '../programStore';

const Shortcut = (props) => {
  const programs = useProgramStore((state) => state.programs);
  const addProgram = useProgramStore((state) => state.addProgram);

  const handleShortcutClick = (programName, icon) => {
    const newProgram = {
      programName,
      icon,
    };

    addProgram(newProgram);
  };
  

  const [firstClick, setFirstClick] = useState(false);
  const [secondClick, setSecondClick] = useState(false);

  const handleMouseDown = () => {
    if (firstClick) {
      setSecondClick(true);
      setFirstClick(false);
      handleShortcutClick(props.programName, props.icon)
    }
    else{
      setFirstClick(true);
    }
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
        className={`h-12 mt-1 ${firstClick ? 'iconSelection' : ''}`}
        src={props.icon}
      ></img>
      <span
        className={`text-white font-ms font-normal text-clock ${firstClick ? 'textSelection' : ''}`}
      >
        {props.programName}
      </span>
    </div>
  );
};

export default Shortcut;
