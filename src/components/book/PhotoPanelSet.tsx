import { Photo } from "@/photo";
import Panel from "./Panel";
import { useEffect, useRef } from "react";
import slugify from "./utility";
type PanelProps = {
    editMode: boolean;
    photo: Photo;
    sceneTag: string;
    index: number;
};

export default function PhotoPanelSet({
    editMode,
    photo,
    sceneTag,
    index,
}: PanelProps) {

    return (
        <div className={`panel ${sceneTag} ${photo.tags.join(" ")} image-${index}`} key={"panel-" + index}>
        <Panel
            editMode={editMode}
            photo={photo}
            photoTitle={photo.title ?? ''}
            className="flex w-full h-full"
            key={"something" + photo.id}
            sceneTag={sceneTag}
                index={index}
        />
        </div>
    );

}
