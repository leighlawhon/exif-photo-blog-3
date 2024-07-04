import { INFINITE_SCROLL_GRID_PHOTO_INITIAL, Photo } from '@/photo';
import Panel from './Panel';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { GRID_ASPECT_RATIO, HIGH_DENSITY_GRID } from '@/site/config';
import { cache } from 'react';
import { getPhotos } from '@/photo/db/query';
import { Book } from '@/books/types';

export default function PanelLayout({
    editMode,
    photos,
    selectedPhoto,
    tag,
    camera,
    simulation,
    focal,
    photoPriority,
    additionalTile,
    book,
    onLastPhotoVisible,
    onAnimationComplete,
}: {
        editMode: boolean
    photos: Photo[]
    selectedPhoto?: Photo
    tag?: string
    camera?: Camera
    simulation?: FilmSimulation
    focal?: number
    photoPriority?: boolean
    additionalTile?: JSX.Element
        book?: Book
    onLastPhotoVisible?: () => void
    onAnimationComplete?: () => void
}) {
    return (
        <div>

            {editMode && <span className="phototag">{book?.chapters[0].chapter.scenes[0].panels[0].characters[0]}</span>}
            {photos.map((photo, index) =>
                <Panel
                    {...{
                        editMode,
                        photo,
                        photoTitle: photo.title ?? '',
                        tag,
                        camera,
                        simulation,
                        focal,
                        selected: photo.id === selectedPhoto?.id,
                        priority: photoPriority,
                        onVisible: index === photos.length - 1
                            ? onLastPhotoVisible
                            : undefined,
                    }}
                    className="flex w-full h-full"
                    key={photo.id}
                />
            ).concat(additionalTile ?? [])}

        </div>
    );
};
