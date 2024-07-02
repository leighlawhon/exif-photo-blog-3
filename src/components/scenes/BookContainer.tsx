
'use client';

import { useEffect, useState } from 'react';
import { getBook } from '@/books/actions';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/books/types';
import { Photo } from '@/photo';
import ToggleSwitch from './ToggleSwitch';
import ReaderText from './ReaderText';
import SceneContainer from './SceneContainer';
import BookEditor from './BookEditor';

export const dynamic = 'force-static';

interface BookContainerProps {
    photos: Photo[];
}



const BookContainer: React.FC<BookContainerProps> = ({ photos }) => {
    const [editMode, setEditMode] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book>();
    const bookid = useSearchParams().get('bookID');
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    useEffect(() => {
        async function fetchBook() {
            if (bookid) {
                const fetchedBook = await getBook(bookid);
                if (!fetchedBook) {
                    console.error('Error fetching book:', bookid);
                    return;
                } else {
                    setSelectedBook(fetchedBook);
                }
            }
        }
        fetchBook();
    }, []);

    console.log("here", selectedBook);

    console.log(bookid, selectedBook?.title, "from url");

    // Rest of your code...

    if (selectedBook !== undefined) {
    return (
        <div>
            {selectedBook?.title}
            <BookEditor toggleEditMode={editMode} toggleEditFunc={toggleEditMode} photos={photos} book={selectedBook} />


        </div>
    );
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}


export default BookContainer;