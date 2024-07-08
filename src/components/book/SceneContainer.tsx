'use client';

import SiteGrid from '@/components/SiteGrid';
import { Photo } from '../../photo';
import PanelLayout from './PanelLayout';
import { Book } from '@/books/types';

export default function SceneContainer({
    cacheKey,
    photos,
    editMode,
    tags,
    book,
    currentScene,
    currentChapter,
    setCurrentScene,
    setSceneUpdate,
    sceneUpdate
}: {
    cacheKey: string
    photos: Photo[]
    editMode: boolean
    tags?: string
    animateOnFirstLoadOnly?: boolean
    header?: JSX.Element
    book: Book
    currentScene: number,
    currentChapter: number,
    setCurrentScene: (scene: number) => void;
    setSceneUpdate: (update: boolean) => void;
    sceneUpdate: boolean;
}) {


    return (
        <SiteGrid
            classNameSub="scene-photos"
            className="scene-container-relative"
            contentMain={<div className="scene-container" >
                <div id="">
                    <div className="" >
                        <PanelLayout {...{
                            photos,
                            book,
                            tags,
                            currentScene,
                            currentChapter,
                            editMode,
                            setCurrentScene,
                            setSceneUpdate,
                            sceneUpdate
                        }} />
                    </div>
                </div>
            </div>}

        />
    );
}
