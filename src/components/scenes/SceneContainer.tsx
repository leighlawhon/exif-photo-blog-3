'use client';

import SiteGrid from '@/components/SiteGrid';
import { Photo } from '../../photo';
import PanelLayout from './PanelLayout';
import { clsx } from 'clsx/lite';
import { useCallback, useState } from 'react';
import PhotoToggle from './PhotToggle';
import { Book } from '@/books/types';

export default function SceneContainer({
    cacheKey,
    photos,
    editMode,
    tags,
    animateOnFirstLoadOnly,
    header,
    book,
    currentScene,
    currentChapter
}: {
        cacheKey: string
        photos: Photo[]
        editMode: boolean
        tags?: string
        animateOnFirstLoadOnly?: boolean
        header?: JSX.Element
        book: Book
        currentScene: number,
        currentChapter: number
}) {
    const [
        shouldAnimateDynamicItems,
        setShouldAnimateDynamicItems,
    ] = useState(false);
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    const onAnimationComplete = useCallback(() =>
        setShouldAnimateDynamicItems(true), []);

    const initialOffset = photos.length;
    const handleFilter = (tag: string) => {
        if (tag === 'All') {
            setFilteredPhotos(photos);
        } else {
            setFilteredPhotos(photos.filter(photo => photo.id === tag));
        }
    };
    return (
        <SiteGrid
            contentMain={<div className={clsx(
                header && 'space-y-8 mt-4',
            )}>
                <div id="scene-container">
                    <div className="space-y-0.5 sm:space-y-1" >

                        {editMode && <PhotoToggle photos={photos} onFilter={handleFilter} />}
                        <PanelLayout {...{
                            photos: filteredPhotos,
                            book,
                            tags,
                            currentScene,
                            currentChapter,
                            animateOnFirstLoadOnly,
                            onAnimationComplete,
                            editMode,
                        }} />
                    </div>
                </div>
            </div>}

        />
    );
}
