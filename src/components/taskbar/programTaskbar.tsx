import { useState } from 'react';
import './taskbarComponents.css';

import useProgramStore, {stateE} from '../programStore';

const ProgramTaskbar = ({programName, icon}) => {
    const { programs, setState } = useProgramStore(state => ({
        programs: state.programs,
        setState: state.setState
      }));
    
    const program = programs.find(p => p.programName === programName);

    const [click, setClick] = useState(false);

    const handleMouseDown = () => {
        setClick(true);
    };

    const handleMouseUp = () => {
        setClick(false);
        if (program.state === stateE.FOCUSED) {
            setState(programName, stateE.MINIMIZED);
        }
        else{
            setState(programName, stateE.FOCUSED);
        }
    };

    return (
        <div
            className={`h-8 programTaskbar flex align-center justify-center px-2 
            ${program.state === stateE.FOCUSED && !click ? 'programTaskbarActive' : ''}
            ${click ? 'programTaskbarClick' : ''} `}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <img src={icon} className="h-6 mt-1" alt="Program Icon"></img>
            <span className="text-black font-ms font-normal text-start mt-1 ml-1">
                {programName}
            </span>
        </div>
    );
};

export default ProgramTaskbar;
