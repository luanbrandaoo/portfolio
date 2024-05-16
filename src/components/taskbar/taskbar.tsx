import React from 'react';
import StartMenuButton from './startMenuButton'
import ProgramTaskbar from './programTaskbar'
import Clock from './clock'

import programLogo from '../../assets/windowslogo.png';

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex justify-between">
      <div className="flex gap-2">
        <StartMenuButton />
        <ProgramTaskbar programName="Program 1" icon={programLogo} />
      </div>
      <div>
        <Clock />
      </div>
    </div>
  );
}

export default Taskbar;