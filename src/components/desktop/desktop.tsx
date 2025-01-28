import React, { useEffect } from 'react';

import Shortcut from './shortcut';
import DesktopGrid from './desktopGrid';

import sidebar from '../../assets/sidebar.png';
import fileLogo from '../../assets/file.png'; 
import githubLogo from '../../assets/github.png'; 
import mailLogo from '../../assets/mail.png';
//import VSLogo from '../../assets/vscode.png'; 
//import afterLogo from '../../assets/af.png'; 
import aboutmeLogo from '../../assets/aboutme.png';

import useProgramStore, {componentMap} from '../programStore';


const Desktop = () => {
  const programs = useProgramStore((state) => state.programs);
  let oldSize = {width: window.innerWidth, height: window.innerHeight};
  let newSize = {width: window.innerWidth, height: window.innerHeight};
  const addProgram = useProgramStore((state) => state.addProgram);
  useEffect(() => {
  
    addProgram({programName: 'About Me', icon: aboutmeLogo});

    const handleResize = () => {
        newSize = {width: window.innerWidth, height: window.innerHeight};
        useProgramStore.getState().updateGlobalSize(newSize.width, newSize.height, oldSize.width, oldSize.height);
        oldSize = newSize;
    };

    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize)};
  }, []);



  return (
    <main className="bg-desktop h-[calc(100vh-2.75rem)] w-full overflow-hidden fixed">
      <img height={0} width={0} src={sidebar} draggable="false"></img>
      <DesktopGrid>
        <Shortcut programName="Resume" icon={fileLogo} />
        <Shortcut programName="Mail" icon={mailLogo} />
        <Shortcut programName="Github" icon={githubLogo} />
        {/* <Shortcut programName="VS Code" icon={VSLogo} /> */}
        {/* <Shortcut programName="After Effects" icon={afterLogo} /> */}
      </DesktopGrid>
      {programs.map((program, index) => {
        const ProgramComponent = componentMap[program.programName];
        return ProgramComponent ? <ProgramComponent key={index} /> : null;
      })}
    </main>
  );
}

export default Desktop;
