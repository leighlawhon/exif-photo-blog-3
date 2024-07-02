
'use client';

import { useEffect, useState } from 'react';
import { getBook } from '@/books/actions';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/books/types';

export const dynamic = 'force-static';

interface BookContainerProps { }

const BookContainer: React.FC<BookContainerProps> = () => {
    const [book, setBook] = useState<Book | null>(null);
    const bookid = useSearchParams().get('bookID');

    useEffect(() => {
        async function fetchBook() {
            if (bookid) {
                const fetchedBook = await getBook(bookid);
                setBook(fetchedBook);
            }
        }
        fetchBook();
    }, []);

    console.log("here", book);

    console.log(bookid, book?.title, "from url");

    // Rest of your code...

    return (
        <div>
            {book?.title}

        </div>
    );
}


export default BookContainer;