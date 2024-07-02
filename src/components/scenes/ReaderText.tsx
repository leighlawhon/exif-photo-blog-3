import { useEffect, useState } from 'react';
import { Book } from '@/books/types';
import PageNav from './SceneNav';
import BookBreadCrumb from './bookBreadCrumb';

interface ReaderTextProps {
    book: Book;
    editMode: boolean;
}

export default function ReaderText({ book }: ReaderTextProps) {
    const [showPanel, setShowPanel] = useState(true);
    const [showScene, setShowScene] = useState(true);
    const [showChapter, setShowChapter] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentChapterScenesLength, setCurrentChapterScenesLength] = useState(0);
    const [currentSceneTitle, setCurrentSceneTitle] = useState('');
    const [currentChapterTitle, setCurrentChapterTitle] = useState('');


    const chapters = book.chapters;
    useEffect(() => {
        setCurrentChapterScenesLength(chapters[currentChapter]?.chapter.scenes.length ?? 0);

    }, [chapters, currentChapter, currentPage]);

    const handleForwardClick = () => {
        if (currentPage >= 0 && currentPage < currentChapterScenesLength) {
            setCurrentPage(currentPage + 1);
            setCurrentChapter(currentChapter + 1);
            setCurrentChapterTitle(chapters[currentChapter]?.chapter?.title);
            setCurrentSceneTitle(chapters[currentChapter]?.chapter?.scenes[currentPage]?.title);
        }
    };

    const handleBackClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setCurrentChapterTitle(chapters[currentChapter]?.chapter?.title);
            setCurrentSceneTitle(chapters[currentChapter]?.chapter?.scenes[currentPage]?.title);
        } else {
            setCurrentPage(0);
        }
    };

    return (
        <div id="text-container">
            <BookBreadCrumb booktitle={book.title} scenetitle={currentSceneTitle} chaptertitle={currentChapterTitle} />

            <div>{currentPage === 0 ? 'first page' : ''}</div>
            <div>{currentPage > 0 && currentPage < currentChapterScenesLength ? 'no more' : ''}</div>
            <div>{currentPage === currentChapterScenesLength - 1 ? 'no more' : ''}</div>

            <PageNav forwardNav={handleForwardClick} backNav={handleBackClick}>
                {chapters.map((page, i) => {
                    return (
                        showChapter && (
                            <div key={'chapter-' + i} className="chapter">
                                <h2>{page.chapter.title}</h2>
                                {page.chapter.scenes.map((scene, j) => {
                                    return (
                                        showScene &&
                                        j === currentPage && (
                                            <div key={'scenes-' + j} className="scene">
                                                <h3>{scene.title}</h3>
                                                {scene.panels.map((panel, k) => {
                                                    return (
                                                        showPanel && (
                                                            <div key={'panel-' + k} className="panel-text">
                                                                <p>{panel.original_text}</p>
                                                            </div>
                                                        )
                                                    );
                                                })}
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        )
                    );
                })}
            </PageNav>

        </div>
    );
}
