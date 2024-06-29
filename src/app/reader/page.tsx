
import ReaderText from '@/components/scenes/ReaderText';
import SceneContainer from '@/components/scenes/SceneContainer';
import ScenePanel from '@/components/scenes/ScenePanel';
import { PATH_READER } from '@/site/paths';
import { GRID_ASPECT_RATIO, HIGH_DENSITY_GRID } from '@/site/config';
import { clsx } from 'clsx/lite';

import {
    INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/photo';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotoSidebarData } from '@/photo/data';
import { getPhotos } from '@/photo/db/query';
import { cache } from 'react';
import PhotoGridPage from '@/photo/PhotoGridPage';

export const dynamic = 'force-static';

const getPhotosCached = cache(() => getPhotos({
    limit: INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    tag: "sitting"
}));

export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);
    return generateOgImageMetaForPhotos(photos);
}

const cacheKey = "page-" + PATH_READER;

export default async function ReaderPage({ small }: { small?: boolean }) {
    const [
        photos,
        photosCount,
        tags,
        cameras,
        simulations,
    ] = await Promise.all([
        getPhotosCached()
            .catch(() => []),
        ...getPhotoSidebarData(),
    ]);

    return (
        <div className={clsx(
            'grid gap-0.5 sm:gap-1, grid-cols-2 xs:grid-cols-6, items-center'
        )}>
            <ReaderText />
            {
                photos.length > 0 ?
                    <SceneContainer
                        cacheKey={`page-${PATH_READER}`}
                        photos={photos}
                        count={photosCount}
                    >
                    </SceneContainer>
                    : <div>No photos</div>
            }
        </div>
    );
}
