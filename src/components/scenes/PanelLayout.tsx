import { Photo } from '@/photo';
import Panel from './Panel';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { GRID_ASPECT_RATIO, HIGH_DENSITY_GRID } from '@/site/config';

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
    small,
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
    small?: boolean
    onLastPhotoVisible?: () => void
    onAnimationComplete?: () => void
}) {
    return (
        <div className="panel"> 
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
