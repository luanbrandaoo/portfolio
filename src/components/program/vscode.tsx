import React from 'react';

import vscodeLogo from '../../assets/vscode.png'; 
import Window from '../window/window'; 


const VScode = () => {
  return (
    <Window programName={'VS Code'} icon={vscodeLogo}>
        <span>VS Code</span>
    </Window>
  );
}

export default VScode;
