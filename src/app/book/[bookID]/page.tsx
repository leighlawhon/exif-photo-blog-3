import { PATH_BOOK_DYNAMIC, PATH_READER } from '@/site/paths';
import {
    INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/photo';
import { Metadata } from 'next/types';
import { getPhotos } from '@/photo/db/query';
import { cache } from 'react';
import EditContainer from '@/components/scenes/EditContainer';
import BookContainer from '@/components/scenes/BookContainer';

export const dynamic = 'force-static';

const getPhotosCached = cache(() => getPhotos({
    limit: INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    tag: "the-great-gatsby"
}));


export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);
    return generateOgImageMetaForPhotos(photos);
}

const cacheKey = "page-" + PATH_BOOK_DYNAMIC;

export default async function BookPage() {
    const [
        photos,
    ] = await Promise.all([
        getPhotosCached()
            .catch(() => []),
    ]);

    return (
        <div>
            <BookContainer photos={photos} />
        </div>

    );
}
