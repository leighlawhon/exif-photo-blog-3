import { Suspense, useEffect, useState } from 'react';
import { Photo } from '@/photo';
import ScenePanel from './ScenePanel';
import { Book, Character } from '@/books/types';
import { updateBook } from '@/books/actions';

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
    const [panelTagPhotos, setPanelTagPhotos] = useState<Photo[]>(photos);
    const [sceneTag, setSceneTag] = useState<string>('');
    const [bookCharactersCSS, setBookCharactersCSS] = useState<string>("");
    const [bookUpdate, setBookUpdate] = useState<string>("");


    const uploadJsonToKV = async (formObject: FormData) => {
        if (book && book._id) {

        }
    };

    const handlePanelPhotosFilter = (newTag: string) => {
        const scenePhotos = photos.filter(photo => photo.tags.includes(newTag));
        setSceneTag(newTag);
        setPanelTagPhotos(scenePhotos);
    };
    const handleUpdateCSS = async () => {
    // try {
    //     const form_data = new FormData();
    //     form_data.append("book", book);

        //     await uploadJsonToKV(form_data);
        // } catch (error) {
        //     console.error('Error parsing JSON file:', error);
        //     setUploadStatus('Error parsing JSON file');
        // }
        console.log(book, "__________________________");


        // updateBook(book).then((response) => {
        //     console.log('response', response)
        // });
    }
    useEffect(() => {
        console.log(bookCharactersCSS, "+++++++++++++__________________________");
    }, [bookCharactersCSS]);
    return (
        <div>
            <div className="panel-container">
                {book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) => {
                    const panelCharacters = panel.characters;
                    return (
                        <div key={`panel-layout-${i}`}>
                            {editMode && <div>
                                <p>{sceneTag}</p>

                                <Suspense fallback={<div>Loading...</div>}>
                                    {editMode && <div className={'jsonFileUploader'}>

                                        <button onClick={handleUpdateCSS}>Process File</button>

                                    </div>}
                                </Suspense>
                            </div>}

                        <ScenePanel
                            photos={photos}
                            panel={panel}
                                panelCharacters={panelCharacters} 
                            currentChapter={currentChapter}
                            currentScene={currentScene}
                            editMode={editMode}
                            key={"scene-panel-" + i}
                            index={i}
                            handlePanelPhotosFilter={handlePanelPhotosFilter}
                                setBookCharactersCSS={setBookCharactersCSS}
                        />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
function setUploadStatus(arg0: string) {
    throw new Error('Function not implemented.');
}

