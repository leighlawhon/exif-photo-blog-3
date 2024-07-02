'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import ToggleSwitch from './ToggleSwitch';
import ReaderText from './ReaderText';
import SceneContainer from './SceneContainer';
import { Photo } from '@/photo';

interface EditContainerProps {
    photos: Photo[];
}

const EditContainer: React.FC<EditContainerProps> = ({ photos }) => {
    const [editMode, setEditMode] = useState(true);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div id="comic-page" >
            <ToggleSwitch onToggle={toggleEditMode} isVisible={true} >
                <ReaderText editMode={editMode} />
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