'use client';

import SiteGrid from '@/components/SiteGrid';
import { Photo } from '../../photo';
import PanelLayout from './PanelLayout';
import { clsx } from 'clsx/lite';
import { useCallback, useState } from 'react';

export default function SceneContainer({
    cacheKey,
    photos,
    editMode,
    tags,
    animateOnFirstLoadOnly,
    header,
}: {
    cacheKey: string
    photos: Photo[]
        editMode: boolean
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
                    <p>{tags}</p>
                    <div className="space-y-0.5 sm:space-y-1" >
                        {tags}
                        <PanelLayout {...{
                            photos,
                            tags,
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
