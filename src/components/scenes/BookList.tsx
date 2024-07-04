
import { PATH_BOOK_DYNAMIC } from '@/site/paths';
import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import { Book } from '@/books/types';
import Link from 'next/link';

interface BookListProps {
    books: Book[];
}

export default function BookList({ books }: BookListProps): ReactNode {
    return (
        <div>
            {books.length === 0 ? (
                <div>No books available</div>
            ) : (
                books.map((book, i) => (
                    <div className="bookSelector">
                        <Link
                            href={{
                                pathname: `${PATH_BOOK_DYNAMIC}}`,
                                query: { bookID: book._id },
                            }}
                            key={`book${i}`}>
                            <h1 className={clsx('text-lg font-semibold', 'dark:text-gray-300')}>
                                {book.title}
                            </h1>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}
