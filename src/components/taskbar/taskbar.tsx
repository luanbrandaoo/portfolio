import { useRef, useEffect, useState, useCallback } from 'react';


import StartMenuButton from './startMenuButton';
import ProgramTaskbar from './programTaskbar';
import Clock from './clock';
import useProgramStore from '../programStore';

import useStartMenuStore from './start/startmenuStore';
import StartMenu from './start/startMenu';


const Taskbar = () => {
  const [taskbarProgramMinify, setTaskbarProgramMinify] = useState(false);
  const taskbarRef = useRef<HTMLDivElement>(null);
  const taskbarProgramsRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLDivElement>(null);
  

  const { programs } = useProgramStore(state => ({
    programs: state.programs,
  }));

  const { startOpen } = useStartMenuStore();


  const handleResize = useCallback(() => {
    if ((taskbarProgramsRef.current.offsetWidth >= 
      (taskbarRef.current.offsetWidth - startButtonRef.current.offsetWidth - 10)) 
      && !taskbarProgramMinify) {
        setTaskbarProgramMinify(true);
    }
  }, [programs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);



  return (
    <div>
      {startOpen && <StartMenu/>}
      <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex justify-between">
        <div className="flex gap-2 w-full" ref={taskbarRef}>
          <div ref={startButtonRef} >
            <StartMenuButton/>
          </div>
          <div className="flex gap-2" ref={taskbarProgramsRef} >
            {programs.map((program, index) => (
              <ProgramTaskbar key={index} icon={program.icon} programName={program.programName} minify={taskbarProgramMinify} />
            ))}
          </div>
        </div>
        <div>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
