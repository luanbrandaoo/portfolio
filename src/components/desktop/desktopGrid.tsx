import React, { useState, useRef, useEffect } from 'react';

import './desktopComponents.css';

const DesktopGrid = ({ children }) => {
    const childRefs = useRef([]);
    const childrenArray = React.Children.toArray(children);
    const [selectedElements, setSelectedElements] = useState([]);
    const [rendered, setRendered] = useState(false);




    // grid calcs
    const gridRef = useRef([]);
    const gridContainerRef = useRef(null);
    
    const calculateGrid = (isInitialRender) => {
        const container = gridContainerRef.current;
        if (!container) return;

        const newNumCols = Math.floor(container.clientWidth / 96);
        const newNumRows = Math.floor(container.clientHeight / 96);

        const newGrid = Array.from({ length: newNumRows }, () => Array(newNumCols).fill(null));

        if (isInitialRender) {
            childrenArray.forEach((_, index) => {
                const col = Math.floor(index / newNumRows);
                const row = index % newNumRows;
                newGrid[row][col] = index;
            });
            gridRef.current = newGrid;
        } else {
            const flat = []
            const numRows = gridRef.current.length;
            const numCols = gridRef.current[0].length;

            //flat 
            for (let col = 0; col < numCols; col++) {
                for (let row = 0; row < numRows; row++) {
                    flat.push(gridRef.current[row][col]);
                }
            }

            const newSize = newNumCols * newNumRows;
            const difference = newSize - flat.length;

            //remove nulls
            if (difference < 0) {
                let count = 0;
                for (let i = flat.length - 1; i >= 0 && count < Math.abs(difference); i--) {
                    if (flat[i] === null) {
                        flat.splice(i, 1);
                        count++;
                    }
                }
            }
            //add nulls
            else if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    flat.push(null);
                }
            }
            else {
                return;
            }
            
            //turn into matrix
            for (let i = 0; i < flat.length; i++) {
                const row = i % newNumRows;
                const col = Math.floor(i / newNumRows);
                newGrid[row][col] = flat[i];
            }
        
            gridRef.current = newGrid;
        }
    };

    useEffect(() => {
        calculateGrid(true);
        setRendered(true);
        window.addEventListener('resize', () => calculateGrid(false));
        return () => {
            window.removeEventListener('resize', () => calculateGrid(false));
        };
    }, []);




    // selection calcs
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const initialPos = useRef({ x: 0, y: 0 });

    const setSelected = (index, removeOthers) => {
        setSelectedElements(prevSelectedElements => {
            if (removeOthers) {
                return [index];
            }
            else if (selectedElements.includes(index)) {
                return selectedElements;
            }
            else {
                return [index];
            }
        });
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDraggable) return;
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
            const isShortcut = event.target.classList.contains('shortcut');
            if (!isShortcut && !dragging) {
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

        const isOverShortcut = Array.from(document.querySelectorAll(".shortcut")).some(element => element.contains(event.target));
        if (!isOverShortcut) return;

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
        selectedElements.forEach(index => {
            const ref = childRefs.current[`dragging_${index}`]
            if (!dragging && ref) {
                const rect = ref.getBoundingClientRect();
                const pos = { 
                    x: Math.max(0, Math.min(Math.floor((rect.left + rect.width / 2) / 96), gridRef.current[0].length - 1)),
                    y: Math.max(0, Math.min(Math.floor((rect.top + rect.height / 2) / 96), gridRef.current.length - 1))
                };

                const row = gridRef.current.findIndex(row => row.includes(index));
                const col = gridRef.current[row].indexOf(index);

                if (gridRef.current[pos.y][pos.x] == null){
                    gridRef.current[row][col] = null;
                    gridRef.current[pos.y][pos.x] = index;
                }
            }
        });

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
        <div ref={gridContainerRef} className='w-full h-[calc(100vh-2.75rem)] overflow-hidden fixed' onMouseDown={handleStartSelection} onTouchStart={handleStartSelection}>
            {selecting && <div className='fixed selection' style={selectionBox} />}
            {rendered && gridRef.current.flat().map((index, gridIndex) => {
                if (index === null) return null;

                const row = Math.floor(gridIndex / gridRef.current[0].length);
                const col = gridIndex % gridRef.current[0].length;
                const position = { x: col * 96, y: row * 96 };
                const isSelected = selectedElements.includes(index);

                return (
                    <div>
                        {childrenArray[index] && (
                            <div onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
                                {React.cloneElement(childrenArray[index], {
                                    key: index,
                                    ref: el => childRefs.current[index] = el,
                                    selected: isSelected,
                                    dragging: false,
                                    setSelected: (removeOthers) => setSelected(index, removeOthers),
                                    position: position
                                })}
                            </div>
                        )}
                        {isSelected && dragging && childrenArray[index] && (
                            <div>
                                {React.cloneElement(childrenArray[index], {
                                    position: { x: position.x + mouseDeltas.x, y: position.y + mouseDeltas.y },
                                    selected: false,
                                    dragging: true,
                                    ref: el => childRefs.current[`dragging_${index}`] = el,
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default DesktopGrid;
