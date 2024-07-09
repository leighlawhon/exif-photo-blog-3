import { Photo } from "@/photo";
import PhotoToggle from "./PhotToggle";
import { Book, Character, Panel } from "@/books/types";
import { Suspense, useEffect, useState } from "react";
import slugify from "./utility";
import { updateBook } from "@/books/actions";
import PanelComponent from "./PanelComponent";

interface ScenePanelProps {
    photos: Photo[];
    book: Book;
    currentChapter: number;
    currentScene: number;
    editMode: boolean;
    index: number;
    panelCharacters: Character[];
}

export default function ScenePanel({
    photos,
    currentChapter,
    currentScene,
    editMode,
    index,
    book,
    panelCharacters
}: ScenePanelProps) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);
    const [filteredScenePhotos, setFilteredScenePhotos] = useState<Photo[]>(photos);
    const sceneTag = `panel-${currentChapter}-${currentScene}-${index}`;
    const mode = "update";
    const bookID = book?._id || "";

    const [bookCharactersCSS, setBookCharactersCSS] = useState<{ character: string, fromleft: string, fromtop: string }>({ character: "", fromleft: "", fromtop: "" });
    const [currentCharacters, setCurrentPanel] = useState<Character[]>([]);
    const intitialPanel = async () => {
        setCurrentPanel(book?.chapters[currentChapter].chapter.scenes[currentScene].panels[index].characters || {} as Character[]);
    }
    useEffect(() => {
        intitialPanel();
        setFilteredPhotos(photos.filter((photo) => photo.tags.includes(sceneTag)));
        setFilteredScenePhotos(photos.filter((photo) => {
            const photosInScene = photo.tags.includes(sceneTag);
            return photosInScene
        }));
    }, [sceneTag, photos]);

    const handleUpdate = (updateTag: string) => {
        if (updateTag === 'All') {
            setFilteredPhotos(filteredScenePhotos);
        } else {
            const furtherFiltered = filteredScenePhotos.filter(photo => photo.tags.includes(updateTag));
            setFilteredPhotos(furtherFiltered);
        }
    };
    const uploadJsonToKV = async (formObject: FormData) => {
        console.log('formObject', formObject)

        if (mode == 'update' && bookID) {
            formObject.append("_id", bookID);
            updateBook(formObject).then((response) => {
                console.log('response', response)
            });
        }
    };

    const updateBookWithCSS = async () => {
        // Update the character CSS in the panel of the book
        if (book) {
            const updatedBook = { ...book };
            updatedBook.chapters[currentChapter].chapter.scenes[currentScene].panels.forEach((panel) => {
                // if (character name === photo)
                panel.characters.forEach((character) => {
                    console.log(character, bookCharactersCSS, "++++++++++++")
                    if (character.name === bookCharactersCSS.character) {
                        // console.log(bookCharactersCSS, "bookCharactersCSS", "++++++++++")
                        character.css = JSON.stringify(bookCharactersCSS);
                    }
                });
            });
            console.log(updatedBook, "updatedBook_______")

            const file = new File([JSON.stringify(updatedBook)], "book.json", { type: "application/json" });
            const form_data = new FormData();
            form_data.append("book", file);

            await uploadJsonToKV(form_data);
        }
    };



    return (
        <div key={"panel-layout-" + index}>
            {editMode && (
                <div className={"panel-tags-" + index}>
                    <PhotoToggle photos={photos} panelCharacters={panelCharacters} handleUpdate={handleUpdate} />
                </div>
            )}
            {
                editMode && (
                    <div>
                        <p>{sceneTag}</p>
                        <Suspense fallback={<div>Loading...</div>}>
                            {editMode && (
                                <div className={'jsonFileUploader'}>
                                    <button onClick={updateBookWithCSS}>Process CSS</button>
                                </div>
                            )}
                        </Suspense>
                    </div>
                )
            }
            <div id={sceneTag} key={"panelset-" + index} className={"panelset-" + index + ", panel-border"}>

                {filteredPhotos.map((photo: Photo, i) => {
                    return (
                        <div className={`panel ${sceneTag} ${photo.tags.join(" ")} image-${index}`} key={"panel-filter" + index}>

                            <PanelComponent
                                setBookCharactersCSS={setBookCharactersCSS}
                                currentCharacters={currentCharacters}
                                editMode={editMode}
                                photo={photo}
                                className="flex w-full h-full"
                                key={"panel-component" + photo.id}
                                sceneTag={sceneTag}
                                index={index}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
function uploadJsonToKV(form_data: FormData) {
    throw new Error("Function not implemented.");
}

