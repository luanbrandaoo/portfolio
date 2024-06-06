import React, { useState, useRef, useEffect } from 'react';

import './selection.css';

const Selection = ({ children }) => {
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const initialPos = useRef({ x: 0, y: 0 });
    
    const childRefs = useRef([]);
    const [selectedElements, setSelectedElements] = useState([]);

    const setSelected = (index, isSelected) => {
        setSelectedElements(prevSelectedElements => {
            if (isSelected) {
                return [index];
            } else {
                return prevSelectedElements.filter(item => item !== index);
            }
        });
    };

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
        };
    }, [selecting]);

    const handleMouseMove = (event) => {
      if (!selecting) return;
      const currentPos = { x: event.clientX, y: event.clientY };
      setSelectionBox({
        left: Math.min(initialPos.current.x, currentPos.x),
        top: Math.min(initialPos.current.y, currentPos.y),
        width: Math.abs(currentPos.x - initialPos.current.x),
        height: Math.abs(currentPos.y - initialPos.current.y)
      });
      checkSelection({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = (event) => {
      initialPos.current = { x: event.clientX, y: event.clientY };
      setSelectionBox({left: event.clientX, top: event.clientY, width: 0, height: 0});
      setSelecting(true);
    };

    const handleMouseUp = () => {
      setSelecting(false);
    };

  const checkSelection = (currentPos) => {
    const newSelectedElements = [];
    const { x: startX, y: startY } = initialPos.current;
    const { x: endX, y: endY } = currentPos;

    const left = Math.min(startX, endX);
    const right = Math.max(startX, endX);
    const top = Math.min(startY, endY);
    const bottom = Math.max(startY, endY);

    childRefs.current.forEach((ref, index) => {
        if (ref) {
            const rect = ref.getBoundingClientRect();
            const { left: rectLeft, right: rectRight, top: rectTop, bottom: rectBottom } = rect;

            const intersect = !(
                right < rectLeft ||
                left > rectRight ||
                bottom < rectTop ||
                top > rectBottom
            );

            if (intersect) {
                newSelectedElements.push(index);
            }
        }
    });

    setSelectedElements(newSelectedElements);
    };

    return (
        <div className='w-full h-full overflow-hidden fixed' onMouseDown={handleMouseDown}>
            {selecting && <div className='fixed selection' style={selectionBox} />}
            {React.Children.map(children, (child, index) => 
                React.cloneElement(child, {
                    ref: el => childRefs.current[index] = el,
                    selected: selectedElements.includes(index),
                    setSelected: (isSelected) => setSelected(index, isSelected)
                })
            )}
        </div>
    );
}

export default Selection;
