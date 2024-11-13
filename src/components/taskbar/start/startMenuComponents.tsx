import './startMenu.css';
import useProgramStore from '../../programStore';
import useStartMenuStore from './startmenuStore';

const ProgramStart = ({programName, logo}) => {
    const addProgram = useProgramStore((state) => state.addProgram);
    const { setStartOpen } = useStartMenuStore();
    const handleMouseClick = () => {
        addProgram({programName, logo});
        setStartOpen(false);

    };

    return (
        <div className='h-[54px] w-full flex pl-4 items-center text-black hover:bg-windowblue hover:text-white' onClick={handleMouseClick}>
            <img src={logo} className={'h-10'} draggable="false"></img>
            <span className='ml-2 pb-1 font-ms font-light text-start'>{programName}</span>
        </div>
    );
};

export default ProgramStart;
