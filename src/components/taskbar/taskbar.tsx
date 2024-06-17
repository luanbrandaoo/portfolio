import StartMenuButton from './startMenuButton';
import ProgramTaskbar from './programTaskbar';
import Clock from './clock';
import useProgramStore from '../programStore';

import useStartMenuStore from './start/startmenuStore';
import StartMenu from './start/startMenu';


const Taskbar = () => {
  const { programs } = useProgramStore(state => ({
    programs: state.programs,
  }));

  const { startOpen } = useStartMenuStore();

  return (
    <div>
      {startOpen && <StartMenu/>}
      <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex justify-between">
        <div className="flex gap-2">
          <div>
            <StartMenuButton/>
          </div>
          {programs.map((program, index) => (
            <ProgramTaskbar key={index} icon={program.icon} programName={program.programName} />
          ))}
        </div>
        <div>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
