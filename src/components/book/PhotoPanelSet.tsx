import { Photo } from "@/photo";
import Panel from "./Panel";
import { useEffect, useRef } from "react";
type PanelProps = {
    editMode: boolean;
    photo: Photo;
    sceneTag: string
    index: number
    rootPosition: { top: number; left: number; }
};


export default function PhotoPanel({
    editMode,
    photo,
    sceneTag,
    index,
    rootPosition
}: PanelProps) {
    // Render logic for individual photo panels

    return (
        <Panel
            editMode={editMode}
            photo={photo}
            photoTitle={photo.title ?? ''}
            className="flex w-full h-full"
            key={"something" + photo.id}
            sceneTag={sceneTag}
            index={index}
            rootPosition={rootPosition}
        />
    );

}
