import React, { useState, Dispatch, SetStateAction, useEffect, Fragment } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { Photo, deleteConfirmationTextForPhoto, titleForPhoto } from '@/photo';
import slugify from './utility';
import TagInput from '../TagInput';
import PhotoForm, { PhotoFormTags } from '@/photo/form/PhotoForm';
import PhotoSmall from '@/photo/PhotoSmall';
import clsx from 'clsx';
import Link from 'next/link';
import { pathForAdminPhotoEdit, pathForPhoto } from '@/site/paths';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import PhotoDate from '@/photo/PhotoDate';
import EditButton from '@/admin/EditButton';
import PhotoSyncButton from '@/admin/PhotoSyncButton';
import FormWithConfirm from '../FormWithConfirm';
import { deletePhotoFormAction } from '@/photo/actions';
import { revalidatePhoto } from '@/photo/cache';
import DeleteButton from '@/admin/DeleteButton';
import AdminPhotosTable from '@/admin/AdminPhotosTable';
import { AI_TEXT_GENERATION_ENABLED } from '@/site/config';
import { convertPhotoToFormData } from '@/photo/form';


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

                // function onLastPhotoVisible(): void {
                //     throw new Error('Function not implemented.');
                // }

                // function opacityForPhotoId(id: string): string | undefined {
                //     throw new Error('Function not implemented.');
                // }

                // function invalidateSwr(): void {
                //     throw new Error('Function not implemented.');
                // }

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
                        <div className={`dropdownlist ${isOpen ? 'open' : 'closed'}`}>
                            {photos.filter((photo) => photo.tags.includes(slugify(character))).map((photo, i) => {
                                const photoForm = convertPhotoToFormData(photo);

                                return (
                                    // <div className={"selector-thumabnail"} key={"char-tag-" + i}>
                                    //     <input
                                    //         className="image-radio"
                                    //         type="radio"
                                    //         id={`radio-${i}`}
                                    //         name="selectedPhoto"
                                    //         checked={selectedPhoto === photo}
                                    //         onChange={(e) => setSelectedPhoto(photo)}
                                    //     />
                                    //     <label htmlFor={`radio-${i}`}><img src={photo.url} /></label>


                                    // </div>
                                    <PhotoFormTags type="edit" key={`photo-form- ${i}`} initialPhotoForm={photoForm} />
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
