import { Suspense, useEffect, useState } from 'react';
import { Photo } from '@/photo';
import PanelFilterContainer from './PanelFiilterContainer';
import { Book, Character } from '@/books/types';
import { updateBook } from '@/books/actions';
import { isJsonFile } from '@/books/utils';

export default function PanelLayout({
    editMode,
    photos,
    book,
    currentScene,
    currentChapter,
    setSceneUpdate
}: {
    editMode: boolean;
    photos: Photo[];
    book?: Book;
    currentScene: number;
    currentChapter: number;
    setSceneUpdate: (update: boolean) => void;
}) {


    return (
        <div>
            <div className="panel-container">
                {book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) => {
                    const panelCharacters = panel.characters;
                    return (
                        <div key={`panel-layout-${i}`}>


                            <PanelFilterContainer
                                photos={photos}
                                book={book}
                                panelCharacters={panelCharacters}
                                currentChapter={currentChapter}
                                currentScene={currentScene}
                                editMode={editMode}
                                key={"scene-panel-" + i}
                                index={i}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
