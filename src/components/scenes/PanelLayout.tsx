import { Photo } from '../photo';
import PhotoMedium from '../photo/PhotoMedium';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { GRID_ASPECT_RATIO, HIGH_DENSITY_GRID } from '@/site/config';

export default function PanelLayout({
    photos,
    selectedPhoto,
    tag,
    camera,
    simulation,
    focal,
    photoPriority,
    additionalTile,
    small,
    onLastPhotoVisible,
    onAnimationComplete,
}: {
    photos: Photo[]
    selectedPhoto?: Photo
    tag?: string
    camera?: Camera
    simulation?: FilmSimulation
    focal?: number
    photoPriority?: boolean
    additionalTile?: JSX.Element
    small?: boolean
    onLastPhotoVisible?: () => void
    onAnimationComplete?: () => void
}) {
    return (
        <div>
            {photos.map((photo, index) =>
                <div
                    key={photo.id}

                >
                    <PhotoMedium
                        className="flex w-full h-full"
                        {...{
                            photo,
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
                    />
                </div>).concat(additionalTile ?? [])}
            itemKeys={photos.map(photo => photo.id)
                .concat(additionalTile ? ['more'] : [])}
        </div>
    );
};
