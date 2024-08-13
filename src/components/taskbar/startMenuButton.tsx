import { useEffect, useState } from 'react';
import './taskbarComponents.css'
import windowsLogo from '../../assets/windowslogo.png';

import useStartMenuStore from './start/startmenuStore';
import useProgramStore, {stateE} from '../programStore';

const StartMenuButton = () => {
  const { programs, setState } = useProgramStore(state => ({
    programs: state.programs,
    setState: state.setState
  }));

  const { startOpen, setStartOpen, toggleStartOpen } = useStartMenuStore();

  const [click, setClick] = useState(false);

  const startMenuState = () => {
    toggleStartOpen();
    programs.forEach(program => {
      if (getState(program.programName) === stateE.FOCUSED) {
        setState(program.programName, stateE.UNFOCUSED);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('mouseup', () => setClick(false));
    return () => {window.removeEventListener('mouseup', () => setClick(false))};
  }, []);

  return (
    <div onMouseDown={() => setClick(true)} onTouchStart={() => setClick(true)} onClick={() => startMenuState()}
        className={`h-8 w-20 startMenuButton flex align-center justify-center
        ${startOpen && !click ? 'startMenuButtonClick' : ''}
        ${click ? 'programTaskbarClick' : ''} `}>
        <img src={windowsLogo} className="h-6 mt-1" draggable="false"></img>
        <span className="text-black font-ms font-bold text-start mt-1 ml-1">Start</span>
    </div>
  );
}

export default StartMenuButton;
