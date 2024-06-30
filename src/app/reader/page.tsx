
import ReaderText from '@/components/scenes/ReaderText';
import SceneContainer from '@/components/scenes/SceneContainer';
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
import EditContainer from '@/components/scenes/EditContainer';

export const dynamic = 'force-static';

const getPhotosCached = cache(() => getPhotos({
    limit: INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    // tag: "sitting"
}));

export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);
    return generateOgImageMetaForPhotos(photos);
}

const cacheKey = "page-" + PATH_READER;

export default async function ReaderPage() {
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

        <EditContainer photos={photos} />

    );
}
