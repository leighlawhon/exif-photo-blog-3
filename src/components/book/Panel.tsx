'use client';

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
    panel,
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
        setBookCharactersCSS: (characterMeta: string) => void;
        panel: Panel;
}) {
    const [dragOffset, setDragOffset] = useState("{left: 0, top: 0}");
    const panelClasses = () => {
        let panelClassArray: string[] = [];
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
        setBookCharactersCSS(`.${panelClasses()} {${dragOffset}}`);
        panel.characters.forEach((character) => { character.css = `.${panelClasses()} {${dragOffset}}` })
    }, [dragOffset, panelClasses, panel]);
    // update the css for the panel in the book
    return (
        <Draggable setDragOffset={setDragOffset} editMode={editMode} photoTags={photo.tags} sceneTag={sceneTag} imageID={`image-${index}`} >
            <div >
                <img
                    src={photo.url}
                    key={photo.id}
                    alt={altTextForPhoto(photo)}
                    className={photo.tags.includes('scene') ? `scene ${photo.id}` : `character ${photo.id}`}
                />
            </div>
        </Draggable>

    );
};
