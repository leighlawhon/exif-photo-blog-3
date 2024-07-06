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

const BookEditor: React.FC<BookEditorProps> = ({ photos, toggleEditFunc, editMode, book }) => {
    const [currentScene, setCurrentScene] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentPanel, setCurrentPanel] = useState<number>(0);
    const [sceneUpdate, setSceneUpdate] = useState<boolean>(false);
    const publishBook = () => {

    }

    return (
        <div id="comic-page" >
            <button onClick={publishBook}>Publish</button>
            <ToggleSwitch onToggle={toggleEditFunc} isVisible={true} >
                <JsonFileUploader editMode={editMode} bookID={book._id} mode="update" />
                <div className={clsx('grid gap-0.5 sm:gap-1 grid-cols-2 xs:grid-cols-2 items-center, book')}>

                    <ReaderText setSceneUpdate={setSceneUpdate} sceneUpdate={sceneUpdate} editMode={editMode} book={book} currentScene={currentScene} currentChapter={currentChapter} setCurrentScene={setCurrentScene} setCurrentChapter={setCurrentChapter} />

                {photos.length > 0 ? (
                    <SceneContainer
                        cacheKey={`page-${'PATH_READER'}`} // Assuming PATH_READER is a constant defined elsewhere
                        photos={photos}
                            currentScene={currentScene}
                            currentChapter={currentChapter}
                            setCurrentScene={setCurrentScene}
                            currentPanel={currentPanel}
                        editMode={editMode}
                            book={book}
                            setSceneUpdate={setSceneUpdate}
                            sceneUpdate={sceneUpdate}
                    />
                ) : (
                    <div>No photos</div>
                )}
                </div>
            </ToggleSwitch>
        </div>
    );
};

export default BookEditor;