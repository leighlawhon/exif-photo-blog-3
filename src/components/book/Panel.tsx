'use client';

import { Photo, altTextForPhoto, doesPhotoNeedBlurCompatibility } from '@/photo';
import { useRef } from 'react';
import useOnVisible from '@/utility/useOnVisible';
import Draggable from './Drag';

export default function Panel({
    photo,
    photoTitle,
    onVisible,
    sceneTag,
    index,
    rootPosition,
    editMode
}: {
    photoTitle: string
    photo: Photo
    editMode: boolean
    tag?: string
    selected?: boolean
    prefetch?: boolean
    className?: string
    onVisible?: () => void
    sceneTag: string,
    index: number,
    rootPosition: { top: number; left: number; }
}) {

    return (
        <Draggable editMode={editMode} sceneTag={sceneTag} imageID={`image-${index}`} rootPosition={rootPosition}>
            <div className={`panel ${sceneTag} image-${index} `}>
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
