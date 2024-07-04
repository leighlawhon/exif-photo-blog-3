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
                <div className={clsx('grid gap-0.5 sm:gap-1 grid-cols-2 xs:grid-cols-2 items-center, book')}>

                <ReaderText editMode={editMode} book={book} />

                {photos.length > 0 ? (
                    <SceneContainer
                        cacheKey={`page-${'PATH_READER'}`} // Assuming PATH_READER is a constant defined elsewhere
                        photos={photos}
                        editMode={editMode}
                            book={book}
                    />
                ) : (
                    <div>No photos</div>
                )}
                </div>
            </ToggleSwitch>
        </div>
    );
};

export default EditContainer;