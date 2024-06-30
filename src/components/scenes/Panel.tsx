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
        editMode: boolean
    photo: Photo
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
        <div>
            
            <Draggable>
                <img
                    src={photo.url}
                    key={photo.id}
                    alt={altTextForPhoto(photo)}
                    className={photo.tags.includes('scene') ? 'scene' : 'character'}
                />
            </Draggable>

        </div>

    );
};
