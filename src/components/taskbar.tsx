import React from 'react';
import StartMenuButton from './startMenuButton'
import ProgramTaskbar from './programTaskbar'

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex gap-2">
      <StartMenuButton />
      <ProgramTaskbar />
    </div>
  );
}

export default Taskbar;