import { PATH_BOOK_DYNAMIC, PATH_READER } from '@/site/paths';
import {
    INFINITE_SCROLL_GRID_PHOTO_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/photo';
import { Metadata } from 'next/types';
import { getPhotos } from '@/photo/db/query';
import { cache } from 'react';
import BookContainer from '@/components/scenes/BookContainer';

import { getBook } from '@/books/actions';
import { BookMeta } from '@/books/types';
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

async function getBookMetaData(): Promise<BookMeta | null> {
    const bookId = getBookIdFromUrl();
    if (!bookId) {
        return null;
    }
    const book = await getBook(bookId).catch(() => null);
    if (!book) {
        return null;
    } else {
        let bookChapters: any = [];

        book.chapters.forEach((chapter, i) => {
            bookChapters.push({ chapterIndex: i })
            chapter.chapter.scenes.forEach((scene, j) => {
                bookChapters.chapters[i].scenes.push({ sceneIndex: j })
                scene.panels.forEach((panel, k) => {
                    bookChapters.chapters[i].scenes[j].panels.push({ panelIndex: k, characters: panel.characters, action: panel.action, environment: panel.environment })
                });
            }
            );
        });
        console.log(bookChapters, "___________________");

        return {
            _id: bookId,
            titleTag: book.title,
            chapters: bookChapters
        };
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);
    return generateOgImageMetaForPhotos(photos);
}

const cacheKey = "page-" + PATH_BOOK_DYNAMIC;

export default async function BookPage() {
    const [
        photos,
        bookMetadata
    ] = await Promise.all([
        getPhotosCached(),
        getBookMetaData()
            .catch(() => []),
    ]);

    return (
        <div>
            <BookContainer photos={photos} />
        </div>

    );
}
