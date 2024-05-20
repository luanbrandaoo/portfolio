import StartMenuButton from './startMenuButton';
import ProgramTaskbar from './programTaskbar';
import Clock from './clock';
import useProgramStore from '../programStore';

const Taskbar = () => {
  const programs = useProgramStore((state) => state.programs);

  return (
    <div className="fixed bottom-0 w-full h-11 bg-silver border-t-2 border-border text-white p-1 flex justify-between">
      <div className="flex gap-2">
        <StartMenuButton />
        {programs.map((program, index) => (
          <ProgramTaskbar key={index} icon={program.icon} programName={program.programName} />
        ))}
      </div>
      <div>
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
