import React from 'react';
import StartMenuButton from './startMenuButton'
import ProgramTaskbar from './programTaskbar'

import programLogo from '../assets/windowslogo.png';

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex gap-2">
      <StartMenuButton />
      <ProgramTaskbar programName="Program 1" icon={programLogo} />
    </div>
  );
}

export default Taskbar;