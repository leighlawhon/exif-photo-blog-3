import { Photo, altTextForPhoto, doesPhotoNeedBlurCompatibility } from '@/photo';
import { useEffect, useRef, useState } from 'react';
import useOnVisible from '@/utility/useOnVisible';
import Draggable from './Drag';
import slugify from './utility';
import { Character, Panel } from '@/books/types';

export default function PanelComponent({
    photo,
    sceneTag,
    index,
    editMode,
    currentCharacters,
    setBookCharactersCSS,
}: {
    photo: Photo;
    editMode: boolean;
    tag?: string;
    selected?: boolean;
    prefetch?: boolean;
    className?: string;
    onVisible?: () => void;
    sceneTag: string;
    index: number;
    setBookCharactersCSS: (css: { character: string, fromleft: string, fromtop: string }) => void;
    currentCharacters: Character[];
}) {


    const panelClasses = () => {
        let panelClassArray: string[] = [];
        let characterTag = "";
        photo.tags.forEach((photoTag) => {
            const tagSplit = photoTag.split("-");
            const tagStart = tagSplit[0];
            if (tagStart === "panel") {
                if (photoTag === sceneTag) {
                    panelClassArray.push(photoTag)
                }
            } else {
                panelClassArray.push(photoTag)
            }
        })
        return panelClassArray.join(".")
    }

    useEffect(() => {
        currentCharacters?.forEach((character) => {
            if (photo.tags.includes(character.name)) {
                console.log("character", character)
                // if (character.css !== "") {
                //     setCurrentPanelStyle(JSON.parse(character.css));
                // }
            }
        });
        // console.log("panelClasses", panel)
    }, [panelClasses, currentCharacters]);

    return (
        <div>
            <Draggable sceneTag={sceneTag} setBookCharactersCSS={setBookCharactersCSS} editMode={editMode} photoTags={photo.tags} currentCharacters={currentCharacters} >
                <div >
                    <img
                        src={photo.url}
                        key={photo.id}
                        alt={altTextForPhoto(photo)}
                        className={photo.tags.includes('scene') ? `scene ${photo.id}` : `character ${photo.id}`}
                    />
                </div>
            </Draggable>
        </div>
    );
};
