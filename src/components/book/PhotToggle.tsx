import React, { useState, useEffect } from 'react';
import slugify from './utility';
import { Photo } from '@/photo';
import { convertPhotoToFormData } from '@/photo/form';
import { PhotoFormTags } from '@/photo/form/PhotoForm';
import TogglePhotoEditor from './TogglePhotoEditor';
import { Character } from '@/books/types';


interface TogglePhotoEditorProps {
    panelCharacters: Character[];
    handleUpdate: (tag: string) => void;
    photos: Photo[];
}

const PhotoToggle = ({ panelCharacters, handleUpdate, photos }: TogglePhotoEditorProps) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('All');

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

            {panelCharacters.map((character, i) => {

                return (
                    <TogglePhotoEditor key={`photoeditor- ${i}`} index={i} photos={photos} handleUpdate={handleUpdate} character={character.name} />
                )
            })}
        </div>
    );
};

export default PhotoToggle;
