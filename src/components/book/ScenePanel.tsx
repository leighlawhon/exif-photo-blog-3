import { Photo } from "@/photo";
import PhotoToggle from "./PhotToggle";
import PhotoPanelSet from "./PhotoPanelSet";
import { Panel } from "@/books/types";
import { useEffect, useState } from "react";

interface ScenePanelProps {
    photos: Photo[];
    panel: Panel;
    currentChapter: number;
    currentScene: number;
    editMode: boolean;
    index: number;
    setSceneUpdate: (scenereset: boolean) => void;
    sceneUpdate: boolean;
    handlePanelPhotosFilter: (sceneTag: string) => void;
}

export default function ScenePanel({
    photos,
    panel,
    currentChapter,
    currentScene,
    editMode,
    index,
    handlePanelPhotosFilter,
    sceneUpdate,
}: ScenePanelProps) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);
    const sceneTag = `panel-${currentChapter}-${currentScene}-${index}`;
    const [rootPosition, setRootPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        handlePanelPhotosFilter(sceneTag);
        setFilteredPhotos(photos.filter((photo) => photo.tags.includes(sceneTag)));
    }, [sceneTag]);

    const handleUpdate = (updateTag: string) => {
        if (updateTag === 'All') {
            setFilteredPhotos(photos.filter((photo) => photo.tags.includes(sceneTag)));
        } else {
            const furtherFiltered = filteredPhotos.filter(photo => photo.tags.includes(updateTag));
            setFilteredPhotos(furtherFiltered);
        }
    };

    return (
        <div key={"panel-layout-" + index}>
            {editMode && (
                <div className={"panel-tags-" + index}>
                    <PhotoToggle photos={photos} characters={panel.characters} handleUpdate={handleUpdate} sceneUpdate={sceneUpdate} />
                </div>
            )}
            <div id={sceneTag} key={"panel-" + index} className={"panel-" + index + ", panel-border"}>
                {editMode && <p>{sceneTag}</p>}
                {filteredPhotos.filter(photo => photo.tags.includes(sceneTag)).map((photo: Photo, i) => (
                    <PhotoPanelSet
                        photo={photo}
                        editMode={editMode}
                        key={"photo-" + i}
                        sceneTag={sceneTag}
                        index={i}
                        rootPosition={rootPosition}
                    />
                ))}
            </div>
        </div>
    );
}
