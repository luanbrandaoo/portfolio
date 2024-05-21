import { useState } from 'react';
import './window.css';
import logo from '../../assets/folderwithfile.png';

const Janela = ({programName, icon, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const [clickMinimize, setClickMinimize] = useState(false);
  const [clickMaximize, setClickMaximize] = useState(false);
  const [clickClose, setClickClose] = useState(false);


  const handleDragging  = () => {
    console.log('dragging')
    setIsDragging(true);
    setPosition({ x: 2, y: 2 }); 
  };

  const handleStopDragging  = () => {
    setIsDragging(false);
  };


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
    <div className={"h-[32rem] w-[42rem] bg-silver window z-10 flex flex-col"} style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px` }} onMouseDown={handleDragging} onMouseUp={handleStopDragging}>
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
  );
}

export default Janela;
