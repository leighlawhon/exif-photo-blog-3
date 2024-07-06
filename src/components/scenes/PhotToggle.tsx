import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

interface PhotoToggleProps {
    characters: string[];
    handleUpdate: (tag: string) => void;
    sceneUpdate: boolean;
}

const PhotoToggle = ({ characters, handleUpdate, sceneUpdate }: PhotoToggleProps) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('All');
    useEffect(() => {
        if (sceneUpdate) {
            setSelectedCharacter('All');
        }
    }, [sceneUpdate, selectedCharacter])

    const formatCharacterTag = (character: string) => {
        const chracterSlug = character.replace(/'/g, "").replace(/\(|\)/g, "").replace(" ", "-").toLowerCase();
        return chracterSlug
    };

    const activateCharacterButton = (character: string) => {
        handleUpdate(character);
        setSelectedCharacter(character);
    }

    const activateAllButton = () => {
        handleUpdate('All');
        setSelectedCharacter('All');
    }

    return (
        <div className="toggle-button-bar">
            <button
                className={`toggle-button ${selectedCharacter === 'All' ? 'active' : ''}`}
                onClick={() => activateAllButton()}
            >
                View All
            </button>

            {characters.map((character, i) => {
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
