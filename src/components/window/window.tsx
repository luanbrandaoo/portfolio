import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

import './window.css';

import useProgramStore from '../programStore';

const Janela = ({programName, icon, children}) => {
  const { programs, setPosition } = useProgramStore(state => ({
    programs: state.programs,
    setPosition: state.setPosition
  }));

  const program = programs.find(p => p.programName === programName);


  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
      setInitialPosition(program.position);
  }, []);


  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleStartDragging = () => {
    setDragging(true);
  };

  const handleStopDragging = () => {
    const drag = dragRef.current.getBoundingClientRect();
    console.log(drag.left, drag.top);
    setPosition(programName, drag.left, drag.top);
    setDragging(false);
  };


  const [clickMinimize, setClickMinimize] = useState(false);
  const [clickMaximize, setClickMaximize] = useState(false);
  const [clickClose, setClickClose] = useState(false);

  const handleMouseDownMinimize = () => {
    setClickMinimize(true);
  };

  const handleMouseUpMinimize = () => {
    setClickMinimize(false);
  };

  const handleMouseDownMaximize = () => {
    setClickMaximize(true);
  };

  const handleMouseUpMaximize  = () => {
    setClickMaximize(false);
  };

  const handleMouseDownClose = () => {
    setClickClose(true);
  };

  const handleMouseUpClose  = () => {
    setClickClose(false);
  };

  return (
    <div>
      <Draggable handle=".handle" onStart={handleStartDragging} onStop={handleStopDragging}>
        <div ref={dragRef} className={`h-[32rem] w-[42rem] pointernone z-20 ${dragging ? 'dragWindow' : ''}`}
            style={{ position: 'absolute', top: `${initialPosition.y}px`, left: `${initialPosition.x}px` }}>
          <div className="h-9 w-auto titleBox pointerauto handle"></div>
        </div>
      </Draggable>
      <div className={"h-[32rem] w-[42rem] bg-silver window z-10 flex flex-col"}
          style={{ position: 'absolute', top: `${program.position.y}px`, left: `${program.position.x}px` }}>
        <div className="h-9 w-auto titleBox bg-windowblue flex flex-row justify-between">
          <div className='flex flex-row gap-2 align-center'>
            <img src={icon} className="h-6"></img>
            <span className='text-white font-ms font-normal text-start'>{programName}</span>
          </div>
          <div className='flex flex-row gap-1 align-center m-px'>
            <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickMinimize ? 'windowButtonsClick' : ''}`} onMouseDown={handleMouseDownMinimize} onMouseUp={handleMouseUpMinimize}>
              <span className='text-black font-ms font-black text-window -m-1'>_</span>
            </div>
            <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickMaximize ? 'windowButtonsClick' : ''}`} onMouseDown={handleMouseDownMaximize} onMouseUp={handleMouseUpMaximize}>
              <div className='border-black border-2 border-t-4 h-3 w-3 m-1'></div>
            </div>
            <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickClose ? 'windowButtonsClick' : ''}`} onMouseDown={handleMouseDownClose} onMouseUp={handleMouseUpClose}>
              <span className='text-black font-ms font-black text-window -m-px'>X</span>
            </div>
          </div>
        </div>
        <div className='bg-border2 contentbox h-full'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Janela;
