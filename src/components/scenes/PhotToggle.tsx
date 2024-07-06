
import React, { useState } from 'react';


interface PhotoToggleProps {
    characters: string[];
    handleUpdate: (tag: string) => void;
}

const PhotoToggle = ({ characters, handleUpdate }: PhotoToggleProps) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('All');

    const formatCharacterTag = (character: string) => {
        const chracterSlug = character.replace(/'/g, "").replace(/\(|\)/g, "").replace(" ", "-").toLowerCase();
        return chracterSlug
    };
    const activateCharacterButton = (character: string) => {
        handleUpdate(character);
        setSelectedCharacter(character);
        console.log("selected:", character, selectedCharacter);
    }
    const activateAllButton = () => {
        handleUpdate('All');
        setSelectedCharacter('All');
    }
    console.log(selectedCharacter, "____________")
    // const charactertag = (character: string) => characterTag.replace(/'/g, "").replace(/\(|\)/g, "").replace(" ", "-").toLowerCase(); 
    return (
        <div className="toggle-button-bar">
            <button
                className={`toggle-button ${selectedCharacter === 'All' ? 'active' : ''}`}
                onClick={() => activateAllButton()}
            >
                View All
            </button>

            {characters.map((character, i) => {
                // setCharacterTag(character);
                return (

                    <button
                        key={"character-" + i}
                        className={`toggle-button ${selectedCharacter === formatCharacterTag(character) ? 'active' : ''}`}
                        onClick={() => { activateCharacterButton(formatCharacterTag(character)) }}
                    >
                        {formatCharacterTag(character)}
                    </button>
                )
            })}
        </div>
    );
};


export default PhotoToggle;