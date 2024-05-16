import React, { useState } from 'react';
import './taskbarComponents.css';

const ProgramTaskbar = (props) => {
    const [click, setClick] = useState(false);
    const [active, setActive] = useState(false);

    const handleMouseDown = () => {
        setClick(true);
    };

    const handleMouseUp = () => {
        setClick(false);
        if (!active) {
            setActive(true);
        }
    };

    return (
        <div
            className={`h-8 programTaskbar flex align-center justify-center px-2 ${
                click ? 'programTaskbarClick' : ''
            } ${active ? 'programTaskbarActive' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <img src={props.icon} className="h-6 mt-1" alt="Program Icon"></img>
            <span className="text-black font-ms font-normal text-start mt-1 ml-1">
                {props.programName}
            </span>
        </div>
    );
};

export default ProgramTaskbar;
