import React from 'react';

import Shortcut from './shortcut'
import programLogo from '../../assets/folderwithfile.png'; 

const Desktop = () => {
  return (
    <main className="bg-desktop h-full">
        <Shortcut programName="Program 1" icon={programLogo} />
        <Shortcut programName="Program 2" icon={programLogo} />
    </main>
  );
}

export default Desktop;