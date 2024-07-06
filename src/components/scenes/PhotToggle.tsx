import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { Photo } from '@/photo';
import slugify from './utility';

interface PhotoToggleProps {
    characters: string[];
    handleUpdate: (tag: string) => void;
    sceneUpdate: boolean;
    photos: Photo[];
}

const PhotoToggle = ({ characters, handleUpdate, sceneUpdate, photos }: PhotoToggleProps) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('All');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo>();
    useEffect(() => {
        if (sceneUpdate) {
            setSelectedCharacter('All');
        }
    }, [sceneUpdate, selectedCharacter])

    const activateCharacterButton = (character: string) => {
        handleUpdate(character);
        setSelectedCharacter(character);
    }

    const activateAllButton = () => {
        handleUpdate('All');
        setSelectedCharacter('All');
    }
    const setsOpen = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
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
                    <div key={"character-" + i}>
                        <button

                            className={`toggle-button ${selectedCharacter === slugify(character) ? 'active' : ''}`}
                            onClick={() => { activateCharacterButton(slugify(character)) }}
                        >
                            {slugify(character)}
                        </button>
                        <span className="toggle-button">
                            <label className="toggle-switch">
                                <input type="checkbox" checked={isOpen} onChange={setsOpen} />
                                <span className="slider"></span>
                            </label>
                        </span>
                        <div className={`dropdownlist ${isOpen ? 'open' : ''}`}>
                            {photos.filter((photo) => photo.tags.includes(slugify(character))).map((photo, i) => {
                                return (
                                    <div className={"selector-thumabnail"} key={"char-tag-" + i}>
                                        <input
                                            type="radio"
                                            id={`radio-${i}`}
                                            name="selectedPhoto"
                                            checked={selectedPhoto === photo}
                                            onChange={(e) => setSelectedPhoto(photo)}
                                        />
                                        <label htmlFor={`radio-${i}`}><img src={photo.url} /></label>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default PhotoToggle;
