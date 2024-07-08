import { Photo } from "@/photo";
import PhotoToggle from "./PhotToggle";
import PhotoPanelSet from "./PhotoPanelSet";
import { Character, Panel } from "@/books/types";
import { useEffect, useState } from "react";
import slugify from "./utility";

interface ScenePanelProps {
    photos: Photo[];
    panel: Panel;
    currentChapter: number;
    currentScene: number;
    editMode: boolean;
    index: number;
    handlePanelPhotosFilter: (sceneTag: string) => void;
    setBookCharactersCSS: (css: string) => void;
    panelCharacters: Character[];
}

export default function ScenePanel({
    photos,
    panel,
    currentChapter,
    currentScene,
    editMode,
    index,
    handlePanelPhotosFilter,
    setBookCharactersCSS,
    panelCharacters
}: ScenePanelProps) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);
    const [filteredScenePhotos, setFilteredScenePhotos] = useState<Photo[]>(photos);
    const sceneTag = `panel-${currentChapter}-${currentScene}-${index}`;
    useEffect(() => {
        handlePanelPhotosFilter(sceneTag);
        setFilteredPhotos(photos.filter((photo) => photo.tags.includes(sceneTag)));
        setFilteredScenePhotos(photos.filter((photo) => {
            const photosInScene = photo.tags.includes(sceneTag);
            return photosInScene
        }));
    }, [sceneTag, panel.characters, photos]);

    const handleUpdate = (updateTag: string) => {
        if (updateTag === 'All') {
            setFilteredPhotos(filteredScenePhotos);
        } else {
            const furtherFiltered = filteredScenePhotos.filter(photo => photo.tags.includes(updateTag));
            setFilteredPhotos(furtherFiltered);
        }
    };

    return (
        <div key={"panel-layout-" + index}>
            {editMode && (
                <div className={"panel-tags-" + index}>
                    <PhotoToggle photos={photos} panelCharacters={panelCharacters} handleUpdate={handleUpdate} />
                </div>
            )}
            <div id={sceneTag} key={"panelset-" + index} className={"panelset-" + index + ", panel-border"}>

                {filteredPhotos.map((photo: Photo, i) => {
                    return (
                    <PhotoPanelSet
                            setBookCharactersCSS={setBookCharactersCSS}
                            panel={panel}
                        photo={photo}
                        editMode={editMode}
                        key={"photo-" + i}
                        sceneTag={sceneTag}
                            index={i}
                    />
                    )
                })}
            </div>
        </div>
    );
}
