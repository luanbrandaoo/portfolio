import { useEffect } from 'react';

import Shortcut from './shortcut';

import fileLogo from '../../assets/file.png'; 
import githubLogo from '../../assets/github.png'; 
import mailLogo from '../../assets/mail.png';
import VSLogo from '../../assets/vscode.png'; 
import afterLogo from '../../assets/af.png'; 

import useScreenStore from '../screenStore';
import useProgramStore, {componentMap} from '../programStore';


const Desktop = () => {
  const { size, updateScreenSize } = useScreenStore();
  const programs = useProgramStore((state) => state.programs);

  useEffect(() => {
    const handleResize = () => {
        updateScreenSize(window.innerWidth, window.innerHeight);
        console.log("resized");
    };

    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize)};
  }, []);

  return (
    <main className="bg-desktop h-full w-full overflow-hidden fixed">
      <Shortcut programName="Résumé" icon={fileLogo} />
      <Shortcut programName="Mail" icon={mailLogo} />
      <Shortcut programName="Github" icon={githubLogo} />
      <Shortcut programName="VS Code" icon={VSLogo} />
      <Shortcut programName="After Effects" icon={afterLogo} />
      {programs.map((program, index) => {
        const ProgramComponent = componentMap[program.programName];
        return ProgramComponent ? <ProgramComponent key={index} /> : null;
      })}
    </main>
  );
}

export default Desktop;
