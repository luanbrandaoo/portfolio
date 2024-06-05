import { useState, useRef, useEffect } from 'react';
import {Rnd} from 'react-rnd';

import './window.css';

import useProgramStore, {stateE} from '../programStore';

const Window = ({programName, icon, initialPosition, initialSize, initialState, children}) => {
  const { programs, removeProgram, setPosition, setSize, setState } = useProgramStore(state => ({
    programs: state.programs,
    removeProgram: state.removeProgram,
    setPosition: state.setPosition,
    setSize: state.setSize,
    setState: state.setState
  }));

  const program = programs.find(p => p.programName === programName);

  const index = program.index * 100;

  useEffect(() => {
    setPosition(programName, initialPosition.x, initialPosition.y);
    setSize(programName, initialSize.width, initialSize.height);
    setState(programName, initialState);
  }, []);
  

  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleStartDragging = () => {
    setDragging(true);
  };

  const handleStopDragging = () => {
    const drag = dragRef.current.getBoundingClientRect();
    setPosition(programName, drag.left, drag.top);
    setSize(programName, drag.width, drag.height);
    setDragging(false);
  };


  const [clickMinimize, setClickMinimize] = useState(false);
  const [clickMaximize, setClickMaximize] = useState(false);
  const [clickClose, setClickClose] = useState(false);

  const handleGlobalMouseUp = () => {
    setClickMinimize(false);
    setClickMaximize(false);
    setClickClose(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {window.removeEventListener('mouseup', handleGlobalMouseUp)};
  }, []);

  const handleMouseDownMinimize = () => {
    setClickMinimize(true);
  };

  const handleMouseUpMinimize = () => {
    setClickMinimize(false);
    setState(programName, stateE.MINIMIZED);
  };

  const handleMouseDownMaximize = () => {
    setClickMaximize(true);
  };

  const handleMouseUpMaximize  = () => {
    setClickMaximize(false);
    setPosition(programName, 0, 0);
    setSize(programName, window.innerWidth, window.innerHeight);
  };

  const handleMouseDownClose = () => {
    setClickClose(true);
  };

  const handleMouseUpClose = () => {
    setClickClose(false);
    removeProgram(programName);
  };

  if (program.state !== stateE.MINIMIZED) {
    return (
      <div>
        <div className='absolute top-0 left-0' style={{ zIndex: index + 3 }}>
          <Rnd className="resizable" dragHandleClassName="handle" cancel=".cancel"
            default={{ x: initialPosition.x, y: initialPosition.y, width: initialSize.width, height: initialSize.height}} 
            position={{ x: program.position.x, y: program.position.y }}
            size={{ width: program.size.width, height: program.size.height }}
            onDragStart={handleStartDragging} onDragStop={handleStopDragging}
            onResizeStart={handleStartDragging} onResizeStop={handleStopDragging}
            resizeHandleStyles={{
              top: {cursor:'ns-resize'},
              bottom: {cursor:'ns-resize'},
              left: {cursor: 'ew-resize'},
              right: {cursor: 'ew-resize'},
              topRight: {cursor: 'ne-resize'},
              topLeft: {cursor: 'nw-resize'},
              bottomRight: {cursor: 'se-resize'},
              bottomLeft: {cursor: 'sw-resize'},
            }}>
            <div ref={dragRef} className={`h-full w-full pointer-none ${dragging ? 'dragWindow' : ''}`} style={{ zIndex: index + 2 }}>
              <div className="h-9 w-auto titleBox pointerauto handle">
                <div className='flex flex-row gap-1 align-center justify-end m-px'>
                  <div className={"h-6 w-6 flex align-center justify-center cancel"} onMouseDown={handleMouseDownMinimize} onMouseUp={handleMouseUpMinimize}></div>
                  <div className={"h-6 w-6 flex align-center justify-center cancel"} onMouseDown={handleMouseDownMaximize} onMouseUp={handleMouseUpMaximize}></div>
                  <div className={"h-6 w-6 flex align-center justify-center cancel"} onMouseDown={handleMouseDownClose} onMouseUp={handleMouseUpClose}></div>
                </div>
              </div>
            </div>
          </Rnd>
        </div>
        <div className={"bg-silver window flex flex-col"}
          style={{ position: 'absolute', top: `${program.position.y}px`, left: `${program.position.x}px`,
            zIndex: index + 1, 
            width: `${program.size.width}px`, height: `${program.size.height}px`}}>
          <div className="h-9 w-auto titleBox bg-windowblue flex flex-row justify-between">
            <div className='flex flex-row gap-2 align-center'>
              <img src={icon} className="h-6"></img>
              <span className='text-white font-ms font-normal text-start'>{programName}</span>
            </div>
            <div className='flex flex-row gap-1 align-center m-px'>
              <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickMinimize ? 'windowButtonsClick' : ''}`}>
                <span className='text-black font-ms font-black text-window -m-1'>_</span>
              </div>
              <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickMaximize ? 'windowButtonsClick' : ''}`}>
                <div className='border-black border-2 border-t-4 h-3 w-3 m-1'></div>
              </div>
              <div className={`bg-silver h-6 w-6 windowButtons flex align-center justify-center  ${clickClose ? 'windowButtonsClick' : ''}`}>
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
}

export default Window;
