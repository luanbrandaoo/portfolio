import React, { useState, useRef, useEffect } from 'react';

import './selection.css';

const Selection = ({ children }) => {
    const childRefs = useRef([]);
    const [selectedElements, setSelectedElements] = useState([]);




    // grid calcs
    const [grid, setGrid] = useState([]);
    
    const childrenArray = React.Children.toArray(children);
    const gridContainerRef = useRef(null);
    
    const calculateGrid = (isInitialRender) => {
        const container = gridContainerRef.current;
        if (!container) return;

        const newNumCols = Math.floor(container.clientWidth / 96);
        const newNumRows = Math.floor(container.clientHeight / 96);

        const newGrid = Array.from({ length: newNumRows }, () => Array(newNumCols).fill(null));

        if (isInitialRender) {
            childrenArray.forEach((ref, index) => {
                const col = Math.floor(index / newNumRows);
                const row = index % newNumRows;
                newGrid[row][col] = index;
            });
            setGrid(newGrid);
        }
        else{
            childrenArray.forEach((ref, index) => {
                const col = Math.floor(index / newNumRows);
                const row = index % newNumRows;
                newGrid[row][col] = index;
            });
            setGrid(newGrid);
        }
    };

    useEffect(() => {
        calculateGrid(true);
        window.addEventListener('resize', () => calculateGrid(false));
        return () => {
            window.removeEventListener('resize', () => calculateGrid(false));
        };
    }, []);




    // selection calcs
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const initialPos = useRef({ x: 0, y: 0 });

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

    useEffect(() => {
        const handleUnselect = (event) => {
            if (!childRefs.current.some(ref => ref && ref.contains(event.target))) {
                setSelectedElements([]);
            }
        };
    
        window.addEventListener('mousedown', handleUnselect);
        return () => {
            window.removeEventListener('mousedown', handleUnselect);
        };
    }, []);
    

    const handleStartSelection = (event) => {
        if (isDraggable) return;
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




    // dragging calcs
    const [isDraggable, setIsDraggable] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [mouseDeltas, setMouseDeltas] = useState({ x: 0, y: 0 });

    const handleDragStart = (event) => {
        if (selecting) return;
        setStartPosition({ x: event.clientX, y: event.clientY });
        setIsDraggable(true);
    };
    
    const handleMouseMove = (event) => {
        if (!isDraggable) return;
        setDragging(true);
        const newPosition = { x: event.clientX, y: event.clientY };
        const deltaX = newPosition.x - startPosition.x;
        const deltaY = newPosition.y - startPosition.y;
        setMouseDeltas({ x: deltaX, y: deltaY });
    };

    const handleDragStop = () => {
        setIsDraggable(false);
        setDragging(false);
        setMouseDeltas({ x: 0, y: 0 });
    };

    useEffect(() => {
        const handleMouseUp = () => {
            if (isDraggable) {
                handleDragStop();
            }
        };

        if (isDraggable) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggable]);

    useEffect(() => {
        if (selecting) {
            setSelecting(false);
        }
    }, [dragging]);
    



    // render elements
    return (
        <div ref={gridContainerRef} className='w-full h-full overflow-hidden fixed' onMouseDown={handleStartSelection}>
            {selecting && <div className='fixed selection' style={selectionBox} />}
            {grid.flat().map((index, gridIndex) => {
                if (index === null) return null;

                const row = Math.floor(gridIndex / grid[0].length);
                const col = gridIndex % grid[0].length;
                const position = { x: col * 96, y: row * 96 };
                const isSelected = selectedElements.includes(index);

                return (
                    <div>
                        {isSelected && (
                            <div>
                                {React.cloneElement(childrenArray[index], {
                                    position: { x: position.x + mouseDeltas.x, y: position.y + mouseDeltas.y },
                                    selected: false,
                                })}
                            </div>
                        )}
                        <div onMouseDown={handleDragStart} >
                            {React.cloneElement(childrenArray[index], {
                                key: index,
                                ref: el => childRefs.current[index] = el,
                                selected: selectedElements.includes(index),
                                setSelected: (isSelected) => setSelected(index, isSelected),
                                position: position
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Selection;
