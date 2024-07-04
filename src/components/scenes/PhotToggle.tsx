
import React, { useState } from 'react';


interface PhotoToggleProps {
    characters: string[];
    onFilter: (tag: string) => void;
}

const PhotoToggle = ({ characters, onFilter }: PhotoToggleProps) => {
    const [selected, setSelected] = useState('All');

    const handleFilter = (tag: string) => {
        setSelected(tag);
        onFilter(tag);
        // Set CSS
    };

    return (
        <div className="toggle-button-bar">
            <button
                className={`toggle-button ${selected === 'All' ? 'active' : ''}`}
                onClick={() => handleFilter('All')}
            >
                View All
            </button>
            {characters.map((character, i) => (
                <button
                    key={"character" + i}
                    className={`toggle-button ${selected === character[i] ? 'active' : ''}`}
                    onClick={() => handleFilter(character)}
                >
                    {character || 'Photo'}
                </button>
            ))}
        </div>
    );
};

export default PhotoToggle;