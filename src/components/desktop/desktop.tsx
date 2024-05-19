import React from 'react';

import Shortcut from './shortcut'
import Window from '../window/window'; 

import fileLogo from '../../assets/file.png'; 
import githubLogo from '../../assets/github.png'; 
import mailLogo from '../../assets/mail.png';
import VSLogo from '../../assets/vscode.png'; 
import afterLogo from '../../assets/af.png'; 

import Resume from '../program/resume'; 

const Desktop = () => {
  return (
    <main className="bg-desktop h-full w-full overflow-hidden fixed">
        <Shortcut programName="Résumé" icon={fileLogo} />
        <Shortcut programName="Mail" icon={mailLogo} />
        <Shortcut programName="Github" icon={githubLogo} />
        <Shortcut programName="VS Code" icon={VSLogo} />
        <Shortcut programName="After Effects" icon={afterLogo} />
    </main>
  );
}

export default Desktop;