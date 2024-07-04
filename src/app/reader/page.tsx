import { PATH_READER } from '@/site/paths';
import {
    INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/photo';
import { Metadata } from 'next/types';
import { getPhotos } from '@/photo/db/query';
import { cache } from 'react';
import BookSelector from '@/components/scenes/BookSelector';

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
    ] = await Promise.all([
        getPhotosCached()
            .catch(() => []),
    ]);

    return (

        <BookSelector editMode={false} />

    );
}
