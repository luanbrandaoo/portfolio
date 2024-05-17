import React from 'react';

import Shortcut from './shortcut'
import programLogo from '../../assets/folderwithfile.png'; 
import Window from '../window/window'; 

const Desktop = () => {
  return (
    <main className="bg-desktop h-full w-full overflow-hidden fixed">
        <Shortcut programName="Program 1" icon={programLogo} />
        <Shortcut programName="Program 2" icon={programLogo} />
        <Window>
          <h1>Content</h1>
        </Window>
    </main>
  );
}

export default Desktop;