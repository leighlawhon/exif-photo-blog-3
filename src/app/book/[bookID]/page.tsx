import { PATH_BOOK_DYNAMIC, PATH_READER } from '@/site/paths';
import {
    INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/photo';
import { Metadata } from 'next/types';
import { getPhotos } from '@/photo/db/query';
import { cache } from 'react';
import BookContainer from '@/components/book/BookContainer';

import { getBook } from '@/books/actions';

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const getPhotosCached = cache(() => getPhotos({
    limit: INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    // tag: "sitting"
}));



function getBookIdFromUrl(): string {
    const url = window.location.href;
    const urlParams = new URLSearchParams(url);
    return urlParams.get('bookID') || '';
}



export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);
    return generateOgImageMetaForPhotos(photos);
}

const cacheKey = "page-" + PATH_BOOK_DYNAMIC;

export default async function BookPage() {
    const [
        photos
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
