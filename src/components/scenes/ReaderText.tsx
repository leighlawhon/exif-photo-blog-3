import { useEffect, useState } from 'react';
import { Book } from '@/books/types';
import PageNav from './SceneNav';
import BookBreadCrumb from './bookBreadCrumb';
import { useSearchParams } from 'next/navigation';
import { PATH_BOOK_DYNAMIC } from '@/site/paths';

interface ReaderTextProps {
    book: Book;
    editMode: boolean;
    currentChapter: number;
    currentScene: number;
    setCurrentChapter: (chapter: number) => void;
    setCurrentScene: (scene: number) => void;
}

export default function ReaderText({ book, editMode, currentChapter, currentScene, setCurrentChapter, setCurrentScene }: ReaderTextProps) {

    const [currentChapterScenesLength, setCurrentChapterScenesLength] = useState(0);
    const [currentSceneTitle, setCurrentSceneTitle] = useState('');
    const [currentChapterTitle, setCurrentChapterTitle] = useState('');
    const [currentSceneMessage, setCurrentSceneMessage] = useState('first page');

    useEffect(() => {
        setCurrentChapterScenesLength(book.chapters[currentChapter]?.chapter.scenes.length || 0);
        setCurrentSceneTitle(book.chapters[currentChapter]?.chapter.scenes[currentScene]?.title || '');
        setCurrentChapterTitle(book.chapters[currentChapter]?.chapter.title || '');
        setCurrentSceneMessage('first page');
    }, [book, currentChapter, currentScene]);

    const handleForwardClick = async () => {
        if (currentScene === currentChapterScenesLength - 1) {
            if (currentChapter === book.chapters.length - 1) {
                // Last scene in the last chapter, do nothing
                return;
            } else {
                setCurrentChapter(currentChapter + 1);
                setCurrentScene(0);
            }
        } else {
            setCurrentScene(currentScene + 1);
        }
    };

    const handleBackClick = async () => {
        if (currentScene === 0) {
            if (currentChapter === 0) {
                // First scene in the first chapter, do nothing
                return;
            } else {
                setCurrentChapter(currentChapter - 1);
                setCurrentScene(book.chapters[currentChapter - 1]?.chapter.scenes.length - 1 || 0);
            }
        } else {
            setCurrentScene(currentScene - 1);
        }
    };
    const resetChapter = () => { setCurrentChapter(currentChapter); setCurrentScene(0) };


    const curentURL = PATH_BOOK_DYNAMIC + "?bookID=" + useSearchParams().get('bookID');
    return (
        <div id="text-container">
            <BookBreadCrumb booktitle={book.title} scenetitle={currentSceneTitle} chaptertitle={currentChapterTitle} curentURL={curentURL} resetChapter={resetChapter} />

            <div>{currentSceneMessage}</div>

            <PageNav forwardNav={handleForwardClick} backNav={handleBackClick} >
                {book.chapters.map((chapterObj, i) => {
                    const chapter = chapterObj.chapter;
                    return (
                        i === currentChapter && (<div key={'chapter-' + i} className="chapter">
                            <h2>{chapter.title} {editMode}</h2>
                            {chapter.scenes.map((scene, j) => {
                                return (
                                    j == currentScene && (<div key={'scenes-' + j} className="scene">
                                        <h3>{scene.title}</h3>
                                        {scene.panels.map((panel, k) => {
                                            return (
                                                <div className={'panel-' + k} key={'panel-' + k}>
                                                    {editMode && (
                                                        <div className="panel-text">
                                                            <div>
                                                                <ul>
                                                                    <li>Actions: {panel.action}</li>
                                                                    <li>
                                                                        {panel.characters.map((character, l) => (
                                                                            <span key={l}>{character}</span>
                                                                        ))}
                                                                    </li>

                                                                    <li>Environment: {panel.environment}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <p>{panel.original_text}</p>
                                                </div>
                                            );
                                        })}
                                    </div>)
                                );
                            })}
                        </div>)
                    );
                })}
            </PageNav>

        </div>
    );
}
