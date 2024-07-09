import { Character, Panel } from '@/books/types';
import React, { useState, useCallback, useEffect } from 'react';

const Draggable: React.FC<{ currentCharacters: Character[], children: React.ReactNode, editMode: boolean, photoTags: string[], sceneTag: string, setBookCharactersCSS: (css: { character: string, fromleft: string, fromtop: string }) => void }> = ({
    children,
    photoTags,
    currentCharacters,
    editMode,
    sceneTag,
    setBookCharactersCSS
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
    const [cssTop, setCSSTop] = useState<string>();
    const [cssLeft, setCSSLeft] = useState<string>();
    const [currentChar, setCurrentChar] = useState<string>('');




    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

    };

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (editMode) {
            setIsDragging(true);
            setPanelPosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

    }, []);

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (isDragging && editMode) {
            const newX = event.clientX - panelPosition.x;
            const newY = event.clientY - panelPosition.y;
            const draggableContainer = event.currentTarget;
            draggableContainer.style.position = 'absolute';
            draggableContainer.style.left = `${newX}px`;
            draggableContainer.style.top = `${newY}px`;
        }
    }, [isDragging]);

    const handleMouseUp = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();


        if (editMode) {
            setIsDragging(false);
            setBookCharactersCSS({ character: currentChar, fromleft: `${event.currentTarget.offsetLeft}px`, fromtop: `${event.currentTarget.offsetTop}px` });
        }
    }, []);


    useEffect(() => {
        currentCharacters.forEach((character) => {
            if (photoTags.includes(character.name) && photoTags.includes(sceneTag)) {
                setCurrentChar(character.name);
                if (character.css !== "") {
                    const parsedCSS = JSON.parse(character.css);
                    console.log("character_________PARSE", parsedCSS);
                    setCSSTop(parsedCSS.fromtop);
                    setCSSLeft(parsedCSS.fromleft); // Pass the new value of cssLeft here
                }
            }
        });
        console.log("panelClasses", cssLeft, cssTop, "panelClasses")
    }, [currentCharacters, photoTags, sceneTag, cssLeft, cssTop, setCSSTop, setCSSLeft, setCurrentChar]);

    console.log(cssLeft, cssTop, "cssLeft, cssTop")
    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            style={{
                "left": cssLeft,
                "background": "red",
                "cursor": isDragging ? 'grabbing' : 'grab',
                "top": cssTop
            }}
            className='draggable_container'
        >
            {editMode && 
                <span className="move" >
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 51 51">
                    <path d="M43.1,31.7c6.7-6.2,6.7-6.6-.3-12.8-.6-.7-1.5-1.1-2.4-1.3-.5,0-.9.2-1.3.5-1.5,1.3-.8,2.6.3,3.8.3.3.7.6.3,1.3h-10.6c-1.3,0-1.9-.7-1.9-2v-11.1c.5.3.9.6,1.4.9.6.6,1.4,1,2.2,1.1.6,0,1.1-.3,1.4-.7,1.4-1.4.4-2.7-.7-3.9-3.1-3.5-4.8-5.2-6.5-5.2h0c-1.7,0-3.4,1.7-6.5,5.2,0,0-.1.2-.2.2-1,1.1-1.7,2.4-.5,3.6.4.4.9.7,1.4.7.7,0,1.4-.4,2-.9.4-.3.8-.6,1.6-1.2,0,4,0,7.6,0,11.2,0,1.3-.6,2-1.9,2h-11.4c.9-1.1,1.3-1.5,1.7-2.1.7-1.1,.8-2.2-.3-3.1-.4-.3-.8-.5-1.3-.5-.6,0-1.2,.3-1.6,.7-.5,.4-.9,.8-1.4,1.3q-6,5.8,0,11.6c.9,.9,1.8,2.1,3,2.1,.6,0,1.1-.3,1.5-.7,1.8-1.6,0-3-.9-4.4,0-.1,0-.4,.1-.7h10.1c1.1,0,2.3,0,2.3,1.5,0,3.7,0,7.5,0,11.7-1-.8-1.5-1.2-2-1.5-.5-.4-1-.6-1.6-.6-.6,0-1.2,.3-1.5,.8-.9,1.1-.6,2.2,.3,3.2,.3,.4,.7,.8,1.1,1.2,3,3.1,4.4,4.6,5.9,4.6s3-1.5,5.9-4.6c1.2-1.2,2.8-2.5,1.3-4.3-.4-.5-.9-.8-1.5-.8-1,0-1.9,1-2.8,1.6,0,0-.1,0-.2,0-.1,0-.3,0-.6,0,0-3.5,0-7,0-10.5,0-1.2,.4-2.1,1.8-2.1,1.6,0,3.1,0,4.7,0h6.4c0,.3-.2,.6-.3,1-1.1,1.2-2.4,2.6-.7,4.1,.4,.4,.9,.6,1.4,.6,1,0,1.8-.9,2.7-1.6Z" />
                </svg>
                </span>}
            {children}
        </div>
    );
};

export default Draggable;
