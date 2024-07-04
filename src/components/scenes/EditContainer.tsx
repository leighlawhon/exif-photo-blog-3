'use client';
// OLD
import React, { useState } from 'react';
import clsx from 'clsx';
import ToggleSwitch from './ToggleSwitch';
import ReaderText from './ReaderText';
import SceneContainer from './SceneContainer';
import { Photo } from '@/photo';
import { Book } from '@/books/types';

interface EditContainerProps {
    photos: Photo[];
    book: Book;
    toggleEditMode: boolean;
    toggleEditFunc: () => void;
}

const EditContainer: React.FC<EditContainerProps> = ({ photos, toggleEditFunc, toggleEditMode, book }) => {


    return (
        <div id="comic-page" >
            <ToggleSwitch onToggle={toggleEditFunc} isVisible={true} >

                <ReaderText editMode={toggleEditMode} book={book} />

                {photos.length > 0 ? (
                    <SceneContainer
                        book={book}
                        cacheKey={`page-${'PATH_READER'}`} // Assuming PATH_READER is a constant defined elsewhere
                        photos={photos}
                        editMode={toggleEditMode}
                    />
                ) : (
                    <div>No photos</div>
                )}
            </ToggleSwitch>
        </div>
    );
};

export default EditContainer;