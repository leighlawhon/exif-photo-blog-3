
import React, { useState } from 'react';


interface PhotoToggleProps {
    characters: string[];
    handleUpdate: (tag: string) => void;
}

const PhotoToggle = ({ characters, handleUpdate }: PhotoToggleProps) => {
    const [selected, setSelected] = useState('All');


    const charactertag = (character: string) => character.replace(/'/g, "").replace(/\(|\)/g, "").replace(" ", "-").toLowerCase(); 
    return (
        <div className="toggle-button-bar">
            <button
                className={`toggle-button ${selected === 'All' ? 'active' : ''}`}
                onClick={() => handleUpdate('All')}
            >
                View All
            </button>
            {characters.map((character, i) => (

                <button
                    key={"character" + i}
                    className={`toggle-button ${selected === charactertag(character) ? 'active' : ''} ${charactertag(character)}`}
                    onClick={() => { handleUpdate(charactertag(character)) }}
                >
                    {character.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(" ", "-").toLowerCase() || 'Photo'}
                </button>
            ))}
        </div>
    );
};


export default PhotoToggle;