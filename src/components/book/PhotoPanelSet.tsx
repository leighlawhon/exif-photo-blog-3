import { Photo } from "@/photo";
import PanelComponent from "./Panel";
import { useEffect, useRef } from "react";
import slugify from "./utility";
import { Character, Panel } from "@/books/types";
type PanelProps = {
    editMode: boolean;
    photo: Photo;
    sceneTag: string;
    index: number;
    setBookCharactersCSS: (css: string) => void;
    panel: Panel;
};

export default function PhotoPanelSet({
    editMode,
    photo,
    sceneTag,
    index,
    setBookCharactersCSS,
    panel
}: PanelProps) {

    return (
        <div className={`panel ${sceneTag} ${photo.tags.join(" ")} image-${index}`} key={"panel-" + index}>
            <PanelComponent
                setBookCharactersCSS={setBookCharactersCSS}
                panel={panel}
            editMode={editMode}
                photo={photo}
            className="flex w-full h-full"
            key={"something" + photo.id}
            sceneTag={sceneTag}
                index={index}
        />
        </div>
    );

}
