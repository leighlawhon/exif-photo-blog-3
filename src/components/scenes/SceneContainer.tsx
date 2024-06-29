'use client';

import SiteGrid from '@/components/SiteGrid';
import { Photo } from '../../photo';
import PanelLayout from '../../photo/PhotoGrid';
import { clsx } from 'clsx/lite';
import { useCallback, useState } from 'react';

export default function SceneContainer({
    cacheKey,
    photos,
    count,
    tags,
    animateOnFirstLoadOnly,
    header,
}: {
    cacheKey: string
    photos: Photo[]
    count: number
    tags?: string
    animateOnFirstLoadOnly?: boolean
    header?: JSX.Element
}) {
    const [
        shouldAnimateDynamicItems,
        setShouldAnimateDynamicItems,
    ] = useState(false);

    const onAnimationComplete = useCallback(() =>
        setShouldAnimateDynamicItems(true), []);

    const initialOffset = photos.length;

    return (
        <SiteGrid
            contentMain={<div className={clsx(
                header && 'space-y-8 mt-4',
            )}>
                <div id="scene-container">

                    <div className="space-y-0.5 sm:space-y-1" id="photo-grid">
                        <PanelLayout {...{
                            photos,
                            tags,
                            animateOnFirstLoadOnly,
                            onAnimationComplete,
                        }} />
                    </div>
                </div>
            </div>}

        />
    );
}
