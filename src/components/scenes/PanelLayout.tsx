import { useState } from 'react';
import { Photo } from '@/photo';
import ScenePanel from './ScenePanel';
import { Book } from '@/books/types';

export default function PanelLayout({
    editMode,
    photos,
    book,
    currentScene,
    currentChapter,
    sceneUpdate,
    setSceneUpdate
}: {
        editMode: boolean;
        photos: Photo[];
        book?: Book;
        currentScene: number;
        currentChapter: number;
        sceneUpdate: boolean;
        setSceneUpdate: (update: boolean) => void;
    }) {
    const [panelTagPhotos, setPanelTagPhotos] = useState<Photo[]>(photos);
    const [sceneTag, setSceneTag] = useState<string>('');



    const handlePanelPhotosFilter = (newTag: string) => {
        const scenePhotos = photos.filter(photo => photo.tags.includes(newTag));
        setSceneTag(newTag);
        setPanelTagPhotos(scenePhotos);
    };

    return (
        <div>
            <div className="panel-container">
                {book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) => {
                    return (
                        <ScenePanel
                            photos={photos}
                            panel={panel}
                            currentChapter={currentChapter}
                            currentScene={currentScene}
                            editMode={editMode}
                            key={"scene-panel-" + i}
                            index={i}
                            sceneUpdate
                            setSceneUpdate={setSceneUpdate}
                            handlePanelPhotosFilter={handlePanelPhotosFilter}
                        />
                    );
                })}
            </div>
        </div>
    );
}
