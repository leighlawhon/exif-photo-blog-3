'use client';

import { Photo, altTextForPhoto, doesPhotoNeedBlurCompatibility } from '@/photo';
import { useRef } from 'react';
import useOnVisible from '@/utility/useOnVisible';
import Draggable from './Drag';
import slugify from './utility';

export default function Panel({
    photo,
    photoTitle,
    sceneTag,
    index,
    editMode,
}: {
        photoTitle: string;
        photo: Photo;
        editMode: boolean;
        tag?: string;
        selected?: boolean;
        prefetch?: boolean;
        className?: string;
        onVisible?: () => void;
        sceneTag: string;
        index: number;
}) {

    return (
        <Draggable editMode={editMode} sceneTag={sceneTag} imageID={`image-${index}`} >
            <div >
                <img
                    src={photo.url}
                    key={photoTitle}
                    alt={altTextForPhoto(photo)}
                    className={photo.tags.includes('scene') ? `scene ${photo.id}` : `character  ${photo.id}`}
                />
            </div>
        </Draggable>

    );
};
