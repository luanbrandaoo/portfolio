import React from 'react';
import StartMenuButton from './startMenuButton'

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1">
      <StartMenuButton />
    </div>
  );
}

export default Taskbar;