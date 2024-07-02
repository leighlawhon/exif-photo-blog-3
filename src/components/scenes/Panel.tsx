'use client';

import { Photo, altTextForPhoto, doesPhotoNeedBlurCompatibility } from '@/photo';
import ImageMedium from '@/components/image/ImageMedium';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { SHOULD_PREFETCH_ALL_LINKS } from '@/site/config';
import { useRef } from 'react';
import useOnVisible from '@/utility/useOnVisible';
import Draggable from './Drag';

export default function PhotoMedium({
    photo,
    photoTitle,
    editMode,
    tag,
    camera,
    simulation,
    focal,
    selected,
    priority,
    prefetch = SHOULD_PREFETCH_ALL_LINKS,
    className,
    onVisible,
}: {
        photoTitle: string
        photo: Photo
        editMode: boolean
        tag?: string
        camera?: Camera
        simulation?: FilmSimulation
        focal?: number
        selected?: boolean
        priority?: boolean
        prefetch?: boolean
        className?: string
        onVisible?: () => void
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    useOnVisible(ref, onVisible);

    return (

        <Draggable>
                <img
                id={photo.id}
                    src={photo.url}
                key={photoTitle}
                    alt={altTextForPhoto(photo)}
                    className={photo.tags.includes('scene') ? 'scene' : 'character'}
                />
            </Draggable>

    );
};
