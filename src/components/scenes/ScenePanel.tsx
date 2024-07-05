import { Photo } from "@/photo";
import PhotoToggle from "./PhotToggle";
import PhotoPanelSet from "./PhotoPanelSet";
import { Panel } from "@/books/types";
import { useEffect, useState } from "react";



export default function ScenePanel({
    panel,
    currentChapter,
    currentScene,
    editMode,
    filteredPhotos,
    index,
    handleUpdate
}: {
    panel: Panel,
    currentChapter: number,
    currentScene: number,
    editMode: boolean,
    filteredPhotos: Photo[]
    index: number,
    handleUpdate: (updateTag: string) => void
}) {
    console.log(filteredPhotos, "filteredPhotos Scene Panel")
    const sceneTag = `panel-${currentChapter}-${currentScene}-${index}`;
    // Inside ScenePanel, when you need to update PanelLayout's state
    useEffect(() => {
        handleUpdate(sceneTag);
// Correct: Updates state in response to prop changes, not during render

    }, [sceneTag]);
    return (
        <div key={"panel-layout-" + index}>
            {editMode && (
                <div className={"panel-tags-" + index}>
                    <PhotoToggle characters={panel.characters} handleUpdate={handleUpdate as (updateTag: string) => void} />
                </div>
            )}
            <div id={sceneTag} key={"panel-" + index} className={"panel-" + index + ", panel-border"}>
                <p>{sceneTag}</p>
                {filteredPhotos.map((photo: Photo, i) => (
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
