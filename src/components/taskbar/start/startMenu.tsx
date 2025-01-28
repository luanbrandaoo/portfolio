import './startMenu.css';
import ProgramStart from './startMenuComponents';
import sidebar from '../../../assets/sidebar.png';

import fileLogo from '../../../assets/file.png'; 
import githubLogo from '../../../assets/github.png'; 
import mailLogo from '../../../assets/mail.png';
import VSLogo from '../../../assets/vscode.png'; 
import afterLogo from '../../../assets/af.png'; 
import aboutmeLogo from '../../../assets/aboutme.png';

import { useEffect } from 'react';
import useStartMenuStore from './startmenuStore';

const StartMenu = () => {
  const { setStartOpen } = useStartMenuStore();

    useEffect(() => {
        const handleGlobalMouseDown = (event) => {
          if (event.target.closest('.startMenuButton')){
            return;
          }
          else if (!event.target.closest('.start-menu')) {
            setStartOpen(false);
          }
        };
    
        window.addEventListener('mousedown', handleGlobalMouseDown);
        return () => {
          window.removeEventListener('mousedown', handleGlobalMouseDown);
        };
      }, []);

    return (
        <div className='start-menu flex flex-row'>
            <div className='bg-windowsilver flex flex-col justify-end h-full w-12'>
                <img src={sidebar} draggable="false"></img>
            </div>
            <div className='w-full bg-silver'>
                <ProgramStart programName={'Resume'} logo={fileLogo}/>
                <ProgramStart programName={'Mail'} logo={mailLogo}/>
                <ProgramStart programName={'Github'} logo={githubLogo}/>
                <ProgramStart programName={'VS Code'} logo={VSLogo}/>
                <ProgramStart programName={'After Effects'} logo={afterLogo}/>
            </div>
        </div>
    );
};

export default StartMenu;
