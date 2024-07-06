import { Photo } from "@/photo";
import PhotoToggle from "./PhotToggle";
import PhotoPanelSet from "./PhotoPanelSet";
import { Panel } from "@/books/types";
import { useEffect, useState } from "react";



export default function ScenePanel({
    photos,
    panel,
    currentChapter,
    currentScene,
    editMode,
    index,
    handlePanelPhotosFilter

}: {
        photos: Photo[]
    panel: Panel,
    currentChapter: number,
    currentScene: number,
        editMode: boolean,
        index: number,
        handlePanelPhotosFilter: (sceneTag: string) => void;
}) {

    const [toggledPhotos, setToggledPhotos] = useState<Photo[]>();
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);

    // console.log(filteredPhotos, "filteredPhotos Scene Panel")
    const sceneTag = `panel-${currentChapter}-${currentScene}-${index}`;
    // Inside ScenePanel, when you need to update PanelLayout's state
    useEffect(() => {
        // handleUpdate(character);
        handlePanelPhotosFilter(sceneTag)
// Correct: Updates state in response to prop changes, not during render

    }, [sceneTag]);


    const handleUpdate = (updateTag: string) => {
        // Further filter `filteredPhotos` by `updateTag`
        // if (panelPhotoFilter !== updateTag) {
        const furtherFiltered = filteredPhotos.filter(photo => photo.tags.includes(updateTag));

        if (updateTag === 'All') {
            const furtherFiltered = filteredPhotos.filter(photo => photo.tags.includes(updateTag));
            setFilteredPhotos(photos);
            // setPanelTagPhotos(updateTag); // Update the current filter tag
        } else {
            console.log('updateTag', updateTag, filteredPhotos)
            const furtherFiltered = filteredPhotos.filter(photo => photo.tags.includes(updateTag));
            console.log(furtherFiltered, "furtherFiltered", filteredPhotos)
            setFilteredPhotos(furtherFiltered);
            // setPanelTagPhotos(updateTag); // Update the current filter tag
        }

    };
    return (
        <div key={"panel-layout-" + index}>
            {editMode && (
                <div className={"panel-tags-" + index}>
                    <PhotoToggle characters={panel.characters} handleUpdate={handleUpdate as (updateTag: string) => void} />
                </div>
            )}
            <div id={sceneTag} key={"panel-" + index} className={"panel-" + index + ", panel-border"}>
                <p>{sceneTag}</p>
                {filteredPhotos.filter((photo) => photo.tags.includes(sceneTag)).map((photo: Photo, i) => (
                    <PhotoPanelSet
                        photo={photo}
                        editMode={editMode}
                        key={"photo-" + i}

                    />
                ))}
            </div>
        </div>
    )
}
