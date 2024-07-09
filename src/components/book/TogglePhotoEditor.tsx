import React, { useState, useEffect } from 'react';
import slugify from './utility';
import { Photo } from '@/photo';
import { convertPhotoToFormData } from '@/photo/form';
import { PhotoFormTags } from '@/photo/form/PhotoForm';


interface TogglePhotoEditorProps {
    character: string;
    handleUpdate: (setChar: string) => void;
    photos: Photo[];
    index: number;
    selectedCharacter: string;
    setSelectedCharacter: (setChar: string) => void;
}

const TogglePhotoEditor = ({ character, setSelectedCharacter, selectedCharacter, handleUpdate, photos, index }: TogglePhotoEditorProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const activateCharacterButton = (character: string) => {
        handleUpdate(character);
        setSelectedCharacter(character);
        console.log(selectedCharacter, "selectedCharacter");
    }

    const setsOpen = () => {
        console.log(isOpen)
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        // handleUpdate(selectedCharacter);
    });

    return (
        <div key={"character-" + index}>
            <button
                className={`toggle-button ${selectedCharacter === slugify(character) ? 'active' : ''}`}
                onClick={() => { activateCharacterButton(slugify(character)) }}
            >
                {slugify(character)}
            </button>
            <span className={`toggle-button ${selectedCharacter === slugify(character) ? 'active' : ''}`}>
                <label className="toggle-switch">
                    <input type="checkbox" checked={isOpen} onChange={setsOpen} />
                    <span className="slider"></span>
                </label>
            </span>
            <div className={`dropdownlist ${isOpen ? 'open' : 'closed'}`}>
                {photos.filter((photo) => photo.tags.includes(slugify(character))).map((photo, i) => {
                    const photoForm = convertPhotoToFormData(photo);

                    return (
                        <PhotoFormTags type="edit" key={`photo-form- ${i}`} initialPhotoForm={photoForm} />
                    )
                })}
            </div>
        </div>
    );
};

export default TogglePhotoEditor;






