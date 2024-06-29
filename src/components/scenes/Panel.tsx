'use client';

import { Photo, altTextForPhoto, doesPhotoNeedBlurCompatibility } from '../photo';
import ImageMedium from '@/components/image/ImageMedium';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { SHOULD_PREFETCH_ALL_LINKS } from '@/site/config';
import { useRef } from 'react';
import useOnVisible from '@/utility/useOnVisible';

export default function PhotoMedium({
    photo,
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

        <ImageMedium
            src={photo.url}
            aspectRatio={photo.aspectRatio}
            blurDataURL={photo.blurData}
            blurCompatibilityMode={doesPhotoNeedBlurCompatibility(photo)}
            className="flex object-cover w-full h-full"
            imgClassName="object-cover w-full h-full"
            alt={altTextForPhoto(photo)}
            priority={priority}
        />
    );
};
