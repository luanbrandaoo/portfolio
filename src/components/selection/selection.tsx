import React, { useState, useRef, useEffect } from 'react';

import './selection.css';

const Selection = ({ children }) => {
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const initialPos = useRef({ x: 0, y: 0 });
    
    const childRefs = useRef([]);
    const [selectedElements, setSelectedElements] = useState([]);

    // grid calcs
    const [grid, setGrid] = useState([]);
    
    const childrenArray = React.Children.toArray(children);
    const gridContainerRef = useRef(null);
    
    const calculateInitialGrid = () => {
        const container = gridContainerRef.current;
        if (!container) return;

        const newNumCols = Math.floor(container.clientWidth / 96);
        const newNumRows = Math.floor(container.clientHeight / 96);

        const newGrid = Array.from({ length: newNumRows }, () => Array(newNumCols).fill(null));

        if (grid.length === 0) {
            childrenArray.forEach((ref, index) => {
                const col = Math.floor(index / newNumRows);
                const row = index % newNumRows;
                newGrid[row][col] = index;
            });
            setGrid(newGrid);
        }
    };

    useEffect(() => {
        calculateInitialGrid();
        window.addEventListener('resize', calculateInitialGrid);
        return () => {
            window.removeEventListener('resize', calculateInitialGrid);
        };
    }, []);

    // selection calcs
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

        const handleMouseUp = () => {
            setSelecting(false);
        };

        if (selecting) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [selecting]);

    const handleMouseDown = (event) => {
        initialPos.current = { x: event.clientX, y: event.clientY };
        setSelectionBox({left: event.clientX, top: event.clientY, width: 0, height: 0});
        setSelecting(true);
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
        <div ref={gridContainerRef} className='w-full h-full overflow-hidden fixed' onMouseDown={handleMouseDown}>
            {selecting && <div className='fixed selection' style={selectionBox} />}
            {grid.flat().map((index, gridIndex) => {
                if (index === null) return null;

                const row = Math.floor(gridIndex / grid[0].length);
                const col = gridIndex % grid[0].length;
                const position = { x: col * 96, y: row * 96 };

                return React.cloneElement(childrenArray[index], {
                    key: index,
                    ref: el => childRefs.current[index] = el,
                    selected: selectedElements.includes(index),
                    setSelected: (isSelected) => setSelected(index, isSelected),
                    position: position
                });
            })}
        </div>
    );
}

export default Selection;
