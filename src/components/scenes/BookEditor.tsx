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
    editMode: boolean;
    toggleEditFunc: () => void;
}

const EditContainer: React.FC<BookEditorProps> = ({ photos, toggleEditFunc, editMode, book }) => {
    console.log(editMode, "editMode")

    return (
        <div id="comic-page" >
            <ToggleSwitch onToggle={toggleEditFunc} isVisible={true} >
                <JsonFileUploader editMode={editMode} bookID={book._id} mode="update" />


                <ReaderText editMode={editMode} book={book} />

                {photos.length > 0 ? (
                    <SceneContainer
                        cacheKey={`page-${'PATH_READER'}`} // Assuming PATH_READER is a constant defined elsewhere
                        photos={photos}
                        editMode={editMode}
                    />
                ) : (
                    <div>No photos</div>
                )}
            </ToggleSwitch>
        </div>
    );
};

export default EditContainer;