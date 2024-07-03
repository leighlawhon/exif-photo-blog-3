'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import ToggleSwitch from './ToggleSwitch';
import ReaderText from './ReaderText';
import SceneContainer from './SceneContainer';
import { Photo } from '@/photo';
import { Book } from '@/books/types';
import JsonFileUploader from './JsonFileUploader';


interface BookEditorProps {
    photos: Photo[];
    book: Book;
    toggleEditMode: boolean;
    toggleEditFunc: () => void;
}

const EditContainer: React.FC<BookEditorProps> = ({ photos, toggleEditFunc, toggleEditMode, book }) => {

    return (
        <div id="comic-page" >
            <ToggleSwitch onToggle={toggleEditFunc} isVisible={true} >
                <JsonFileUploader editMode={toggleEditMode} bookID={book._id} mode="update" />


                <ReaderText editMode={toggleEditMode} book={book} />

                {photos.length > 0 ? (
                    <SceneContainer
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