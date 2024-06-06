import { useState, useRef, useEffect } from 'react';

import './selection.css';

const Selection = ({children}) => {
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const initialPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
      if (selecting) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
      } else {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      }
      return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      }}, [selecting]);
    
    const handleMouseMove = (event) => {
      if (!selecting) return;
      const currentPos = { x: event.clientX, y: event.clientY };
      setSelectionBox(prevBox => ({
        left: Math.min(initialPos.current.x, currentPos.x),
        top: Math.min(initialPos.current.y, currentPos.y),
        width: Math.abs(currentPos.x - initialPos.current.x),
        height: Math.abs(currentPos.y - initialPos.current.y)
    }));
    };

    const handleMouseDown = (event) => {
      initialPos.current = { x: event.clientX, y: event.clientY };
      setSelectionBox({left: event.clientX, top: event.clientY, width: 0, height: 0});
      setSelecting(true);
  };

    const handleMouseUp = () => {
      setSelecting(false);
  };

    return (
      <div className='w-full h-full overflow-hidden fixed' onMouseDown={handleMouseDown}>
        {selecting && 
          <div className='fixed selection' style={selectionBox}/>}
        {children}
      </div>
    );
}

export default Selection;
